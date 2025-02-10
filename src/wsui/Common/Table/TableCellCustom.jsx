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
import WsSvg, { DeleteIcon, EditIcon, EyeIcon, VerticalDotsIcon } from "../WsSvg";
import { Avatar, badge, Badge, Tooltip } from "@nextui-org/react";

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
                              description={user.category_name}
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
                        <div className="relative flex items-center gap-2">
                              <Tooltip content="Visit Page">
                                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                          <EyeIcon />
                                    </span>
                              </Tooltip>
                              <Tooltip color="warning" content="Edit Page">
                                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                          <EditIcon />
                                    </span>
                              </Tooltip>
                              <Tooltip color="danger" content="Delete Page">
                                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                          <DeleteIcon />
                                    </span>
                              </Tooltip>
                        </div>
                  );
            default:
                  return cellValue;
      }
};

export default TableCellCustom