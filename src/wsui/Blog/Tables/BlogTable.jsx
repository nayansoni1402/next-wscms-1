"use client";
import React, { useState, useCallback, useMemo } from "react";
import {
      Table,
      TableHeader,
      TableColumn,
      TableBody,
      TableRow,
      TableCell,
} from "@heroui/react";
import { Spinner } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import AlertWithAction from "@/wsui/Common/Alert/AlertWithAction";
import TableCellCustom from "@/wsui/Common/Table/TableCellCustom";
import TopContent from "@/wsui/Common/Table/TopContent";
import { useInfiniteScroll } from "@heroui/use-infinite-scroll";

export default function BlogTable({ blogData }) {
      const [filterValue, setFilterValue] = useState("");
      const [selectedKeys, setSelectedKeys] = useState(new Set([]));
      const [visibleColumns, setVisibleColumns] = useState(
            new Set(blogData.INITIAL_VISIBLE_COLUMNS)
      );

      const columns = blogData.columns;
      const totalCount = blogData.totalCount;
      const [isError, setIsError] = useState(null);
      const [statusFilter, setStatusFilter] = useState(new Set(["1"])); // 🛠️ Ensure it's a Set
      const [hasMore, setHasMore] = useState(false);
      const tableName = "blog";

      // ✅ Ensure Hooks are not conditionally rendered
      const list = useAsyncList({
            async load({ signal, cursor }) {
                  try {
                        const res = await fetch(
                              cursor || `${process.env.NEXT_PUBLIC_BLOG_API_URL}/blog-list?page=1`,
                              { signal }
                        );

                        if (!res.ok) {
                              throw new Error(`HTTP error! Status: ${res.status}`);
                        }

                        const json = await res.json();
                        setHasMore(json.next !== null);

                        return {
                              items: json.results,
                              cursor: json.next,
                        };
                  } catch (error) {
                        if (signal.aborted) {
                              setIsError(error.message);
                              return { items: [] };
                        }
                        setIsError(error.message);
                        return { items: [] };
                  }
            },
      });

      const [loaderRef, scrollerRef] = useInfiniteScroll({
            hasMore,
            onLoadMore: list.loadMore,
      });

      const itemsList = list.items;

      const headerColumns = useMemo(
            () => columns.filter((column) => visibleColumns.has(column.uid)),
            [visibleColumns, columns]
      );

      // ✅ Fix filtering logic
      const filteredItems = useMemo(() => {
            let filteredBlogs = [...itemsList];

            if (filterValue) {
                  filteredBlogs = filteredBlogs.filter((blog) =>
                        blog.title.toLowerCase().includes(filterValue.toLowerCase())
                  );
            }

            if (statusFilter.size > 0) {
                  filteredBlogs = filteredBlogs.filter((blog) =>
                        statusFilter.has(String(blog.status))
                  );
            }

            return filteredBlogs;
      }, [itemsList, filterValue, statusFilter]);

      const onSearchChange = useCallback((value) => {
            setFilterValue(value || "");
      }, []);

      const onClear = useCallback(() => setFilterValue(""), []);

      const topContent = useMemo(() => {
            return (
                  <TopContent
                        selectedKeys={selectedKeys}
                        totalItems={totalCount}
                        filterValue={filterValue}
                        onClear={onClear}
                        onSearchChange={onSearchChange}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                        visibleColumns={visibleColumns}
                        setVisibleColumns={setVisibleColumns}
                        columns={columns}
                  />
            );
      }, [
            filterValue,
            statusFilter,
            visibleColumns,
            onSearchChange,
            selectedKeys,
            totalCount,
      ]);

      const renderCell = useCallback(
            (item, columnKey) => <TableCellCustom item={item} columnKey={columnKey} />,
            []
      );

      const [sortDescriptor, setSortDescriptor] = useState({
            column: "title",
            direction: "ascending",
      });

      // ✅ Fix sorting logic
      const sortedItems = useMemo(() => {
            return [...filteredItems].sort((a, b) => {
                  const first = a[sortDescriptor.column] || "";
                  const second = b[sortDescriptor.column] || "";
                  return sortDescriptor.direction === "descending"
                        ? second.localeCompare(first)
                        : first.localeCompare(second);
            });
      }, [sortDescriptor, filteredItems]);

      if (isError) {
            return <AlertWithAction type="danger" desc={isError} />;
      }

      return (
            <Table
                  isHeaderSticky
                  aria-label={tableName}
                  bottomContent={
                        hasMore ? (
                              <div className="flex w-full justify-center">
                                    <Spinner ref={loaderRef} />
                              </div>
                        ) : (
                              <div className="flex w-full justify-center text-gray-500 text-sm py-2">
                                    🚀 You've reached the end!
                              </div>
                        )
                  }
                  classNames={{
                        wrapper: "max-h-[682px]",
                  }}
                  baseRef={scrollerRef}
                  selectedKeys={selectedKeys}
                  // selectionMode="multiple"
                  sortDescriptor={sortDescriptor}
                  topContent={topContent}
                  topContentPlacement="outside"
                  onSelectionChange={setSelectedKeys}
                  onSortChange={setSortDescriptor}
            >
                  <TableHeader columns={headerColumns}>
                        {(column) => (
                              <TableColumn
                                    key={column.uid}
                                    align={column.uid === "actions" ? "center" : "start"}
                                    allowsSorting={column.sortable}
                              >
                                    {column.name}
                              </TableColumn>
                        )}
                  </TableHeader>

                  <TableBody
                        emptyContent={"No blogs found"}
                        items={sortedItems}
                        isLoading={list.isLoading}
                        loadingContent={<Spinner label="Loading..." />}
                  >
                        {(item) => (
                              <TableRow key={item.id}>
                                    {(columnKey) => (
                                          <TableCell>{renderCell(item, columnKey)}</TableCell>
                                    )}
                              </TableRow>
                        )}
                  </TableBody>
            </Table>
      );
}
