'use client';

import { useEffect, useState } from 'react';
import { fetchData } from '@/lib/apiCall';
import PageTitle from '@/wsui/Common/PageTitle';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowBigLeft, ArrowLeft, ChevronDown, DropletIcon } from 'lucide-react';
import { statusColorMap, statusMap, statusOptions } from '@/wsui/Common/Table/commanData';
import BlogPage from '@/wsui/Blog/BlogEditPage';
import BlogEditPage from '@/wsui/Blog/BlogEditPage';

export default function Page() {
      const { pageId } = useParams();
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const router = useRouter();
      const fetchDataAsync = async () => {
            setLoading(true);
            setError(null);
            try {
                  const response = await fetchData(`/blog-list/${pageId}`, "GET");
                  setData(response);
            } catch (error) {
                  console.error("Error fetching data:", error);
                  setError("Failed to load blog data.");
            } finally {
                  setLoading(false);
            }
      };

      useEffect(() => {
            if (!pageId) return;
            fetchDataAsync();
      }, [pageId]);

      return (
            <>
                  <div className="flex container p-0 pt-5 justify-between items-center">
                        <div className="flex">
                              <Button
                                    variant="light"
                                    isIconOnly
                                    onPressEnd={() => router.back()}
                                    startContent={<ArrowLeft className="w-5 h-5" />}
                                    className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
                              />
                              <PageTitle title={data?.title || "Loading..."} />
                        </div>

                        <div className="flex justify-end">
                              <Dropdown backdrop="blur">
                                    <DropdownTrigger>
                                          <Button color={statusColorMap[data?.status]} variant="bordered" endContent={<ChevronDown />}>
                                                {statusMap[data?.status]}
                                          </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Static Actions" variant="faded">
                                          <DropdownItem key="1" color="success">Active</DropdownItem>
                                          <DropdownItem key="0" color="danger">Disable</DropdownItem>
                                          <DropdownItem key="2" color="warning">Draft</DropdownItem>
                                    </DropdownMenu>
                              </Dropdown>
                        </div>
                  </div>

                  <div className="container p-0 mt-5 mb-5 min-h-screen">
                        {loading && <p className="text-gray-500">Loading...</p>}
                        {error && <p className="text-red-500">{error}</p>}
                        {!loading && !error &&
                              <BlogEditPage data={data} />}
                  </div>
            </>
      );
}
