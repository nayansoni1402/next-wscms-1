"use client"

import { useState, useEffect } from "react"
import { Input, Select, SelectItem, Button, Image } from "@heroui/react"
import { z } from "zod"
import ImageUploader from "./ImageUploader"

export default function FormRenderer({ config, initialData, onDataChange }) {
    const [formData, setFormData] = useState(initialData)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (JSON.stringify(formData) !== JSON.stringify(initialData)) {
            onDataChange(formData);
        }
    }, [formData, onDataChange, initialData]);

    const generateZodSchema = () => {
        const schemaFields = config.fields.reduce((acc, field) => {
            if (field.validation) {
                if (field.type === "number") {
                    acc[field.name] = z.number().min(field.validation.min).max(field.validation.max);
                } else if (field.type === "date") {
                    acc[field.name] = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)");
                } else {
                    acc[field.name] = z.string().min(field.validation.min, field.validation.message).max(field.validation.max, field.validation.message);
                }
            }
            return acc;
        }, {});

        return z.object(schemaFields)
    }

    const schema = generateZodSchema()

    const handleValidation = (name, value) => {
        try {
            schema.shape[name]?.parse(value)
            setErrors((prev) => ({ ...prev, [name]: "" }))
        } catch (error) {
            if (error instanceof z.ZodError) {
                setErrors((prev) => ({ ...prev, [name]: error.errors[0].message }))
            }
        }
    }

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
        handleValidation(name, value)
    }

    const renderField = (field) => {
        switch (field.type) {
            case "select":
                return (
                    <Select
                        key={field.name}
                        className="w-full"
                        name={field.name}
                        label={field.label}
                        selectedKeys={[formData[field.name]]}
                        onSelectionChange={(keys) => handleChange(field.name, Array.from(keys)[0])}
                    >
                        {Object.entries(field.options || {}).map(([key, value]) => (
                            <SelectItem key={key} value={key}>
                                {value}
                            </SelectItem>
                        ))}
                    </Select>
                )
            case "file":
                return (
                    <ImageUploader key={field.name} field={field} formData={formData} />
                )
            default:
                return (
                    <Input
                        key={field.name}
                        className="w-full"
                        variant="bordered"
                        name={field.name}
                        value={formData[field.name] || ""}
                        label={field.label}
                        type={field.type}
                        isInvalid={!!errors[field.name]}
                        errorMessage={errors[field.name]}
                        onKeyUp={(e) => handleChange(field.name, e.target.value)}
                        description={field.description}
                    />
                )
        }
    }

    return config.fields.map(renderField);
}

