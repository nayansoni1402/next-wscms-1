import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Divider } from "@nextui-org/react";

// Load Editor.js dynamically (avoiding SSR issues)
const EditorJS = dynamic(() => import("@/wsui/Blog/BlogTabs/Editor"), { ssr: false });

export default function Description({ data }) {
  const [oldDesc, setOldDesc] = useState(data?.description_old || "");
  const [desc, setDesc] = useState("");
  const [isConverted, setIsConverted] = useState(false);
  const editorRef = useRef(null);

  // Handle conversion of old description into editable format
  const handleConvert = () => {
    setDesc(oldDesc);
    setIsConverted(true);
  };

  return (
    <div className="w-full text-sm text-muted-foreground p-4 grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-100px)]">
      {/* Left Side: Blog Details & SEO Settings */}
      <div className="md:col-span-2 h-full overflow-y-auto pr-2">
        <p className="mb-4 font-semibold">General: Blog Details & SEO Settings</p>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Blog Details</h3>

          {/* Two Sections: Old Desc & New Editor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Old Description */}
            {oldDesc && !isConverted ? (
              <div className="border p-4 rounded-md bg-gray-100">
                <h4 className="font-semibold mb-2">Old Description</h4>
                <div dangerouslySetInnerHTML={{ __html: oldDesc }} className="text-sm text-gray-700" />
                <button
                  onClick={handleConvert}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Convert to Editable
                </button>
              </div>
            ) : (
              <div className="border p-4 rounded-md bg-gray-100">
                <h4 className="font-semibold mb-2">Edit Description</h4>
                <EditorJS data={desc} onChange={setDesc} ref={editorRef} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Side: Blog Preview or Old Desc Fallback */}
      <div className="border rounded-lg p-4 bg-white shadow-md md:col-span-1 h-full overflow-y-auto">
        <h3 className="font-semibold mb-2">Preview</h3>

        {oldDesc ? (
          <div className="p-2">
            <h1 className="text-lg font-bold">{"Blog Title"}</h1>
            <p className="text-xs text-gray-500">By {"Author Name"}</p>
            <div className="mt-2 w-full h-40 bg-gray-200 flex items-center justify-center rounded-md">
              <span className="text-gray-500 text-sm">No Image Uploaded</span>
            </div>
            <p className="mt-2 text-gray-600 text-sm">{"Meta description preview..."}</p>
          </div>
        ) : (
          <div className="p-2">
            <h1 className="text-lg font-bold">No Old Description Found</h1>
            <p className="text-gray-500 text-sm">Start writing your blog description using the editor.</p>
          </div>
        )}
      </div>
    </div>
  );
}
