import React, { useMemo, useState } from 'react'
import { columns, statusOptions } from './TableData'
import { Input } from '@nextui-org/input'

export default function TopContent() {

      return (
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
                              // startContent={<WsSvg type="searchIcon" size={34} />}
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
      )
}
