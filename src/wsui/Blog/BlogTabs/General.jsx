"use client"
// description,description_old,short_content,status,faq,comments , image url
import { useState } from "react"
import FormRenderer from "./FromRender"
import { ROBOT_LABELS } from "@/lib/helper"
import { generalValidationSchema, seoValidationSchema } from "@/wsui/allSchema/blogEditSchema";
import { Divider } from "@nextui-org/react";

const author = {
  "1": "John Doe",
  "2": "Jane Smith"
};
const categories = {
  "Technology": "Technology",
  "Business": "Business",
  "Health": "Health"
};

const generalConfig = [
  { name: "title", label: "Title", type: "text", description: "This will show in H1." },
  { name: "slug", label: "Slug", type: "text", description: "Slug can only contain letters, numbers, and hyphens." },
  { name: "publish_date", label: "Publish Date", type: "date" },
  { name: "view", label: "View Count", type: "number" },
  { name: "author_id", label: "Author", type: "select", description: "Enter the author's name.", options: author },
  { name: "category_id", label: "Category", type: "select", description: "Select the category.", options: categories },
  { name: "image_alt", label: "Image Alt", type: "text" },
  { name: "image", label: "Image", type: "file" },
];

const seoConfig = [
  { name: "meta_title", label: "Meta Title", description: "The ideal length for a meta title is 50–60 characters.", type: "text" },
  { name: "meta_description", label: "Meta Description", description: "Enter a short description for SEO.", type: "textarea" },
  { name: "meta_keywords", label: "Keywords", description: "Add comma-separated keywords.", type: "text" },
  { name: "new_redirect", label: "Redirect URL", description: "Provide a URL for redirection.", type: "text" },
  { name: "robots", label: "Robots", description: "SEO robots meta tag.", type: "select", options: ROBOT_LABELS },
];



export default function General({ data }) {
  const [formData, setFormData] = useState(data)

  const handleDataChange = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }))
  }

  return (
    <div className="w-full text-sm text-muted-foreground p-4 grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-100px)]">
      {/* Left Side: Blog Details & SEO Settings (Takes 2/3rd width) */}
      <div className="md:col-span-2 h-full overflow-y-auto pr-2">
        <p className="mb-4 font-semibold">General: Blog Details & SEO Settings</p>

        {/* Blog Details */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Blog Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormRenderer config={generalConfig} initialData={formData} onDataChange={handleDataChange} zodSchema={generalValidationSchema} />
          </div>
        </div>

        <Divider className="my-4" />
        {/* SEO Settings */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">SEO Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormRenderer config={seoConfig} initialData={formData} onDataChange={handleDataChange} zodSchema={seoValidationSchema} />
          </div>
        </div>
      </div>

      {/* Right Side: Preview Section (Takes 1/3rd width) */}
      <div className="border rounded-lg p-4 bg-white shadow-md md:col-span-1 h-full overflow-y-auto">
        <h3 className="font-semibold mb-2">Preview</h3>
        <div className="p-2">
          <h1 className="text-lg font-bold">{"Blog Title"}</h1>
          <p className="text-xs text-gray-500">By {"Author Name"}</p>
          <div className="mt-2 w-full h-40 bg-gray-200 flex items-center justify-center rounded-md">
            <span className="text-gray-500 text-sm">No Image Uploaded</span>
          </div>
          {/* Meta Description Preview */}
          <p className="mt-2 text-gray-600 text-sm">{"Meta description preview..."}</p>
        </div>
      </div>
    </div>

  );


}