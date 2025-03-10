import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Button } from "@heroui/react";
import { Rotate3D } from "lucide-react";

// Load Editor.js dynamically (avoiding SSR issues)
const EditorJS = dynamic(() => import("@/wsui/Blog/BlogTabs/EditorDemo"), { ssr: false });

export default function Description({ data }) {
  const [oldDesc, setOldDesc] = useState(data?.description_old || "");
  const [desc, setDesc] = useState("");
  const editorRef = useRef(null);
  const handleConvert = () => {
    setDesc(oldDesc);
  };
  return (
    <div className="w-full text-sm text-muted-foreground p-4 grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-100px)]">
      <div className="md:col-span-3">
        <div className="flex items-center gap-2 p-2">
          <p className="mb-4 font-semibold">
            Description: Blog Details Description
          </p>
          <Button
            onPress={handleConvert}
            isIconOnly
            startContent={<Rotate3D />}
          />
        </div>
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[200px] md:min-w-[650px] rounded-lg border"
        >
          {/* Old Description Panel */}
          <ResizablePanel defaultSize={150}>
            <div className="border p-4 rounded-md h-full flex flex-col">
              <h4 className="font-semibold mb-2">Old Description</h4>
              <div
                dangerouslySetInnerHTML={{ __html: oldDesc }}
                className="text-sm text-gray-700 flex-1 overflow-y-auto"
              />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            <div className="border p-4 rounded-md h-full flex flex-col pl-2">
              <h4 className="font-semibold mb-2">New Description</h4>
              <br />
              <EditorJS ref={editorRef} data={desc} onChange={setDesc} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
