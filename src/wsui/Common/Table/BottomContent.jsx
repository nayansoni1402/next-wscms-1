import { Pagination } from '@nextui-org/pagination'
import React from 'react'

export default function BottomContent({ pages, page, setPage, selectedKeys, items }) {
      return (
            <div className="flex justify-between mt-6">
                  <Pagination
                        total={pages}
                        page={page}
                        onChange={setPage}
                        showShadow
                        isCompact
                        showControls
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
                  <span className="text-small text-default-400">
                        {selectedKeys === "all"
                              ? "All items selected"
                              : `${selectedKeys.size} of ${items.length} selected`}
                  </span>
            </div>
      )
}
