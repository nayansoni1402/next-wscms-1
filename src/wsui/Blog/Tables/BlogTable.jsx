'use client';
import React, { useEffect, useState, useCallback } from "react";
import {
      Table,
      TableHeader,
      TableColumn,
      TableBody,
      TableRow,
      TableCell
} from "@heroui/react";
import { Spinner } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import AlertWithAction from "@/wsui/Common/Alert/AlertWithAction";
import { statusOptions } from "@/wsui/Common/Table/commanData";
import TableCellCustom from "@/wsui/Common/Table/TableCellCustom";
import TopContent from "@/wsui/Common/Table/TopContent";
import { useInfiniteScroll } from "@heroui/use-infinite-scroll";

export default function BlogTable() {

      const [filterValue, setFilterValue] = useState("");
      const [selectedKeys, setSelectedKeys] = useState(new Set([]));
      const [visibleColumns, setVisibleColumns] = useState(new Set());
      const [firstItem, setFirstItem] = useState([]);
      const [columns, setColumns] = useState([]);
      const [itemsList, setItemsList] = useState([]);
      const [totalCount, setTotalCount] = useState(0);

      const [isError, setIsError] = useState(null);
      const [statusFilter, setStatusFilter] = useState("all");
      const [rowsPerPage, setRowsPerPage] = useState(50);
      const tableName = 'blog';
      const [sortDescriptor, setSortDescriptor] = useState({
            column: "title",
            direction: "ascending",
      });
      const [page, setPage] = useState(1);
      const [isLoading, setIsLoading] = React.useState(true);
      const [hasMore, setHasMore] = React.useState(false);

      const list = useAsyncList({
            async load({ signal, cursor }) {
                  if (cursor) {
                        setIsLoading(false);
                  }

                  try {
                        const res = await fetch(`${process.env.NEXT_PUBLIC_BLOG_API_URL}/blog-list?func=listpage=${cursor ?? 1}`, {
                              signal
                        });

                        if (!res.ok) {
                              throw new Error(`HTTP error! Status: ${res.status}`);
                        }

                        const json = await res.json();
                        console.log(cursor);
                        console.log(json.results);
                        setHasMore(json.next !== null);

                        return {
                              items: [json.results],
                              cursor: json.next,
                        };
                  } catch (error) {
                        if (abortSignal.aborted) {
                              setIsError(error.message);
                              console.warn("Request aborted:", error);
                              return { items: [] };
                        }
                        setIsError(error.message);
                        console.error("Error loading data:", error);
                        return { items: [] };
                  }
            },
      });
      // console.log("cursor-out", list);

      const [loaderRef, scrollerRef] = useInfiniteScroll({ hasMore, onLoadMore: list.loadMore });

      useEffect(() => {
            if (list?.items.length > 0) {
                  setColumns(list.items[0]?.columns || []);
                  setTotalCount(list.items[0]?.totalCount || 0);
                  setItemsList(prevItems => [
                        ...prevItems,
                        ...list.items.flatMap(item => item.items)
                  ]);

                  setFirstItem(list.items[0] || {});
            } else {
                  console.warn("No items found in response.");
                  setItemsList([]);
            }
      }, [list.items, page, rowsPerPage]);



      useEffect(() => {
            setVisibleColumns(new Set(firstItem.INITIAL_VISIBLE_COLUMNS));
      }, [firstItem]);

      const hasSearchFilter = Boolean(filterValue);

      const headerColumns = React.useMemo(() => {
            if (visibleColumns === "all") return columns;

            return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
      }, [visibleColumns]);

      const filteredItems = React.useMemo(() => {
            let filteredUsers = [...itemsList];

            if (hasSearchFilter) {
                  filteredUsers = filteredUsers.filter((user) =>
                        user.title.toLowerCase().includes(filterValue.toLowerCase()),
                  );
            }
            if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
                  filteredUsers = filteredUsers.filter((user) =>
                        Array.from(statusFilter).includes(user.status),
                  );
            }

            return filteredUsers;
      }, [itemsList, filterValue, statusFilter, page]);

      const pages = Math.ceil(totalCount / rowsPerPage);

      const items = React.useMemo(() => {
            const start = (page - 1) * rowsPerPage;
            const end = start + rowsPerPage;

            return filteredItems.slice(start, end);
      }, [page, filteredItems, rowsPerPage]);

      const sortedItems = React.useMemo(() => {
            if (!itemsList.length) return [];

            return [...itemsList].sort((a, b) => {
                  const first = a[sortDescriptor.column];
                  const second = b[sortDescriptor.column];
                  const cmp = first < second ? -1 : first > second ? 1 : 0;

                  return sortDescriptor.direction === "descending" ? -cmp : cmp;
            });
      }, [sortDescriptor, itemsList]);

      const renderCell = useCallback((user, columnKey) => <TableCellCustom user={user} columnKey={columnKey} />, []);

      const onNextPage = React.useCallback(() => {
            if (page < pages) {
                  setPage(page + 1);
            }
      }, [page, pages]);

      const onPreviousPage = React.useCallback(() => {
            if (page > 1) {
                  setPage(page - 1);
            }
      }, [page]);

      const onRowsPerPageChange = React.useCallback((e) => {
            setRowsPerPage(Number(e.target.value));
            setPage(1);
      }, []);

      const onSearchChange = React.useCallback((value) => {
            if (value) {
                  setFilterValue(value);
                  setPage(1);
            } else {
                  setFilterValue("");
            }
      }, []);

      const onClear = React.useCallback(() => {
            setFilterValue("");
            setPage(1);
      }, []);

      const topContent = React.useMemo(() => {
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
            hasSearchFilter,
      ]);


      if (list.error || isError) {
            return <AlertWithAction type="danger" desc={list.error || isError} />
      }
      return (
            <Table
                  isHeaderSticky
                  aria-label={tableName}
                  bottomContent={hasMore ? (
                        <div className="flex w-full justify-center">
                              <Spinner ref={loaderRef} />
                        </div>
                  ) : null}
                  classNames={{
                        wrapper: "max-h-[682px]",
                  }}
                  baseRef={scrollerRef}
                  selectedKeys={selectedKeys}
                  selectionMode="multiple"
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

                  <TableBody emptyContent={"No users found"} items={sortedItems} isLoading={list.isLoading} loadingContent={<Spinner label="Loading..." />}>
                        {(item) => (
                              <TableRow key={item.id}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                              </TableRow>
                        )}
                  </TableBody>
            </Table>
      );
}