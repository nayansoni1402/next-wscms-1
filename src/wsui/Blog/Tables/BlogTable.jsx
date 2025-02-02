'use client';
import React, { useEffect, useState } from "react";
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
import BottomContent from "@/wsui/Common/Table/BottomContent";
import TopContent from "@/wsui/Common/Table/TopContent";

export default function BlogTable() {
      const [filterValue, setFilterValue] = useState("");
      const [selectedKeys, setSelectedKeys] = useState(new Set([]));
      const [visibleColumns, setVisibleColumns] = useState(new Set());
      const [firstItem, setFirstItem] = useState([]);
      const [columns, setColumns] = useState([]);
      const [itemsList, setItemsList] = useState([]);
      const [totalCount, setTotalCount] = useState(0);

      const [statusFilter, setStatusFilter] = useState("all");
      const [rowsPerPage, setRowsPerPage] = useState(50);
      const tableName = 'blog';
      const [sortDescriptor, setSortDescriptor] = useState({
            column: "age",
            direction: "ascending",
      });
      const [page, setPage] = useState(1);
      
      const list = useAsyncList({
            async load({ signal }) {
                  try {
                        const res = await fetch(`http://localhost:3000/api/v1/blog/blog-list?page=${page}&limit=${rowsPerPage}`, { signal });

                        if (!res.ok) {
                              throw new Error(`HTTP error! Status: ${res.status}`);
                        }

                        const json = await res.json();

                        return { items: json };
                  } catch (error) {
                        console.error("Error loading data:", error);
                        return { items: [] };
                  }
            },
            dependencies: [page, rowsPerPage],
      });


      // Effect hook to log items
      useEffect(() => {
            if (list?.items?.length > 0) {
                  setColumns(list.items[0].columns);
                  setTotalCount(list.items[0].totalCount);
                  setItemsList(list.items[0].items);
                  setFirstItem(list.items[0]);
            }
      }, [list.items]);


      useEffect(() => {
            setVisibleColumns(new Set(firstItem.INITIAL_VISIBLE_COLUMNS));
            console.log("First Item:", firstItem);
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
                        user.name.toLowerCase().includes(filterValue.toLowerCase()),
                  );
            }
            if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
                  filteredUsers = filteredUsers.filter((user) =>
                        Array.from(statusFilter).includes(user.status),
                  );
            }

            return filteredUsers;
      }, [itemsList, filterValue, statusFilter]);

      const pages = Math.ceil(totalCount / rowsPerPage);

      const items = React.useMemo(() => {
            const start = (page - 1) * rowsPerPage;
            const end = start + rowsPerPage;

            return filteredItems.slice(start, end);
      }, [page, filteredItems, rowsPerPage]);

      const sortedItems = React.useMemo(() => {
            return [...items].sort((a, b) => {
                  const first = a[sortDescriptor.column];
                  const second = b[sortDescriptor.column];
                  const cmp = first < second ? -1 : first > second ? 1 : 0;

                  return sortDescriptor.direction === "descending" ? -cmp : cmp;
            });
      }, [sortDescriptor, items]);




      const renderCell = React.useCallback((user, columnKey) => {
            return <TableCellCustom user={user} columnKey={columnKey} />
      }, []);

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
                        filterValue={filterValue}
                        onRowsPerPageChange={onRowsPerPageChange}
                        onClear={onClear}
                        onSearchChange={onSearchChange}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                        visibleColumns={visibleColumns}
                        setVisibleColumns={setVisibleColumns}
                        itemsList={itemsList}
                        columns={columns}
                  />
            );
      }, [
            filterValue,
            statusFilter,
            visibleColumns,
            onRowsPerPageChange,
            itemsList.length,
            onSearchChange,
            hasSearchFilter,
      ]);

      const bottomContent = React.useMemo(() => {
            return (
                  <BottomContent
                        selectedKeys={selectedKeys}
                        filteredItems={filteredItems}
                        setPage={setPage}
                        page={page}
                        pages={pages}
                        onPreviousPage={onPreviousPage}
                        onNextPage={onNextPage}
                  />
            );
      }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

      if (list.error) {
            return <AlertWithAction type="danger" desc={list.error} />
      }
      return (
            <Table
                  isHeaderSticky
                  aria-label={tableName}
                  bottomContent={bottomContent}
                  bottomContentPlacement="outside"
                  classNames={{
                        wrapper: "max-h-[682px]",
                  }}
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





// 'use client'
// import React, { useEffect, useMemo, useState } from 'react';
// import {
//       Table,
//       TableHeader,
//       TableColumn,
//       TableBody,
//       TableRow,
//       TableCell,
//       Spinner,
// } from "@heroui/react";
// import { useAsyncList } from "@react-stately/data";
// import BottomContent from '@/wsui/Common/Table/BottomContent';
// import { RenderCell } from '@/wsui/Common/Table/RenderCell';
// import { formatColumnName } from '@/lib/utils';
// import { getCookie } from '@/lib/cookies';

// // Define table columns
// export const columns = [
//       { name: "ID", uid: "id", sortable: false },
//       { name: "Image", uid: "image" },
//       { name: "Title", uid: "title", sortable: true },
//       { name: "Status", uid: "status", sortable: true },
//       { name: "Added Date", uid: "added_date", sortable: true },
//       { name: "Http Status", uid: "httpstatus", sortable: true },
//       { name: "Actions", uid: "actions" },
// ];

// export default function BlogTable() {
//       const [selectedKeys, setSelectedKeys] = useState(new Set([]));
//       const [page, setPage] = useState(1);
//       const rowsPerPage = 3;
//       const tableName = "blog";

//       // Fetch data asynchronously
// const list = useAsyncList({
//       async load({ signal }) {
//             try {
//                   const res = await fetch("http://localhost:3000/api/v1/blog/blog-list", { signal });

//                   if (!res.ok) {
//                         throw new Error(`HTTP error! Status: ${res.status}`);
//                   }

//                   const json = await res.json(); // Ensure response is parsed
//                   return { items: Array.isArray(json.data) ? json.data : [] };
//             } catch (error) {
//                   console.error("Error loading data:", error);
//                   return { items: [] };
//             }
//       },
// });

//       // Calculate number of pages
//       const pages = Math.ceil(list.items.length / rowsPerPage);
//       const items = useMemo(() => list.items.slice((page - 1) * rowsPerPage, page * rowsPerPage), [list.items, page]);

//       // Visible columns logic
//       const [visibleColumns, setVisibleColumns] = useState(new Set());
//       useEffect(() => {
//             const cookieData = getCookie("visible_columns");
//             if (tableName && cookieData && cookieData[tableName]) {
//                   setVisibleColumns(new Set(cookieData[tableName]));
//             } else {
//                   const defaultColumns = new Set(columns.map(col => col.uid).slice(0, 5));
//                   defaultColumns.add("actions");
//                   setVisibleColumns(defaultColumns);
//             }
//       }, [tableName]);

//       // Compute visible columns based on user selection
//       const headerColumns = useMemo(() => {
//             const visible = columns.filter(col => visibleColumns.has(col.uid));
//             if (visibleColumns.has("actions") && !visible.some(col => col.uid === "actions")) {
//                   visible.push({ name: "Actions", uid: "actions" });
//             }
//             return visible;
//       }, [visibleColumns]);

//       return (
//             <>
//                   <Table
//                         aria-label="Example table with client-side sorting"
//                         classNames={{ table: "min-h-[400px]" }}
//                         sortDescriptor={list.sortDescriptor}
//                         onSortChange={list.sort}
//                         onSelectionChange={setSelectedKeys}
//                         selectedKeys={selectedKeys}
//                         selectionMode="multiple"
//                   >
//                         <TableHeader>
//                               {headerColumns.map((column) => (
//                                     <TableColumn
//                                           key={column.uid}
//                                           allowsSorting={column.sortable}
//                                           align={column.uid === "actions" ? "center" : "start"}
//                                     >
//                                           {formatColumnName(column.name)}
//                                     </TableColumn>
//                               ))}
//                         </TableHeader>

//                         <TableBody
//                               isLoading={list.isLoading}
//                               items={items}
//                               emptyContent="No data found"
//                               loadingContent={<Spinner label="Loading..." />}
//                         >
//                               {(item) => (
//                                     <TableRow key={item.id}>
//                                           {headerColumns.map((column) => (
//                                                 <TableCell key={column.uid}>
//                                                       {RenderCell({ item, columnKey: column.uid })}
//                                                 </TableCell>
//                                           ))}
//                                     </TableRow>
//                               )}
//                         </TableBody>
//                   </Table>

//                   <BottomContent pages={pages} page={page} setPage={setPage} selectedKeys={selectedKeys} items={items} />
//             </>
//       );
// }
