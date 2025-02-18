'use client';
import { Button, Image } from "@heroui/react";

export default function ImageUploader({ field, formData }) {

    return (
        <div key={field.name} className="w-full">
            <label className="text-sm">{field.label}</label>
            <div className="flex gap-2 items-center">
                <Button onPress={() => console.log("Open modal")}>Choose Image</Button>
                <span className="text-xs text-gray-500">{formData[field.name] || "No image selected"}</span>
            </div>
            <Image
                alt="HeroUI hero Image with delay"
                height={200}
                src={`${formData[field.name]}`}
                width={300}
            />
        </div>
    );
}
