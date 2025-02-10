import BlogTable from '@/wsui/Blog/Tables/BlogTable'
import PageTitle from '@/wsui/Common/PageTitle'
import { Button } from '@nextui-org/react'
import React from 'react'


async function getBlogs() {
      try {
            const response = await fetch(process.env.NEXT_PUBLIC_BLOG_API_URL, {
                  method: "GET",
                  headers: {
                        "Content-Type": "application/json"
                  },
            });

            if (!response.ok) {
                  throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            return data; // Returns { results: { items }, next }
      } catch (error) {
            console.error("Failed to fetch blogs:", error.message);
            return null;
      }
}

export default async function page() {
      const blogData = await getBlogs();
      return (
            <>
                  <div className="flex container p-0 pt-5 justify-between items-center">
                        <PageTitle title={"Blog List"} />
                        {/* <div className="flex justify-end">
                              <Button className="bg-ws-primary-500 text-background rounded" size="md">
                                    Add Category
                              </Button>
                        </div> */}
                  </div>
                  <div>Blog Card</div>
                  <div className="container p-0 mt-5 mb-5">
                        <BlogTable blogData={blogData} />
                  </div>

            </>
      )
}
