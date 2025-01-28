'use client'
import React, { useEffect, useMemo, useState } from 'react'
import {
      Table,
      TableHeader,
      TableColumn,
      TableBody,
      TableRow,
      TableCell,
      Spinner,
} from "@heroui/react";
import { useAsyncList } from "@react-stately/data";
import BottomContent from '@/wsui/Common/Table/BottomContent';
import { RenderCell } from '@/wsui/Common/Table/RenderCell';
import { formatColumnName } from '@/lib/utils';
import { getCookie } from '@/lib/cookies';


export const columns = [
      { name: "ID", uid: "id", sortable: false },
      { name: "Image", uid: "image" },
      { name: "Title", uid: "title", sortable: true },
      { name: "Status", uid: "status", sortable: true },
      { name: "Added Date", uid: "added_date", sortable: true },
      { name: "Http Status", uid: "httpstatus", sortable: true },
      { name: "Actions", uid: "actions" },
];


export default function BlogTable() {
      const [selectedKeys, setSelectedKeys] = useState(new Set([]))
      const [page, setPage] = useState(1);

      const rowsPerPage = 3


      const list = useAsyncList({
            async load({ signal }) {
                  try {
                        const res = await fetch("http://localhost:3000/api/v1/blog/blog-list", { signal });

                        if (!res.ok) {
                              throw new Error(`HTTP error! Status: ${res.status}`);
                        }

                        const json = await res.json();
                        if (!Array.isArray(json.results)) {
                              throw new Error("Unexpected data format: 'results' is not an array.");
                        }

                        return {
                              items: json.results,
                        };
                  } catch (error) {
                        console.error("Error loading data:", error);
                        return {
                              items: [],
                        };
                  }
            },
      });
      console.log(list.items);
      const pages = Math.ceil(list.items.length / rowsPerPage)
      const items = list.items.slice((page - 1) * rowsPerPage, page * rowsPerPage);
      const tableName = "blog";
      const [visibleColumns, setVisibleColumns] = useState(new Set());

      // const columns = useMemo(() => {
      //       if (!datas || datas.length === 0) return [];
      //       const baseColumns = Object.keys(datas[0]);
      //       return [...baseColumns, "actions"];
      // }, [datas]);

      useEffect(() => {
            const cookieData = getCookie("visible_columns");
            if (tableName && cookieData && cookieData[tableName]) {
                  setVisibleColumns(new Set(cookieData[tableName]));
            } else {
                  // Default visible columns
                  const defaultColumns = new Set(columns.slice(0, 5));
                  defaultColumns.add("actions");
                  setVisibleColumns(defaultColumns);
            }
      }, [tableName, columns]);


      const headerColumns = useMemo(() => {
            const visible = [...columns.filter((col) => visibleColumns.has(col))];
            if (visibleColumns.has("actions") && !visible.includes("actions")) {
                  visible.push("actions");
            }
            return visible;
      }, [columns, visibleColumns]);
      return (

            <>
                  {/* <TopContent /> */}
                  <Table aria-label="Example table with client side sorting"
                        classNames={{
                              table: "min-h-[400px]",
                        }}
                        sortDescriptor={items.sortDescriptor}
                        onSortChange={items.sort}
                        onSelectionChange={setSelectedKeys}
                        selectedKeys={selectedKeys}
                        selectionMode="multiple">
                        <TableHeader columns={headerColumns}>
                              {headerColumns.map((column) => (
                                    <TableColumn
                                          key={column}
                                          allowsSorting={column !== "actions"}
                                          align={column === "actions" ? "center" : "start"}
                                    >
                                          {formatColumnName(column)}
                                    </TableColumn>
                              ))}
                        </TableHeader>
                        <TableBody
                              isLoading={list.isLoading}
                              items={items}
                              emptyContent="No data found"
                              loadingContent={<Spinner label="Loading..." />}
                        >
                              {(item, rowIndex) => (
                                    <TableRow key={`${item.id}-${rowIndex}`}>
                                          {(columnKey) => (
                                                <TableCell key={`${rowIndex}-${columnKey}`}>
                                                      {RenderCell({ item, columnKey })}
                                                </TableCell>
                                          )}
                                    </TableRow>
                              )}
                        </TableBody>
                  </Table>
                  <BottomContent pages={pages} page={page} setPage={setPage} selectedKeys={selectedKeys} items={items} />
            </>
      )
}
