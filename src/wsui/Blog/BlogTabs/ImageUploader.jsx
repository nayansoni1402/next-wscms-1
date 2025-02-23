"use client"

import { useState } from "react"
import { Button } from "@heroui/react"

export default function ImageUploader({ field, formData }) {
    const [image, setImage] = useState(formData[field.name] || null)

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => setImage(e.target.result)
            reader.readAsDataURL(file)
        }
    }

    return (
        <div key={field.name} className="space-y-2">
            <label className="text-sm font-medium">{field.label}</label>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id={field.name}
            />
            <label htmlFor={field.name} className="cursor-pointer">
                <Button variant="bordered">Upload Image</Button>
            </label>
            {image && <img src={image} alt="Uploaded" className="mt-2 w-32 h-32 object-cover rounded-lg" />}
        </div>
    )
}