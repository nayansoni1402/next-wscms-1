import BlogTable from '@/wsui/Blog/Tables/BlogTable'
import PageTitle from '@/wsui/Common/PageTitle'
import { Button } from '@nextui-org/react'
import React from 'react'

export default function page() {
      return (
            <>
                  <div className="flex container p-0 pt-5 justify-between items-center">
                        <PageTitle title={"Blog List"} />
                        <div className="flex justify-end">
                              <Button className="bg-ws-primary-500 text-background rounded" size="md">
                                    Add Category
                              </Button>
                        </div>
                  </div>
                  <div>Blog Card</div>
                  <div className="container p-0 mt-5 mb-5">
                        <BlogTable />
                  </div>

            </>
      )
}
