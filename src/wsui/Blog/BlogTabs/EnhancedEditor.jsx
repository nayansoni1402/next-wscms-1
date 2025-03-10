// "use client"

// import { useEffect, useRef, useState } from "react"
// import { Card, CardBody, Spinner } from "@nextui-org/react"
// import EditorJS from "@editorjs/editorjs"

// // Import EditorJS plugins
// import Header from "@editorjs/header"
// import List from "@editorjs/list"
// import Paragraph from "@editorjs/paragraph"
// import Embed from "@editorjs/embed"
// import Table from "@editorjs/table"
// import Warning from "@editorjs/warning"
// import Code from "@editorjs/code"
// import LinkTool from "@editorjs/link"
// import Image from "@editorjs/image"
// import Raw from "@editorjs/raw"
// import Quote from "@editorjs/quote"
// import Marker from "@editorjs/marker"
// import CheckList from "@editorjs/checklist"
// import Delimiter from "@editorjs/delimiter"
// import InlineCode from "@editorjs/inline-code"
// import SimpleImage from "@editorjs/simple-image"
// import Alert from "editorjs-alert"
// import Underline from "@editorjs/underline"
// import NestedList from "@editorjs/nested-list"
// import Tooltip from "editorjs-tooltip"
// import ColorPlugin from "editorjs-text-color-plugin"
// import AttachesTool from "@editorjs/attaches"
// import Undo from "editorjs-undo"
// import DragDrop from "editorjs-drag-drop"
// import { ToggleBlock } from "editorjs-toggle-block"


// const EnhancedEditor = ({
//     data,
//     onChange,
//     placeholder = "Start writing your content...",
//     readOnly = false,
//     minHeight = 300,
//     uploadImageEndpoint = "/api/upload-image",
//     uploadFileEndpoint = "/api/upload-file",
//     logLevel = "ERROR",
// }) => {
//     const editorRef = useRef(null)
//     const [isLoading, setIsLoading] = useState(true)
//     const [error, setError] = useState(null)

//     // Function to handle image uploads
//     const handleImageUpload = async (file) => {
//         try {
//             const formData = new FormData()
//             formData.append("image", file)

//             const response = await fetch(uploadImageEndpoint, {
//                 method: "POST",
//                 body: formData,
//             })

//             if (!response.ok) {
//                 throw new Error("Failed to upload image")
//             }

//             const result = await response.json()
//             return {
//                 success: 1,
//                 file: {
//                     url: result.url,
//                 },
//             }
//         } catch (error) {
//             console.error("Image upload error:", error)
//             return {
//                 success: 0,
//                 message: "Image upload failed",
//             }
//         }
//     }

//     // Function to handle file uploads
//     const handleFileUpload = async (file) => {
//         try {
//             const formData = new FormData()
//             formData.append("file", file)

//             const response = await fetch(uploadFileEndpoint, {
//                 method: "POST",
//                 body: formData,
//             })

//             if (!response.ok) {
//                 throw new Error("Failed to upload file")
//             }

//             const result = await response.json()
//             return {
//                 success: 1,
//                 file: {
//                     url: result.url,
//                     name: file.name,
//                     size: file.size,
//                 },
//             }
//         } catch (error) {
//             console.error("File upload error:", error)
//             return {
//                 success: 0,
//                 message: "File upload failed",
//             }
//         }
//     }

//     useEffect(() => {
//         // Dynamic import of EditorJS to avoid SSR issues
//         const initEditor = async () => {
//             try {
//                 setIsLoading(true)

//                 if (!editorRef.current) {
//                     // Import EditorJS dynamically
//                     const EditorJSPackage = (await import("@editorjs/editorjs")).default

