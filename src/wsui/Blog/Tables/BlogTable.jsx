'use client';
import React, { useEffect, useState } from "react";
import {
      Table,
      TableHeader,
      TableColumn,
      TableBody,
      TableRow,
      TableCell,
      Input,
      Button,
      DropdownTrigger,
      Dropdown,
      DropdownMenu,
      DropdownItem,
      Chip,
      User,
      Pagination,
} from "@heroui/react";
import { Spinner } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import AlertWithAction from "@/wsui/Common/Alert/AlertWithAction";
import { statusOptions } from "@/wsui/Common/Table/commanData";
import TableCellCustom from "@/wsui/Common/Table/TableCellCustom";
import { ChevronDownIcon, PlusIcon, SearchIcon } from "@/wsui/Common/WsSvg";
import BottomContent from "@/wsui/Common/Table/BottomContent";

export const columns = [
      { name: "ID", uid: "id", sortable: true },
      { name: "NAME", uid: "name", sortable: true },
      { name: "AGE", uid: "age", sortable: true },
      { name: "ROLE", uid: "role", sortable: true },
      { name: "TEAM", uid: "team" },
      { name: "EMAIL", uid: "email" },
      { name: "STATUS", uid: "status", sortable: true },
      { name: "ACTIONS", uid: "actions" },
];


export const users = [
      {
            id: 1,
            name: "Tony Reichert",
            role: "CEO",
            team: "Management",
            status: "active",
            age: "29",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            email: "tony.reichert@example.com",
      },
      {
            id: 2,
            name: "Zoey Lang",
            role: "Tech Lead",
            team: "Development",
            status: "paused",
            age: "25",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
            email: "zoey.lang@example.com",
      },
      {
            id: 3,
            name: "Jane Fisher",
            role: "Sr. Dev",
            team: "Development",
            status: "active",
            age: "22",
            avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            email: "jane.fisher@example.com",
      },
      {
            id: 4,
            name: "William Howard",
            role: "C.M.",
            team: "Marketing",
            status: "vacation",
            age: "28",
            avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
            email: "william.howard@example.com",
      },
      {
            id: 5,
            name: "Kristen Copper",
            role: "S. Manager",
            team: "Sales",
            status: "active",
            age: "24",
            avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
            email: "kristen.cooper@example.com",
      },
      {
            id: 6,
            name: "Brian Kim",
            role: "P. Manager",
            team: "Management",
            age: "29",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            email: "brian.kim@example.com",
            status: "Active",
      },
      {
            id: 7,
            name: "Michael Hunt",
            role: "Designer",
            team: "Design",
            status: "paused",
            age: "27",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
            email: "michael.hunt@example.com",
      },
      {
            id: 8,
            name: "Samantha Brooks",
            role: "HR Manager",
            team: "HR",
            status: "active",
            age: "31",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e27027008d",
            email: "samantha.brooks@example.com",
      },
      {
            id: 9,
            name: "Frank Harrison",
            role: "F. Manager",
            team: "Finance",
            status: "vacation",
            age: "33",
            avatar: "https://i.pravatar.cc/150?img=4",
            email: "frank.harrison@example.com",
      },
      {
            id: 10,
            name: "Emma Adams",
            role: "Ops Manager",
            team: "Operations",
            status: "active",
            age: "35",
            avatar: "https://i.pravatar.cc/150?img=5",
            email: "emma.adams@example.com",
      },
      {
            id: 11,
            name: "Brandon Stevens",
            role: "Jr. Dev",
            team: "Development",
            status: "active",
            age: "22",
            avatar: "https://i.pravatar.cc/150?img=8",
            email: "brandon.stevens@example.com",
      },
      {
            id: 12,
            name: "Megan Richards",
            role: "P. Manager",
            team: "Product",
            status: "paused",
            age: "28",
            avatar: "https://i.pravatar.cc/150?img=10",
            email: "megan.richards@example.com",
      },
      {
            id: 13,
            name: "Oliver Scott",
            role: "S. Manager",
            team: "Security",
            status: "active",
            age: "37",
            avatar: "https://i.pravatar.cc/150?img=12",
            email: "oliver.scott@example.com",
      },
      {
            id: 14,
            name: "Grace Allen",
            role: "M. Specialist",
            team: "Marketing",
            status: "active",
            age: "30",
            avatar: "https://i.pravatar.cc/150?img=16",
            email: "grace.allen@example.com",
      },
      {
            id: 15,
            name: "Noah Carter",
            role: "IT Specialist",
            team: "I. Technology",
            status: "paused",
            age: "31",
            avatar: "https://i.pravatar.cc/150?img=15",
            email: "noah.carter@example.com",
      },
      {
            id: 16,
            name: "Ava Perez",
            role: "Manager",
            team: "Sales",
            status: "active",
            age: "29",
            avatar: "https://i.pravatar.cc/150?img=20",
            email: "ava.perez@example.com",
      },
      {
            id: 17,
            name: "Liam Johnson",
            role: "Data Analyst",
            team: "Analysis",
            status: "active",
            age: "28",
            avatar: "https://i.pravatar.cc/150?img=33",
            email: "liam.johnson@example.com",
      },
      {
            id: 18,
            name: "Sophia Taylor",
            role: "QA Analyst",
            team: "Testing",
            status: "active",
            age: "27",
            avatar: "https://i.pravatar.cc/150?img=29",
            email: "sophia.taylor@example.com",
      },
      {
            id: 19,
            name: "Lucas Harris",
            role: "Administrator",
            team: "Information Technology",
            status: "paused",
            age: "32",
            avatar: "https://i.pravatar.cc/150?img=50",
            email: "lucas.harris@example.com",
      },
      {
            id: 20,
            name: "Mia Robinson",
            role: "Coordinator",
            team: "Operations",
            status: "active",
            age: "26",
            avatar: "https://i.pravatar.cc/150?img=45",
            email: "mia.robinson@example.com",
      },
];

