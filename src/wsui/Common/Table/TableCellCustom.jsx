'use client';
import React from "react";
import {
      Button,
      DropdownTrigger,
      Dropdown,
      DropdownMenu,
      DropdownItem,
      Chip,
      User
} from "@heroui/react";
import { statusColorMap } from "./commanData";
import WsSvg, { VerticalDotsIcon } from "../WsSvg";

function TableCellCustom({ user, columnKey }) {
      const cellValue = user[columnKey];

      switch (columnKey) {
            case "name":
                  return (
                        <User
                              avatarProps={{ radius: "lg", src: user.avatar }}
                              description={user.email}
                              name={cellValue}
                        >
                              {user.email}
                        </User>
                  );
            case "role":
                  return (
                        <div className="flex flex-col">
                              <p className="text-bold text-small capitalize">{cellValue}</p>
                              <p className="text-bold text-tiny capitalize text-default-400">{user.team}</p>
                        </div>
                  );
            case "status":
                  return (
                        <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
                              {cellValue}
                        </Chip>
                  );
            case "actions":
                  return (
                        <div className="relative flex justify-end items-center gap-2">
                              <Dropdown>
                                    <DropdownTrigger>
                                          <Button isIconOnly size="sm" variant="light">
                                                <VerticalDotsIcon className="text-default-300" />
                                          </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu>
                                          <DropdownItem key="view">View</DropdownItem>
                                          <DropdownItem key="edit">Edit</DropdownItem>
                                          <DropdownItem key="delete">Delete</DropdownItem>
                                    </DropdownMenu>
                              </Dropdown>
                        </div>
                  );
            default:
                  return cellValue;
      }
};

export default TableCellCustom