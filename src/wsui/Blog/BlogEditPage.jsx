'use client'
import React from 'react';
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import Description from './BlogTabs/Description';
import General from './BlogTabs/General';
import Comments from './BlogTabs/Comments';
import { Command, MessageCircle, Paperclip, Copy } from 'lucide-react';
import { Button } from '@nextui-org/react';

const tabs = [
  { key: "general", title: "General Detail", component: <General /> },
  { key: "description", title: "Description", component: <Description /> },
  { key: "comment", title: "Comments", component: <Comments /> },
];

export default function BlogEditPage() {
  return (
    <div className="flex flex-col px-4">
      {/* Tabs Section */}
      <Tabs aria-label="Options" isVertical classNames={{
        tabList: "w-full relative rounded-none p-0 border-b border-divider text-bold bg-white p-4",
        cursor: "w-full bg-ws-primary-500",
        tab: "max-w-fit px-0 h-12",
        tabContent: "group-data-[selected=true]:text-ws-primary-500",
      }}
        variant='underlined'>
        {tabs.map(({ key, title, icon, component }) => (
          <Tab key={key} title={<div className="flex items-center space-x-2 ">{title}</div>}>
            <Card>
              <CardBody>{component}</CardBody>
            </Card>
          </Tab>
        ))}
      </Tabs>

      {/* Button Below Tabs */}
      <Button className="mt-4 flex items-center space-x-2 p-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 w-36">
        <Copy size={20} />
        <span>Copy Page</span>
      </Button>
    </div>
  );
}
