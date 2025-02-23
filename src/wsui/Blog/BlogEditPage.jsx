'use client'
import React, { useState } from "react";
import { Form } from "@heroui/react";
import { Spinner } from "@nextui-org/react";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import Description from './BlogTabs/Description';
import General from './BlogTabs/General';
import Comments from './BlogTabs/Comments';
import { Copy } from 'lucide-react';
import { Button } from '@nextui-org/react';
import FAQ from './BlogTabs/FAQ';

export default function BlogEditPage({ data }) {

  const [action, setAction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      // const parsedData = GeneralSchema.parse(formData); 
      setAction(formData);
      return true;
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      setAction(`Success: ${JSON.stringify(result)}`);
    } catch (error) {
      setAction(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { key: "general", title: "General Detail", component: <General data={data} /> },
    { key: "description", title: "Description", component: <Description data={data} /> },
    { key: "faq", title: "FAQ", component: <FAQ data={data} /> },
    { key: "comment", title: "Comments", component: <Comments data={data} /> },
  ];

  return (
    <div className="flex  w-full flex-col px-4">
      <Form
        className="flex w-full flex-col w-min-48"
        validationBehavior="native"
        // onReset={() => setAction("reset")}
        onSubmit={async (e) => {
          e.preventDefault();
          const data = Object.fromEntries(new FormData(e.currentTarget));
          await handleSubmit(data);
        }}
      >

        {/* Tabs Section */}
        <div className="flex w-full flex-col">

          <Tabs aria-label="Options" isVertical
            classNames={{
              tabList: "w-full relative rounded-none p-0 border-b border-divider text-bold bg-white p-4",
              cursor: "w-full bg-ws-primary-500",
              tab: "max-w-fit px-0 h-12",
              tabContent: "group-data-[selected=true]:text-ws-primary-500",
            }}
            variant='underlined'>
            {tabs.map(({ key, title, component }) => (
              <Tab key={key} title={<div className="flex w-full items-center space-x-2">{title}</div>}>
                <Card className="w-full flex flex-col">
                  <CardBody className="p-6 !w-full">
                    {component}
                  </CardBody>
                </Card>
              </Tab>
            ))}
          </Tabs>
        </div>
        <Button variant="flat" startContent={<Copy size={20} />}>
          Copy Page
        </Button>

        <div className="flex items-center gap-4 py-4">
          <Button
            color="primary"
            type="submit"
            isDisabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Spinner color="warning" size="sm" />
                <span>Submitting...</span>
              </>
            ) : (
              "Submit"
            )}
          </Button>
          <Button variant="flat">
            Cancel
          </Button>
        </div>
        {action && (
          <div className="text-small text-default-500">
            Action: <pre>{JSON.stringify(action, true, 2)}</pre>
          </div>
        )}
      </Form>
    </div >
  );
}
