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
import { PlusIcon, Pencil, Trash2, MoreVertical, GripVertical } from "lucide-react"
import { faqSchema } from "../allSchema/blogEditSchema"
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core"
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

export default function FAQManagement({ data }) {
    const initialFaqs = data?.faq ? JSON.parse(data.faq) : []

    const [faqs, setFaqs] = useState(initialFaqs);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentFaq, setCurrentFaq] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )
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
    const handleDragEnd = (event) => {
        const { active, over } = event

        if (over && active.id !== over.id) {
            setFaqs((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id)
                const newIndex = items.findIndex((item) => item.id === over.id)

                // Update the order property for each item
                const reordered = arrayMove(items, oldIndex, newIndex)
                return reordered.map((item, index) => ({
                    ...item,
                    order: index,
                }))
            })
        }
    }

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
                                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                    <SortableContext items={faqs.map((faq) => faq.id)} strategy={verticalListSortingStrategy}>
                                        {faqs.map((faq) => (
                                            <SortableFAQItem key={faq.id} faq={faq} onEdit={handleEdit} onDelete={handleDelete} />
                                        ))}
                                    </SortableContext>
                                </DndContext>

                            </div>
                        )}
                    </CardBody>
                </Card>
            </div>

            <FAQModal
                isOpen={isOpen}
                onClose={onClose}
                currentFaq={currentFaq}
                isEditing={isEditing}
                errors={errors}
                onChange={handleChange}
                onSave={handleSave}
            />
        </div>
    );
}


const FAQModal = ({ isOpen, onClose, currentFaq, isEditing, errors, onChange, onSave }) => {
    return (
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
                        onChange={(e) => onChange("question", e.target.value)}
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
                        onChange={(e) => onChange("answer", e.target.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button variant="flat" color="danger" onPress={onClose}>
                        Cancel
                    </Button>
                    <Button color="primary" onPress={onSave}>
                        {isEditing ? "Update" : "Save"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

const SortableFAQItem = ({ faq, onEdit, onDelete }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: faq.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1 : 0,
    }
    return (
        <div ref={setNodeRef} style={style} className="relative">
            <Card className="shadow-sm transition-transform hover:shadow-md">
                <CardBody className="p-4">
                    <div className="flex justify-between items-start">
                        <div
                            className="cursor-grab active:cursor-grabbing p-2 mr-2 text-gray-400 hover:text-gray-600 self-center"
                            {...attributes}
                            {...listeners}
                        >
                            <GripVertical size={20} />
                        </div>
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
                                <DropdownItem
                                    startContent={<Pencil size={16} />}
                                    onPress={() => onEdit(faq)}
                                >
                                    Edit
                                </DropdownItem>
                                <DropdownItem
                                    startContent={<Trash2 size={16} />}
                                    className="text-danger"
                                    color="danger"
                                    onPress={() => onDelete(faq.id)}
                                >
                                    Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}