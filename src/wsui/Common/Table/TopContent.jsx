import React, { useMemo, useState } from 'react'
import { Input } from '@nextui-org/input'
import { ChevronDownIcon, PlusIcon, SearchIcon } from '../WsSvg'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { capitalize } from '@/lib/utils'
import { statusOptions } from './commanData'

export default function TopContent({ filterValue, onRowsPerPageChange, onClear, onSearchChange, statusFilter, setStatusFilter, visibleColumns, setVisibleColumns, itemsList, columns }) {

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
                              <Button color="primary" endContent={<PlusIcon />} className="bg-ws-primary-500">
                                    Add New
                              </Button>
                        </div>
                  </div>
                  <div className="flex justify-between items-center">
                        <span className="text-default-400 text-small">Total {itemsList.length} Data</span>
                        <label className="flex items-center text-default-400 text-small">
                              Rows per page:
                              <select
                                    className="bg-transparent outline-none text-default-400 text-small"
                                    onChange={onRowsPerPageChange}
                              >
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                    <option value="150">150</option>
                              </select>
                        </label>
                  </div>
            </div>
      )
}
