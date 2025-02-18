'use client';

import { useEffect, useState, useCallback } from 'react';
import { fetchData } from '@/lib/apiCall';
import PageTitle from '@/wsui/Common/PageTitle';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link } from '@nextui-org/react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { statusColorMap, statusMap } from '@/wsui/Common/Table/commanData';
import BlogEditPage from '@/wsui/Blog/BlogEditPage';
import AlertWithAction from '@/wsui/Common/Alert/AlertWithAction';

export default function Page() {
      const { pageId } = useParams();
      const router = useRouter();
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      const fetchDataAsync = useCallback(async () => {
            if (!pageId) return;

            setLoading(true);
            setError(null);
            try {
                  const response = await fetchData(`/blog-list/${pageId}`, "GET");
                  setData(response);
            } catch (error) {
                  console.error("Error fetching data:", error);
                  setError(error.message);
            } finally {
                  setLoading(false);
            }
      }, [pageId]);

      useEffect(() => {
            fetchDataAsync();
      }, [fetchDataAsync]);

      if (error) {
            return <AlertWithAction desc={error} type="danger" />;
      }
      if (loading) {
            return <p className="text-gray-500">Loading...</p>;
      }
      return (
            <>
                  <div className="container p-0 pt-5 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                              <Button
                                    variant="light"
                                    isIconOnly
                                    onPressEnd={() => router.back()}
                                    startContent={<ArrowLeft className="w-5 h-5" />}
                                    className="text-gray-700 hover:text-black transition-colors"
                              />
                              <PageTitle title={`${data?.title} ${data?.ref_id ? `(${data.ref_id})` : ""}` || "Loading..."} />
                        </div>
                        <div className="flex items-center gap-2">

                              <Dropdown backdrop="blur">
                                    <DropdownTrigger>
                                          <Button color={statusColorMap[data.status]} variant="bordered" endContent={<ChevronDown />}>
                                                {statusMap[data.status]}
                                          </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Status Actions" variant="faded">
                                          <DropdownItem key="1" color="success">Active</DropdownItem>
                                          <DropdownItem key="0" color="danger">Disable</DropdownItem>
                                          <DropdownItem key="2" color="warning">Draft</DropdownItem>
                                    </DropdownMenu>
                              </Dropdown>
                              <Button
                                    showAnchorIcon
                                    as={Link}
                                    isIconOnly
                                    color="primary"
                                    href={`${process.env.NEXT_PUBLIC_BLOG_WEB_URL}${data.slug}`}
                                    variant="solid"
                                    target='_blank'
                              />
                        </div>

                  </div>
                  <div className="container p-0 mt-5 mb-5 min-h-screen">
                        <BlogEditPage data={data} />
                  </div>
            </>
      );
}
