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
import { User } from '@heroui/react';
import { formatDateMoment } from '@/lib/utils';
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import Loading from '@/ui/Loading';

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
            return <Loading />;
      }

      const content = (
            <PopoverContent className="p-3 bg-white shadow-lg rounded-lg border border-gray-200">
                  <div className="text-sm font-semibold text-gray-700">
                        Created Date: {formatDateMoment(data?.created_at)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                        Updated Date: {formatDateMoment(data?.updated_at)}
                  </div>
            </PopoverContent>
      );


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
                              <Link underline="focus" showAnchorIcon color="primary" href={`${process.env.NEXT_PUBLIC_BLOG_WEB_URL}${data.slug}`} target={'_blank'} />

                        </div>
                        <div className="flex items-center gap-2">
                              <User
                                    avatarProps={{
                                          src: data?.added_by?.profile || "https://i.pravatar.cc/150?u=a04258114e29026702d",
                                    }}
                                    description={
                                          <Popover color="foreground" placement="top">
                                                <PopoverTrigger className='cursor-pointer'>
                                                      {data?.added_by?.user_group_id}
                                                </PopoverTrigger>
                                                {content}
                                          </Popover>
                                    }
                                    name={data?.added_by?.username}
                              />
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
                        </div>

                  </div>
                  <div className="container p-0 mt-5 mb-5 min-h-screen">
                        <BlogEditPage data={data} />
                  </div>
            </>
      );
}
