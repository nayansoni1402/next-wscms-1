import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";

const Editor = ({ data, onChange }) => {
    const editorRef = useRef(null);

    useEffect(() => {
        if (!editorRef.current) {
            const editor = new EditorJS({
                holder: "editorjs",
                tools: {
                    header: Header,
                    list: List,
                    paragraph: Paragraph,
                },
                data: data || {}, // Load existing data
                onChange: async () => {
                    const savedData = await editor.save();
                    onChange(savedData);
                },
            });

            editorRef.current = editor;
        }

        return () => {
            if (editorRef.current && editorRef.current.destroy) {
                editorRef.current.destroy();
            }
        };
    }, []);

    return <div id="editorjs" className="p-4 border rounded-md bg-white" />;
};

export default Editor;
