"use client"

import { useState, useEffect } from "react"
import { Input, Select, SelectItem, Button, Image } from "@heroui/react"
import { z } from "zod"
import ImageUploader from "./ImageUploader"
import { DatePicker } from "@nextui-org/date-picker"
import { parseAbsoluteToLocal } from "@internationalized/date";


export default function FormRenderer({ config, initialData, onDataChange, zodSchema }) {
    const [formData, setFormData] = useState(initialData || {})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (JSON.stringify(formData) !== JSON.stringify(initialData)) {
            onDataChange(formData);
        }
    }, [formData, onDataChange, initialData]);

    const handleValidation = (name, value) => {
        try {
            zodSchema.shape[name]?.parse(value);
            setErrors((prev) => ({ ...prev, [name]: "" }));
        } catch (error) {
            if (error instanceof z.ZodError) {
                setErrors((prev) => ({ ...prev, [name]: error.errors[0]?.message || "Invalid input" }));
            }
        }
    }

    const handleChange = (name, value) => {
        console.log(name, value);
        setFormData((prev) => ({ ...prev, [name]: value }));
        handleValidation(name, value);
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
                        selectedKeys={formData[field.name] ? [formData[field.name]] : []}
                        onSelectionChange={(keys) => {
                            const selectedValue = Array.from(keys)[0] || "";
                            handleChange(field.name, selectedValue);
                        }}
                    >
                        {Object.keys(field.options || {}).map((key) => (
                            <SelectItem key={key} value={key}>
                                {field.options[key]}
                            </SelectItem>
                        ))}
                    </Select>

                );
            case "date":
                return (<div className="w-full max-w-xl flex flex-row gap-4">
                    <DatePicker
                        hideTimeZone
                        showMonthAndYearPickers
                        defaultValue={
                            formData[field.name]
                                ?
                                parseAbsoluteToLocal(formData[field.name])
                                : undefined
                        }
                        value={
                            formData[field.name]
                                ?
                                parseAbsoluteToLocal(formData[field.name])
                                : undefined
                        }
                        label={field.label}
                        name={field.name}
                        variant="bordered"
                        isInvalid={!!errors[field.name]}
                        errorMessage={errors[field.name]}
                    />
                </div>);
            case "file":
                return <ImageUploader key={field.name} field={field} formData={formData} />;
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
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        description={field.description}
                    />
                );
        }
    }

    return config.map(renderField);
}

