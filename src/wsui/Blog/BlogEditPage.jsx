'use client'
import React, { useState } from "react";
import { Alert, Form } from "@heroui/react";
import { Spinner } from "@nextui-org/react";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import Description from './BlogTabs/Description';
import General from './BlogTabs/General';
import Comments from './BlogTabs/Comments';
import { Copy } from 'lucide-react';
import { Button } from '@nextui-org/react';
import FAQ from './BlogTabs/FAQ';
import { generalValidationSchema, seoValidationSchema } from "../allSchema/blogEditSchema";
import { fetchData } from "@/lib/apiCall";
import { useParams } from "next/navigation";
import { z } from "zod";

export default function BlogEditPage({ data }) {
  const { pageId } = useParams();
  const [action, setAction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (formData) => {
    setLoading(true);
    setErrors({});
    try {
      // Validate form data
      const parsedGeneralData = generalValidationSchema.parse(formData);
      const parsedSeoData = seoValidationSchema.parse(formData);

      // Merge validated data
      const parsedData = { ...parsedGeneralData, ...parsedSeoData };
      // Make API request
      const response = await fetchData(`/blog-list/${pageId}`, 'PATCH', parsedData, false);
      if (!response) {
        throw new Error("No response from the server");
      }
      console.log("response--");
      console.log(response);

      if (response.error) {
        throw new Error(response.error);
      }
      setAction(`Success: ${(response)}`);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
        setAction(formData);
      } else {
        setErrors({ "error": error.message });
        setAction(`Error: ${JSON.stringify(error.message, null, 2)}`);
      }
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
    <div className="flex w-full flex-col px-4">
      {/* Action Message */}
      {action && (
        <div className="text-small text-default-500">
          Action: <pre>{JSON.stringify(action, null, 2)}</pre>
        </div>
      )}
      {/* Display validation errors */}
      {Object.keys(errors).length > 0 && (
        <div className="flex items-center justify-center w-full">
          <div className="flex flex-col w-full">
            <div className="w-full flex items-center my-3">
              <Alert color="danger" title={<ul className="list-disc ml-4">
                {Object.entries(errors).map(([field, message]) => (
                  <li key={field}><strong>{field}:</strong> {message}</li>
                ))}
              </ul>} />
            </div>
          </div>
        </div>
      )}

      {/* Form Submission */}
      <Form
        className="flex w-full flex-col w-min-48"
        validationBehavior="native"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = Object.fromEntries(new FormData(e.currentTarget));
          await handleSubmit(formData);
        }}
      >
        {/* Tabs Section */}
        <div className="flex w-full flex-col">
          <Tabs
            aria-label="Options"
            isVertical
            classNames={{
              tabList: "w-full relative rounded-none p-0 border-b border-divider text-bold bg-white p-4",
              cursor: "w-full bg-ws-primary-500",
              tab: "max-w-fit px-0 h-12",
              tabContent: "group-data-[selected=true]:text-ws-primary-500",
            }}
            variant="underlined"
          >
            {tabs.map(({ key, title, component }) => (
              <Tab className="w-full" key={key} title={<div className="flex w-full items-center space-x-2">{title}</div>}>
                <Card className="w-full flex flex-col">
                  <CardBody className="p-6 w-full">{component}</CardBody>
                </Card>
              </Tab>
            ))}
          </Tabs>
        </div>

        <Button variant="flat" startContent={<Copy size={20} />}>
          Copy Page
        </Button>

        {/* Submit & Cancel Buttons */}
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
          <Button variant="flat">Cancel</Button>
        </div>
      </Form>
    </div>
  );
}
