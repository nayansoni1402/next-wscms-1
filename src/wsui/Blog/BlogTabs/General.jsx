"use client"

import { useState } from "react"
import FormRenderer from "./FromRender"
import { ROBOT_LABELS } from "@/lib/helper"

const author = {
  "1": "John Doe",
  "2": "Jane Smith"
};
const categories = {
  "Technology": "Technology",
  "Business": "Business",
  "Health": "Health"
};

const generalConfig = {
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      description: "This will show in H1.",
      validation: { min: 3, max: 100, message: "Title must be 3-100 characters." },
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      description: "Slug can only contain letters, numbers, and hyphens",
      validation: {
        min: 3,
        max: 100,
        regex: /^[a-zA-Z0-9-]+$/,
        message: "Slug must be 3-100 characters and only contain letters, numbers, and hyphens.",
      },
    },
    { name: "author_id", label: "Author", type: "select", description: "Enter the author's name.", options: author },
    { name: "category_id", label: "Category", type: "select", description: "Select the category.", options: categories },
    { name: "publish_date", label: "Publish Date", type: "date" },
    {
      name: "view",
      label: "View Count",
      type: "number",
      validation: { min: 1, max: 10, message: "View count must be between 1-10 digits." },
    },
    {
      name: "image_alt",
      label: "Image Alt",
      type: "text",
      validation: { min: 3, max: 100, message: "Alt text must be 3-100 characters." },
    },
    { name: "image", label: "Image", type: "file" },
  ],
}

const seoConfig = {
  fields: [
    {
      name: "meta_title",
      label: "Meta Title",
      description: "The ideal length for a meta title is 50–60 characters.",
      type: "text",
      validation: { min: 10, max: 60, message: "Meta title must be 10-60 characters." },
    },
    {
      name: "meta_description",
      label: "Meta Description",
      description: "Enter a short description for SEO.",
      type: "text",
      validation: { min: 20, max: 160, message: "Meta description must be 20-160 characters." },
    },
    {
      name: "meta_keywords",
      label: "Keywords",
      description: "Add comma-separated keywords.",
      type: "text",
      validation: { min: 5, max: 100, message: "Keywords must be 5-100 characters." },
    },
    {
      name: "new_redirect",
      label: "Redirect URL",
      description: "Provide a URL for redirection.",
      type: "text",
      validation: { min: 5, max: 100, message: "Redirect URL must be 5-100 characters." },
    },
    {
      name: "robots",
      label: "Robots",
      description: "SEO robots meta tag.",
      type: "select",
      options: ROBOT_LABELS,
      validation: { min: 3, max: 50, message: "Robots value must be 3-50 characters." },
    },
  ],
}

export default function General({ data }) {
  const [formData, setFormData] = useState(data)

  const handleDataChange = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }))
  }

  return (
    <div className="w-full text-sm text-muted-foreground p-4">
      <p className="mb-4 font-semibold">General: Blog Details & SEO Settings</p>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Blog Details</h3>
        <div className="grid grid-cols-3 gap-4">
          <FormRenderer config={generalConfig} initialData={formData} onDataChange={handleDataChange} />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">SEO Settings</h3>
        <div className="grid grid-cols-3 gap-4">
          <FormRenderer config={seoConfig} initialData={formData} onDataChange={handleDataChange} />
        </div>
      </div>
    </div>
  )
}