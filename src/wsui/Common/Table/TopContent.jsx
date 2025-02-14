import React, { useMemo, useState } from 'react'
import { Input } from '@nextui-org/input'
import { ChevronDownIcon, PlusIcon, SearchIcon } from '../WsSvg'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { capitalize } from '@/lib/utils'
import { statusOptions } from './commanData'
import { FilterIcon, FilterXIcon, ListFilterIcon } from 'lucide-react'
import FilterSideBar from '../FilterSideBar/FilterSideBar'

export default function TopContent({ filterValue, onClear, onSearchChange, statusFilter, setStatusFilter, visibleColumns, setVisibleColumns, columns, selectedKeys,
      totalItems }) {

      return (
            <div className="flex flex-col gap-4">
                  <div className="flex justify-between gap-3 items-end">
                        <Input
                              isClearable
                              className="w-full sm:max-w-[44%]"
                              placeholder="Search by UID or Title..."
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
                              {/* Advance Filter */}
                              <FilterSideBar />
                              {/* <Button color="primary" endContent={<PlusIcon />} className="bg-ws-primary-500">
                                    Clone
                              </Button> */}
                        </div>
                  </div>
                  <div className="flex justify-between items-center">
                        <span className="w-[30%] text-small text-default-400">
                              {selectedKeys === "all"
                                    ? "All items selected"
                                    : `${selectedKeys.size} of ${totalItems} selected`}
                        </span>
                  </div>
            </div>
      )
}
