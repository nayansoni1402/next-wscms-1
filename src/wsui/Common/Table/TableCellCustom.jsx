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
import { statusColorMap, statusMap } from "./commanData";
import WsSvg, { VerticalDotsIcon } from "../WsSvg";
import { Avatar, badge, Badge } from "@nextui-org/react";

function TableCellCustom({ user, columnKey }) {
      const cellValue = user[columnKey];

      switch (columnKey) {
            case "added_by":
                  return (
                        <User
                              avatarProps={{ radius: "full", src: user.added_by_profile }}
                              description={user.userGroup}
                              name={cellValue}
                        >

                        </User>
                  );
            case "title":
                  return (
                        <User
                              avatarProps={{
                                    radius: "sm",
                                    size: "lg",
                                    src: user.image

                              }}
                              description={user.image_alt}
                              name={cellValue}
                        >
                        </User>
                  );
            case "view":
                  return (
                        <div className="flex flex-col">
                              <p className="text-bold text-small capitalize">{cellValue}</p>
                              <p className="text-bold text-tiny capitalize text-default-400">{user.team}</p>
                              {user.comments_count != 0 && <Badge color="danger" content={user.comments_count} shape="circle" />}
                        </div>
                  );
            case "status":
                  return (
                        <Chip className="capitalize border-none gap-1 text-default-600" color={statusColorMap[user.status]} size="sm" variant="dot">
                              {statusMap[cellValue]}
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