//                     const editor = new EditorJSPackage({
//                         holder: "editorjs",
//                         tools: {
//                             header: {
//                                 class: Header,
//                                 inlineToolbar: true,
//                                 config: {
//                                     levels: [1, 2, 3, 4, 5, 6],
//                                     defaultLevel: 2,
//                                 },
//                             },
//                             paragraph: {
//                                 class: Paragraph,
//                                 inlineToolbar: true,
//                             },
//                             list: {
//                                 class: List,
//                                 inlineToolbar: true,
//                                 config: {
//                                     defaultStyle: "unordered",
//                                 },
//                             },
//                             nestedList: {
//                                 class: NestedList,
//                                 inlineToolbar: true,
//                             },
//                             checklist: {
//                                 class: CheckList,
//                                 inlineToolbar: true,
//                             },
//                             embed: {
//                                 class: Embed,
//                                 config: {
//                                     services: {
//                                         youtube: true,
//                                         vimeo: true,
//                                         codepen: true,
//                                         twitter: true,
//                                         instagram: true,
//                                     },
//                                 },
//                             },
//                             table: {
//                                 class: Table,
//                                 inlineToolbar: true,
//                                 config: {
//                                     rows: 2,
//                                     cols: 3,
//                                 },
//                             },
//                             warning: {
//                                 class: Warning,
//                                 inlineToolbar: true,
//                             },
//                             code: {
//                                 class: Code,
//                                 config: {
//                                     placeholder: "Enter code here...",
//                                 },
//                             },
//                             linkTool: {
//                                 class: LinkTool,
//                                 config: {
//                                     endpoint: "/api/fetch-link-metadata",
//                                 },
//                             },
//                             image: {
//                                 class: Image,
//                                 config: {
//                                     uploader: {
//                                         uploadByFile: handleImageUpload,
//                                     },
//                                     captionPlaceholder: "Caption (optional)",
//                                 },
//                             },
//                             simpleImage: {
//                                 class: SimpleImage,
//                             },
//                             raw: Raw,
//                             quote: {
//                                 class: Quote,
//                                 inlineToolbar: true,
//                                 config: {
//                                     quotePlaceholder: "Enter a quote",
//                                     captionPlaceholder: "Quote's author",
//                                 },
//                             },
//                             marker: {
//                                 class: Marker,
//                                 shortcut: "CMD+SHIFT+M",
//                             },
//                             delimiter: Delimiter,
//                             inlineCode: {
//                                 class: InlineCode,
//                                 shortcut: "CMD+SHIFT+C",
//                             },
//                             alert: {
//                                 class: Alert,
//                                 inlineToolbar: true,
//                                 config: {
//                                     defaultType: "primary",
//                                     types: {
//                                         primary: "Primary",
//                                         secondary: "Secondary",
//                                         info: "Info",
//                                         success: "Success",
//                                         warning: "Warning",
//                                         danger: "Danger",
//                                     },
//                                 },
//                             },
//                             underline: Underline,
//                             tooltip: {
//                                 class: Tooltip,
//                                 config: {
//                                     placeholder: "Tooltip content here...",
//                                 },
//                             },
//                             Color: {
//                                 class: ColorPlugin,
//                                 config: {
//                                     colorCollections: [
//                                         "#EC7878",
//                                         "#9C27B0",
//                                         "#673AB7",
//                                         "#3F51B5",
//                                         "#0070FF",
//                                         "#03A9F4",
//                                         "#00BCD4",
//                                         "#4CAF50",
//                                         "#8BC34A",
//                                         "#CDDC39",
//                                         "#FFF",
//                                     ],
//                                     defaultColor: "#000",
//                                     type: "text",
//                                     customPicker: true,
//                                 },
//                             },
//                             Marker: {
//                                 class: ColorPlugin,
//                                 config: {
//                                     defaultColor: "#FFBF00",
//                                     type: "marker",
//                                     icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> </g></svg>`,
//                                 },
//                             },
//                             attaches: {
//                                 class: AttachesTool,
//                                 config: {
//                                     uploader: {
//                                         uploadByFile: handleFileUpload,
//                                     },
//                                 },
//                             },
//                             toggleBlock: {
//                                 class: ToggleBlock,
//                                 inlineToolbar: true,
//                             },
//                         },
//                         data: data || {},
//                         placeholder: placeholder,
//                         readOnly: readOnly,
//                         minHeight: minHeight,
//                         logLevel: logLevel,
//                         onChange: async () => {
//                             try {
//                                 const savedData = await editor.save()
//                                 onChange(savedData)
//                             } catch (err) {
//                                 console.error("Editor save error:", err)
//                             }
//                         },
//                         onReady: () => {
//                             setIsLoading(false)

