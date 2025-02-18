'use client'
import React, { useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import { Spinner } from "@nextui-org/react";

export default function General() {
  const [action, setAction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
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

  return (
    <div className="">
      General:- Basic Blog Details Image title meta, schema or FAQ
      <Form
        className="w-full max-w-xs flex flex-col gap-4"
        validationBehavior="native"
        onReset={() => setAction("reset")}
        onSubmit={async (e) => {
          e.preventDefault();
          const data = Object.fromEntries(new FormData(e.currentTarget));
          await handleSubmit(data);
        }}
      >
        <Input
          isRequired
          errorMessage="Please enter a valid username"
          label="Username"
          labelPlacement="outside"
          name="username"
          placeholder="Enter your username"
          type="text"
        />

        <Input
          isRequired
          errorMessage="Please enter a valid email"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
        />
        <div className="flex gap-2">
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
          <Button type="reset" variant="flat">
            Reset
          </Button>
        </div>
        {action && (
          <div className="text-small text-default-500">
            Action: <code>{action}</code>
          </div>
        )}
      </Form>
    </div>
  );
}
