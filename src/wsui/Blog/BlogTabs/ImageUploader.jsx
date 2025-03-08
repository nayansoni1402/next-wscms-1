"use client";

import { useState, useRef } from "react";
import { Button, Image } from "@heroui/react";

export default function ImageUploader({ field, formData, onImageUpload }) {
    const [image, setImage] = useState(formData[field.name] || null);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null); // Create a reference to file input

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
            const reader = new FileReader();
            reader.onload = (e) => setImage(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first.");
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            // Replace with your actual S3 upload URL
            const response = await fetch("https://your-s3-upload-endpoint.com/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (data.url) {
                setImage(data.url); // Set uploaded image URL
                onImageUpload(field.name, data.url); // Pass URL back to parent
                alert("Image uploaded successfully!");
            } else {
                alert("Upload failed.");
            }
        } catch (error) {
            console.error("Upload error:", error);
            addToast({
                title: "An error occurred while uploading",
                description: error.message,
                color: 'warning',
            })
        } finally {
            setUploading(false);
        }
    };

    return (
        <div key={field.name} className="space-y-2">
            <label className="text-sm font-medium">{field.label}</label>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />
            <Button
                variant="bordered"
                onPress={() => fileInputRef.current.click()} // Trigger file input
            >
                Choose File
            </Button>
            {file && (
                <Button onPress={handleUpload} disabled={uploading} className="ml-2">
                    {uploading ? "Uploading..." : "Upload to S3"}
                </Button>
            )}
            {image && <Image src={image} alt="Uploaded" className="mt-2 w-32 h-32 object-cover rounded-lg" width={300} />}

        </div>
    );
}