//                             // Initialize plugins that need editor instance
//                             new Undo({ editor })
//                             new DragDrop(editor)
//                         },
//                         i18n: {
//                             messages: {
//                                 ui: {
//                                     blockTunes: {
//                                         toggler: {
//                                             "Click to tune": "Click to tune",
//                                             "or drag to move": "or drag to move",
//                                         },
//                                     },
//                                     inlineToolbar: {
//                                         converter: {
//                                             "Convert to": "Convert to",
//                                         },
//                                     },
//                                     toolbar: {
//                                         toolbox: {
//                                             Add: "Add",
//                                         },
//                                     },
//                                 },
//                                 toolNames: {
//                                     Text: "Text",
//                                     Heading: "Heading",
//                                     List: "List",
//                                     NestedList: "Nested List",
//                                     Checklist: "Checklist",
//                                     Quote: "Quote",
//                                     Warning: "Warning",
//                                     Code: "Code",
//                                     Delimiter: "Delimiter",
//                                     "Raw HTML": "Raw HTML",
//                                     Table: "Table",
//                                     Link: "Link",
//                                     Marker: "Marker",
//                                     Bold: "Bold",
//                                     Italic: "Italic",
//                                     InlineCode: "Inline Code",
//                                     Underline: "Underline",
//                                     Image: "Image",
//                                     Embed: "Embed",
//                                     Alert: "Alert",
//                                     Tooltip: "Tooltip",
//                                     Color: "Text Color",
//                                     Marker: "Highlight",
//                                     Attaches: "File",
//                                     ToggleBlock: "Toggle Content",
//                                 },
//                                 tools: {
//                                     warning: {
//                                         Title: "Title",
//                                         Message: "Message",
//                                     },
//                                     link: {
//                                         "Add a link": "Add a link",
//                                     },
//                                     image: {
//                                         "Select an Image": "Select an Image",
//                                         "or drag": "or drag",
//                                         "Drag an image": "Drag an image",
//                                     },
//                                 },
//                             },
//                         },
//                     })

//                     editorRef.current = editor
//                 }
//             } catch (err) {
//                 console.error("Editor initialization error:", err)
//                 setError(err.message || "Failed to initialize editor")
//                 setIsLoading(false)
//             }
//         }

//         initEditor()

//         return () => {
//             if (editorRef.current && editorRef.current.destroy) {
//                 editorRef.current.destroy()
//                 editorRef.current = null
//             }
//         }
//     }, [])

//     return (
//         <Card className="w-full">
//             <CardBody>
//                 {error && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}

//                 {isLoading ? (
//                     <div className="flex justify-center items-center py-10">
//                         <Spinner size="lg" color="primary" />
//                         <span className="ml-2">Loading editor...</span>
//                     </div>
//                 ) : (
//                     <div id="editorjs" />
//                 )}
//             </CardBody>
//         </Card>
//     )
// }

// export default EnhancedEditor


import { useEffect, useRef, useState } from "react";
import { Card, CardBody, Spinner } from "@nextui-org/react";
import dynamic from "next/dynamic";

const EnhancedEditor = ({
    data,
    onChange,
    placeholder = "Start writing your content...",
    readOnly = false,
    minHeight = 300,
    logLevel = "ERROR",
}) => {
    const editorRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsMounted(true); // Ensure the component is mounted before initializing EditorJS
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const initEditor = async () => {
            if (editorRef.current) return; // Prevent multiple initializations

            try {
                setIsLoading(true);
                const EditorJSPackage = (await import("@editorjs/editorjs")).default;
                const Header = (await import("@editorjs/header")).default;

                editorRef.current = new EditorJSPackage({
                    holder: "editorjs",
                    tools: {
                        header: { class: Header, inlineToolbar: true },
                    },
                    data: data || {},
                    placeholder: placeholder,
                    readOnly: readOnly,
                    minHeight: minHeight,
                    logLevel: logLevel,
                    async onChange() {
                        try {
                            const savedData = await editorRef.current.save();
                            onChange(savedData);
                        } catch (err) {
                            console.error("Editor save error:", err);
                        }
                    },
                    onReady: () => {
                        setIsLoading(false);
                    },
                });
            } catch (err) {
                console.error("Editor.js initialization error:", err);
            }
        };

        initEditor();

        return () => {
            if (editorRef.current) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, [isMounted]);

    return (
        <Card>
            <CardBody>
                {isLoading && <Spinner />}
                {isMounted && <div id="editorjs" />}
            </CardBody>
        </Card>
    );
};

export default EnhancedEditor;
