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
import WsSvg, { DeleteIcon, EditIcon, EyeIcon, NotificationIcon, VerticalDotsIcon } from "../WsSvg";
import { Avatar, badge, Badge, Tooltip } from "@nextui-org/react";

function TableCellCustom({ item, columnKey }) {
      const cellValue = item[columnKey];

      switch (columnKey) {
            case "added_by":
                  return (
                        <User
                              avatarProps={{ radius: "full", src: item.added_by_profile }}
                              description={item.userGroup}
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
                                    src: item.image

                              }}
                              description={
                                    <>
                                          {item.comments_count !== 0 && (
                                                <Tooltip content={
                                                      <div className="px-1 py-2">
                                                            <div className="text-small">Unread Comments</div>
                                                            <div className="text-tiny">
                                                                  You have {item.comments_count} unread {item.comments_count > 1 ? "comments" : "comment"}.
                                                            </div>
                                                      </div>
                                                }>
                                                      <Chip
                                                            color="danger"
                                                            endContent={<NotificationIcon size={14} />}
                                                            size="sm"
                                                            variant="flat"
                                                      >
                                                            {item.comments_count}
                                                      </Chip>
                                                </Tooltip>
                                          )}
                                          {' '}
                                          {item.category_name}
                                    </>
                              }

                              name={cellValue}
                        >
                        </User >
                  );
            case "view":
                  return (
                        <div className="flex flex-col">
                              <p className="text-bold text-small capitalize">{cellValue}</p>
                              <p className="text-bold text-tiny capitalize text-default-400">{item.team}</p>
                              {item.comments_count != 0 && <Badge color="danger" content={item.comments_count} shape="circle" />}
                        </div>
                  );
            case "status":
                  return (
                        <Chip className="capitalize border-none gap-1 text-default-600" color={statusColorMap[item.status]} size="sm" variant="dot">
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