'use client'
import React, { useState } from 'react'
import {
      Table,
      TableHeader,
      TableColumn,
      TableBody,
      TableRow,
      TableCell,
      getKeyValue,
      Spinner,
} from "@heroui/react";
import { useAsyncList } from "@react-stately/data";
import { Pagination } from '@nextui-org/pagination';
export default function BlogTable() {
      const [isLoading, setIsLoading] = React.useState(true);
      const [selectedKeys, setSelectedKeys] = useState(new Set([]))
      const [page, setPage] = useState(1)
      const rowsPerPage = 3


      let list = useAsyncList({
            async load({ signal }) {
                  let res = await fetch("https://swapi.py4e.com/api/people/?search", {
                        signal,
                  });
                  let json = await res.json();

                  setIsLoading(false);

                  return {
                        items: json.results,
                  };
            },
            async sort({ items, sortDescriptor }) {
                  return {
                        items: items.sort((a, b) => {
                              let first = a[sortDescriptor.column];
                              let second = b[sortDescriptor.column];
                              let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

                              if (sortDescriptor.direction === "descending") {
                                    cmp *= -1;
                              }

                              return cmp;
                        }),
                  };
            },
      });
      const pages = Math.ceil(list.items.length / rowsPerPage)
      const items = list.items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
      return (

            <>
                  <Table
                        aria-label="Example table with client side sorting"
                        classNames={{
                              table: "min-h-[400px]",
                        }}
                        sortDescriptor={items.sortDescriptor}
                        onSortChange={items.sort}
                  >
                        <TableHeader>
                              <TableColumn key="name" allowsSorting>
                                    Name
                              </TableColumn>
                              <TableColumn key="height" allowsSorting>
                                    Height
                              </TableColumn>
                              <TableColumn key="mass" allowsSorting>
                                    Mass
                              </TableColumn>
                              <TableColumn key="birth_year" allowsSorting>
                                    Birth year
                              </TableColumn>
                        </TableHeader>
                        <TableBody
                              isLoading={isLoading}
                              items={items}
                              loadingContent={<Spinner label="Loading..." />}
                        >
                              {(item) => (
                                    <TableRow key={item.name}>
                                          {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                                    </TableRow>
                              )}
                        </TableBody>
                  </Table>
                  <div className="flex justify-start mt-6">
                        <Pagination
                              total={pages}
                              page={page}
                              onChange={setPage}
                              showShadow
                              isCompact showControls
                              classNames={{
                                    wrapper: "gap-0",
                                    item: [
                                          "w-10 h-10",
                                          "text-sm font-medium",
                                          "bg-white",
                                          "border-r border-divider",
                                          "last:border-r-0",
                                          "hover:bg-gray-50",
                                          "data-[active=true]:text-white",
                                          "data-[active=true]",
                                    ].join(" "),
                                    cursor: "bg-[#E67E22]",
                              }}
                        />
                  </div>
            </>
      )
}
