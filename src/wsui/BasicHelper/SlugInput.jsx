'use client'
import React, { useState, useEffect } from "react";
import { Input } from "@heroui/react";
import { Edit, Edit3 } from "lucide-react";
import { generateSlug } from "@/lib/helper";

export default function SlugInput({ title, initialSlug, onSlugChange }) {
    const [slug, setSlug] = useState(initialSlug || "")
    const [isManuallyEdited, setIsManuallyEdited] = useState(false);
    useEffect(() => {
        if (!isManuallyEdited) {
            const newSlug = generateSlug(title)
            setSlug(newSlug)
            onSlugChange(newSlug)
        }
    }, [title, isManuallyEdited, onSlugChange])

    const handleSlugChange = (e) => {
        const newSlug = generateSlug(e.target.value)
        setSlug(newSlug)
        setIsManuallyEdited(true)
        onSlugChange(newSlug)
    }

    return (
        <div className="flex gap-4">
            <Input
                label="Slug"
                value={slug}
                name="slug"
                onChange={handleSlugChange}
                placeholder="Enter slug"
                description="URL-friendly version of the title"
            />
            {isManuallyEdited && (
                <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => {
                        setIsManuallyEdited(false)
                        const newSlug = generateSlug(title)
                        setSlug(newSlug)
                        onSlugChange(newSlug)
                    }}
                >
                    Reset
                </button>
            )}
        </div>
    );
}
