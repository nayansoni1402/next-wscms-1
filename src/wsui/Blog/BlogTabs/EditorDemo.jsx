"use client"

import { useState } from "react"
import { Card, CardHeader, CardBody, Button } from "@nextui-org/react"
import EnhancedEditor from "./EnhancedEditor"

export default function EditorDemo() {
  const [editorData, setEditorData] = useState({
    time: new Date().getTime(),
    blocks: [
      {
        type: "header",
        data: {
          text: "Welcome to the Enhanced Editor.js Demo",
          level: 2,
        },
      },
      {
        type: "paragraph",
        data: {
          text: "This is a fully-featured block editor with support for rich content editing. Try out the various blocks and formatting options available!",
        },
      },
      {
        type: "list",
        data: {
          style: "unordered",
          items: [
            "Rich text editing with inline formatting",
            "Multiple block types (headings, lists, code, quotes, etc.)",
            "Embed media content from popular services",
            "Upload and insert images",
            "Create tables with ease",
          ],
        },
      },
      {
        type: "paragraph",
        data: {
          text: "Click the + button to add new blocks and explore all available options.",
        },
      },
    ],
    version: "2.28.2",
  })

  const handleEditorChange = (data) => {
    setEditorData(data)
    console.log("Editor data updated:", data)
  }

  const handleSave = () => {
    alert("Content saved!\n\n" + JSON.stringify(editorData, null, 2))
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mb-6">
        <CardHeader className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Enhanced Editor.js Demo</h1>
          <Button color="primary" onClick={handleSave}>
            Save Content
          </Button>
        </CardHeader>
        <CardBody>
          <EnhancedEditor
            data={editorData}
            onChange={handleEditorChange}
            minHeight={500}
            uploadImageEndpoint="/api/upload-image"
            uploadFileEndpoint="/api/upload-file"
          />
        </CardBody>
      </Card>
    </div>
  )
}

