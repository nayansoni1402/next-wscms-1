'use client';
import React from "react";
import {
      Button,
      DropdownTrigger,
      Dropdown,
      DropdownMenu,
      DropdownItem,
      Chip,
      User,
      // Link
} from "@heroui/react";
import { statusColorMap, statusMap } from "./commanData";
import { DeleteIcon, EditIcon, EyeIcon, NotificationIcon } from "../WsSvg";
import { Tooltip } from "@nextui-org/react";
import Link from "next/link";

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
                                    <Link href={cellValue.view ?? '#'} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                          <EyeIcon />
                                    </Link>
                              </Tooltip>
                              <Tooltip color="warning" content="Edit Page">
                                    <Link href={cellValue.edit ?? '#'} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                          <EditIcon />
                                    </Link>
                              </Tooltip>
                              <Tooltip color="danger" content="Delete Page">
                                    <Link href={cellValue.delete ?? '#'} className="text-lg text-danger cursor-pointer active:opacity-50">
                                          <DeleteIcon />
                                    </Link>
                              </Tooltip>
                        </div>
                  );
            default:
                  return cellValue;
      }
};

export default TableCellCustom