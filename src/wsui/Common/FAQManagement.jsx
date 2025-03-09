"use client"

import { useState, useEffect } from "react"
import {
    Button,
    Input,
    Textarea,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react"
import { PlusIcon, Pencil, Trash2, MoreVertical } from "lucide-react"
import { faqSchema } from "../allSchema/blogEditSchema"
import FormRenderer from "../Blog/BlogTabs/FromRender"

export default function FAQManagement({ data }) {
    const [formData, setFormData] = useState(data);
    const [faqs, setFaqs] = useState(data.faq);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentFaq, setCurrentFaq] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (name, value) => {
        setCurrentFaq((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddNew = () => {
        const maxId = faqs.length > 0 ? Math.max(...faqs.map(faq => parseInt(faq.id, 10))) : 0;
        const newId = maxId + 1;

        setCurrentFaq({ id: newId.toString(), question: "", answer: "" });
        setIsEditing(false);
        onOpen();
    };

    const handleEdit = (faq) => {
        setCurrentFaq(faq);
        setIsEditing(true);
        onOpen();
    };

    const handleDelete = (id) => {
        setFaqs(faqs.filter((faq) => faq.id !== id));
    };

    const handleSave = () => {
        if (!currentFaq) return;

        try {
            faqSchema.parse(currentFaq);
            setErrors({});
        } catch (error) {
            if (error.errors) {
                const newErrors = {};
                error.errors.forEach((err) => {
                    newErrors[err.path[0]] = err.message;
                });
                setErrors(newErrors);
                return;
            }
        }

        if (isEditing) {
            setFaqs(faqs.map((faq) => (faq.id === currentFaq.id ? currentFaq : faq)));
        } else {
            setFaqs([...faqs, currentFaq]);
        }
        onClose();
    };


    return (
        <div className="w-full text-sm text-muted-foreground p-4 grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-100px)]">
            <div className="md:col-span-3">
                <Card className="shadow-sm">
                    <CardHeader className="flex justify-between items-center px-6 py-4 border-b">
                        <h2 className="text-xl font-medium">FAQ</h2>
                        <Button color="primary" startContent={<PlusIcon size={16} />} onPress={handleAddNew}>
                            Add New FAQ
                        </Button>
                    </CardHeader>
                    <CardBody className="p-6">
                        <input type="hidden" name="tabId" value={3} readOnly />
                        <input type="hidden" name="faq" value={JSON.stringify(faqs)} readOnly />
                        {faqs.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500 mb-4">No FAQs added yet</p>
                                <Button color="primary" variant="flat" startContent={<PlusIcon size={16} />} onPress={handleAddNew}>
                                    Add Your First FAQ
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {faqs.map((faq) => (
                                    <Card key={faq.id} className="shadow-sm transition-transform transform hover:scale-[1.02] hover:shadow-md">
                                        <CardBody className="p-4">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-lg mb-2">{faq.question}</h3>
                                                    <p className="text-gray-600">{faq.answer}</p>
                                                </div>
                                                <Dropdown>
                                                    <DropdownTrigger>
                                                        <Button isIconOnly variant="light" size="sm">
                                                            <MoreVertical size={16} />
                                                        </Button>
                                                    </DropdownTrigger>
                                                    <DropdownMenu aria-label="FAQ Actions">
                                                        <DropdownItem startContent={<Pencil size={16} />} onPress={() => handleEdit(faq)}>
                                                            Edit
                                                        </DropdownItem>
                                                        <DropdownItem
                                                            startContent={<Trash2 size={16} />}
                                                            className="text-danger"
                                                            color="danger"
                                                            onPress={() => handleDelete(faq.id)}
                                                        >
                                                            Delete
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </CardBody>
                </Card>
            </div>

            <Modal isOpen={isOpen} onClose={onClose} size="2xl">
                <ModalContent>
                    <ModalHeader>{isEditing ? "Edit FAQ" : "Add New FAQ"}</ModalHeader>
                    <ModalBody>
                        <Input
                            key="question"
                            className="w-full"
                            variant="bordered"
                            name="question"
                            value={currentFaq?.question || ""}
                            label="Question"
                            type="text"
                            isInvalid={!!errors.question}
                            errorMessage={errors.question}
                            onChange={(e) => handleChange("question", e.target.value)}
                        />
                        <Textarea
                            key="answer"
                            className="w-full"
                            variant="bordered"
                            name="answer"
                            value={currentFaq?.answer || ""}
                            label="Answer"
                            isInvalid={!!errors.answer}
                            errorMessage={errors.answer}
                            onChange={(e) => handleChange("answer", e.target.value)}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="flat" color="danger" onPress={onClose}>
                            Cancel
                        </Button>
                        <Button color="primary" onPress={handleSave}>
                            {isEditing ? "Update" : "Save"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}
