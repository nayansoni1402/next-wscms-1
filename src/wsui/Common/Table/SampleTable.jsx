"use client";
import React, { useEffect, useMemo, useState } from "react";
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
      Pagination,
      Spinner,
} from "@nextui-org/react";
import { formatColumnName } from "@/lib/utils";
import { getCookie, setCookie } from "@/lib/cookieUtils";
import { statusOptions } from "./TableData";
import WsSvg from "../WsSvg";
import { RenderCell } from "./renderCell";

export default function SampleTable() {
      const [filterValue, setFilterValue] = useState("");
      const [selectedKeys, setSelectedKeys] = useState(new Set([]));
      const [totalPages, setTotalPages] = useState(1);
      const [statusFilter, setStatusFilter] = useState("all");
      const [rowsPerPage, setRowsPerPage] = useState(100);
      const [datas, setDatas] = useState([]);
      const [visibleColumns, setVisibleColumns] = useState(new Set());
      const [sortDescriptor, setSortDescriptor] = useState({
            column: "age",
            direction: "ascending",
      });
      const [page, setPage] = useState(1);
      const [total, setTotal] = useState(0);
      const [loading, setLoading] = useState(true);
      const tableName = "vendorDetails";
      const fetchData = async (page, rowsPerPage, query = null) => {
            setLoading(true);
            try {
                  const _query = query ? `&search_key=${encodeURIComponent(query)}` : '';
                  const response = await fetch(
                        `/api/vendorDetail?page=${page}&limit=${rowsPerPage}${_query}`
                  );
                  const res = await response.json();
                  setDatas(res.data || []);
                  setTotal(res.total || 0);
                  setTotalPages(res.totalPages || 1);
            } catch (error) {
                  console.error("Error fetching data:", error);
                  setDatas([]);
                  setTotal(0);
                  setTotalPages(1);
            } finally {
                  setLoading(false);
            }
      };

      useEffect(() => {
            fetchData(page, rowsPerPage);
      }, [page, rowsPerPage]);

      const columns = useMemo(() => {
            if (!datas || datas.length === 0) return [];
            const baseColumns = Object.keys(datas[0]);
            return [...baseColumns, "actions"];
      }, [datas]);

      useEffect(() => {
            const cookieData = getCookie("visible_columns");
            if (cookieData[tableName]) {
                  setVisibleColumns(new Set(cookieData[tableName]));
            } else {
                  // Default visible columns
                  const defaultColumns = new Set(columns.slice(0, 5));
                  defaultColumns.add("actions");
                  setVisibleColumns(defaultColumns);
            }
      }, [tableName, columns]);


      const handleVisibleColumnsChange = (newVisibleColumns) => {
            setVisibleColumns(newVisibleColumns);

            // Save to single cookie
            const cookieData = getCookie("visible_columns") || {};
            cookieData[tableName] = Array.from(newVisibleColumns);
            setCookie("visible_columns", cookieData);
      };

      const filteredItems = useMemo(() => {
            let filtered = datas.filter((data) => {
                  if (filterValue) {
                        const lowerCaseFilter = filterValue.toLowerCase();
                        return Object.values(data).some((value) =>
                              value?.toString().toLowerCase().includes(lowerCaseFilter)
                        );
                  }
                  if (statusFilter && statusFilter !== "all") {
                        return Array.from(statusFilter).includes(data.status);
                  }
                  return true;
            });

            // If no results found locally, trigger API call
            if (filterValue && filtered.length === 0) {
                  fetchData(1, rowsPerPage, filterValue);
            }

            return filtered;
      }, [filterValue, statusFilter, datas]);

      const items = useMemo(() => {
            return filteredItems;
      }, [page, rowsPerPage, filteredItems]);

      const sortedItems = useMemo(() => {
            const { column, direction } = sortDescriptor;
            return [...items].sort((a, b) => {
                  const cmp = a[column] < b[column] ? -1 : a[column] > b[column] ? 1 : 0;
                  return direction === "descending" ? -cmp : cmp;
            });
      }, [items, sortDescriptor]);

      const headerColumns = useMemo(() => {
            const visible = [...columns.filter((col) => visibleColumns.has(col))];
            if (visibleColumns.has("actions") && !visible.includes("actions")) {
                  visible.push("actions");
            }
            return visible;
      }, [columns, visibleColumns]);

      const topContent = useMemo(
            () => (
                  <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-end gap-3">
                              <Input
                                    isClearable
                                    classNames={{
                                          base: "w-full sm:max-w-[24%]",
                                          inputWrapper: "border-1",
                                    }}
                                    placeholder="Search by name..."
                                    size="sm"
                                    startContent={<WsSvg type="searchIcon" size={34} />}
                                    value={filterValue}
                                    variant="bordered"
                                    onClear={() => setFilterValue("")}
                                    onValueChange={setFilterValue}
                              />
                              <div className="flex gap-3">
                                    <Dropdown>
                                          <DropdownTrigger>
                                                <Button
                                                      size="sm"
                                                      variant="flat"
                                                      endContent={<WsSvg type="dropdownArrow" hoverColor="#FF0000" size={20} />}
                                                >
                                                      Status
                                                </Button>
                                          </DropdownTrigger>
                                          <DropdownMenu
                                                selectionMode="multiple"
                                                disallowEmptySelection
                                                selectedKeys={statusFilter}
                                                onSelectionChange={setStatusFilter}
                                          >
                                                {statusOptions.map((status) => (
                                                      <DropdownItem key={status.uid} className="capitalize">
                                                            {status.name}
                                                      </DropdownItem>
                                                ))}
                                          </DropdownMenu>
                                    </Dropdown>
                                    <Dropdown>
                                          <DropdownTrigger>
                                                <Button
                                                      size="sm"
                                                      variant="flat"
                                                      endContent={<WsSvg type="dropdownArrow" hoverColor="#FF0000" size={20} />}
                                                >
                                                      Columns
                                                </Button>
                                          </DropdownTrigger>
                                          <DropdownMenu
                                                selectionMode="multiple"
                                                disallowEmptySelection
                                                selectedKeys={visibleColumns}
                                                onSelectionChange={(keys) => handleVisibleColumnsChange(keys)}
                                          >
                                                {columns.map((column) => (
                                                      <DropdownItem key={column}>
                                                            {formatColumnName(column)}
                                                      </DropdownItem>
                                                ))}
                                          </DropdownMenu>
                                    </Dropdown>
                                    <Button
                                          className="bg-foreground text-background"
                                          size="sm"
                                          // endContent={<SvgIcons.PlusIcon />}
                                    >
                                          Add New
                                    </Button>
                              </div>
                        </div>
                        <div className="flex justify-between items-center">
                              <span className="text-default-400 text-small">
                                    Total {total} row
                              </span>
                              <label className="flex items-center text-default-400 text-small">
                                    Rows per page:
                                    <select
                                          className="bg-transparent outline-none"
                                          value={rowsPerPage}
                                          onChange={(e) => setRowsPerPage(Number(e.target.value))}
                                    >
                                          {[100, 200, 300].map((count) => (
                                                <option key={count} value={count}>
                                                      {count}
                                                </option>
                                          ))}
                                    </select>
                              </label>
                        </div>
                  </div>
            ),
            [filterValue, rowsPerPage, datas?.length, statusFilter, visibleColumns]
      );

  

      if (loading || headerColumns.length === 0) {
            return <div>Loading...</div>;
      }
      return (
            <Table
                  aria-label="Data Table"
                  bottomContentPlacement="outside"
                  selectedKeys={selectedKeys}
                  selectionMode="multiple"
                  sortDescriptor={sortDescriptor}
                  topContent={topContent}
                  topContentPlacement="outside"
                  onSelectionChange={setSelectedKeys}
                  onSortChange={setSortDescriptor}
            >
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
                        items={sortedItems ?? []}
                        loadingContent={<Spinner />}
                        loadingState={loading}
                        emptyContent="No data found">
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
      );
}