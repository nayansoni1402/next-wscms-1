
import { User, Tooltip, Chip, Snippet } from "@nextui-org/react";
import React from "react";

const statusColorMap = {
      0: { color: "danger", text: "disable" },
      1: { color: "success", text: "active" },
      2: { color: "warning", text: "pending" },
};

export const RenderCell = ({ item, columnKey }) => {
      const cellValue = item[columnKey];
      switch (columnKey) {
            case "title":
                  return (
                        <User
                              avatarProps={{ radius: "full", size: "sm", src: item?.image }}
                              description={item.title}
                              name={cellValue}
                        />
                  );
            case "role":
                  return (
                        <div className="flex flex-col">
                              <p className="text-bold text-small capitalize">{cellValue}</p>
                              <p className="text-bold text-tiny text-default-500 capitalize">
                                    {item.team}
                              </p>
                        </div>
                  );
            case "status":
                  const status = statusColorMap[item.status];
                  return status ? (
                        <Chip
                              className="capitalize text-default-600"
                              color={status.color}
                              size="sm"
                              variant="flat"
                        >
                              {status.text}
                        </Chip>
                  ) : (
                        <Chip className="capitalize text-default-600" size="sm" variant="flat">
                              Unknown
                        </Chip>
                  );
            case "actions":
                  return (
                        <div className="flex items-center gap-2">
                              <Tooltip content="Details">
                              EyeIcon
                                    {/* <SvgIcons.EyeIcon className="text-lg text-default-400 cursor-pointer" /> */}
                              </Tooltip>
                              <Tooltip content="Edit user">
                              EditIcon
                                    <button onClick={() => console.log("Edit user", item.id)}>
                                          {/* <SvgIcons.EditIcon className="text-lg text-default-400 cursor-pointer" /> */}
                                    </button>
                              </Tooltip>
                              <Tooltip content="Delete user" color="danger">
                              DeleteIcon
                                    <button onClick={() => console.log("Delete user", item.id)}>
                                          {/* <SvgIcons.DeleteIcon className="text-lg text-danger cursor-pointer" /> */}
                                    </button>
                              </Tooltip>
                        </div>
                  );
            case "contactNo":
                  return (
                        <Snippet size="sm" hideSymbol={true}>
                              {item.contactNo}
                        </Snippet>
                  );
            default:
                  return cellValue;
      }
};