export function capitalize(s) {
      return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}







export default function BlogTable() {
      const [filterValue, setFilterValue] = useState("");
      const [selectedKeys, setSelectedKeys] = useState(new Set([]));
      const [visibleColumns, setVisibleColumns] = useState(new Set());
      const [firstItem, setFirstItem] = useState([]);
      const list = useAsyncList({
            async load({ signal }) {
                  try {
                        const res = await fetch("http://localhost:3000/api/v1/blog/blog-list", { signal });

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
      });
      // Effect hook to log items
      useEffect(() => {
            if (list?.items?.length > 0) {
                  setFirstItem(list.items[0]);
            }
      }, [list.items]);


      useEffect(() => {
            setVisibleColumns(new Set(firstItem.INITIAL_VISIBLE_COLUMNS));
            console.log("First Item:", firstItem);
      }, [firstItem])
      const [statusFilter, setStatusFilter] = useState("all");
      const [rowsPerPage, setRowsPerPage] = useState(5);
      const tableName = 'blog';
      const [sortDescriptor, setSortDescriptor] = useState({
            column: "age",
            direction: "ascending",
      });
      const [page, setPage] = useState(1);

      const hasSearchFilter = Boolean(filterValue);

      const headerColumns = React.useMemo(() => {
            if (visibleColumns === "all") return columns;

            return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
      }, [visibleColumns]);

      const filteredItems = React.useMemo(() => {
            let filteredUsers = [...users];

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
      }, [users, filterValue, statusFilter]);

      const pages = Math.ceil(filteredItems.length / rowsPerPage);

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
                  <div className="flex flex-col gap-4">
                        <div className="flex justify-between gap-3 items-end">
                              <Input
                                    isClearable
                                    className="w-full sm:max-w-[44%]"
                                    placeholder="Search by name..."
                                    startContent={<SearchIcon />}
                                    value={filterValue}
                                    onClear={() => onClear()}
                                    onValueChange={onSearchChange}
                              />
                              <div className="flex gap-3">
                                    <Dropdown>
                                          <DropdownTrigger className="hidden sm:flex">
                                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                                      Status
                                                </Button>
                                          </DropdownTrigger>
                                          <DropdownMenu
                                                disallowEmptySelection
                                                aria-label="Table Columns"
                                                closeOnSelect={false}
                                                selectedKeys={statusFilter}
                                                selectionMode="multiple"
                                                onSelectionChange={setStatusFilter}
                                          >
                                                {statusOptions.map((status) => (
                                                      <DropdownItem key={status.uid} className="capitalize">
                                                            {capitalize(status.name)}
                                                      </DropdownItem>
                                                ))}
                                          </DropdownMenu>
                                    </Dropdown>
                                    <Dropdown>
                                          <DropdownTrigger className="hidden sm:flex">
                                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                                      Columns
                                                </Button>
                                          </DropdownTrigger>
                                          <DropdownMenu
                                                disallowEmptySelection
                                                aria-label="Table Columns"
                                                closeOnSelect={false}
                                                selectedKeys={visibleColumns}
                                                selectionMode="multiple"
                                                onSelectionChange={setVisibleColumns}
                                          >
                                                {columns.map((column) => (
                                                      <DropdownItem key={column.uid} className="capitalize">
                                                            {capitalize(column.name)}
                                                      </DropdownItem>
                                                ))}
                                          </DropdownMenu>
                                    </Dropdown>
                                    <Button color="primary" endContent={<PlusIcon />} className="bg-ws-primary-500">
                                          Add New
                                    </Button>
                              </div>
                        </div>
                        <div className="flex justify-between items-center">
                              <span className="text-default-400 text-small">Total {users.length} users</span>
                              <label className="flex items-center text-default-400 text-small">
                                    Rows per page:
                                    <select
                                          className="bg-transparent outline-none text-default-400 text-small"
                                          onChange={onRowsPerPageChange}
                                    >
                                          <option value="5">5</option>
                                          <option value="10">10</option>
                                          <option value="15">15</option>
                                    </select>
                              </label>
                        </div>
                  </div>
            );
      }, [
            filterValue,
            statusFilter,
            visibleColumns,
            onRowsPerPageChange,
            users.length,
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
                        wrapper: "max-h-[382px]",
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
