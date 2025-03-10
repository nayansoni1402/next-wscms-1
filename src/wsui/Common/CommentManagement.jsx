"use client"

import { useState } from "react"
import {
    Button,
    Textarea,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Chip,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Pagination,
    Select,
    SelectItem,
} from "@nextui-org/react"
import { MoreVertical, MessageSquare, CheckCircle, XCircle, Trash2, Filter } from "lucide-react"
import { fetchData } from "@/lib/apiCall";


export default function CommentManagement({ data }) {

    // Mock data for demonstration
    const [comments, setComments] = useState(data.comments);

    // State for filtering and pagination
    const [statusFilter, setStatusFilter] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    // State for reply modal
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [currentComment, setCurrentComment] = useState(null)
    const [replyText, setReplyText] = useState("")

    // Filter comments based on status
    const filteredComments = comments.filter((comment) => statusFilter === "all" || comment.status === statusFilter)

    // Paginate comments
    const paginatedComments = filteredComments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    // Handle opening reply modal
    const handleReply = (comment) => {
        setCurrentComment(comment)
        setReplyText(comment.reply || "")
        onOpen()
    }

    // Handle saving reply
    const handleSaveReply = async () => {
        if (!currentComment) return
        await fetchData(`/comment/${currentComment.id}/update`, 'PATCH', { reply: replyText }, false);
        setComments(
            comments.map((comment) =>
                comment.id === currentComment.id
                    ? { ...comment, reply: replyText, updated_at: new Date().toISOString() }
                    : comment,
            ),
        )

        onClose()
    }

    // Handle updating comment status
    const handleUpdateStatus = async (id, status) => {
        await fetchData(`/comment/${id}/update`, 'PATCH', { status }, false);
        setComments(
            comments.map((comment) =>
                comment.id === id ? { ...comment, status, updated_at: new Date().toISOString() } : comment,
            ),
        )
    }

    // Handle deleting comment
    const handleDelete = (id) => {
        return 0;
        setComments(comments.filter((comment) => comment.id !== id))
    }

    // Get status chip color and text
    const getStatusChip = (status) => {
        switch (status) {
            case 0:
                return (
                    <Chip color="warning" variant="flat">
                        Pending
                    </Chip>
                )
            case 1:
                return (
                    <Chip color="success" variant="flat">
                        Approved
                    </Chip>
                )
            case 2:
                return (
                    <Chip color="danger" variant="flat">
                        Rejected
                    </Chip>
                )
            default:
                return <Chip>Unknown</Chip>
        }
    }

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return (
        <div className="p-4">


            <Card className="shadow-sm">
                <CardHeader className="flex justify-between items-center px-6 py-4 border-b">
                    <h2 className="text-xl font-medium">Comments</h2>
                    <div className="flex gap-2">
                        <Select
                            placeholder="Filter by status"
                            startContent={<Filter size={16} />}
                            size="sm"
                            className="w-40"
                            onChange={(e) => {
                                const value = e.target.value
                                setStatusFilter(value === "all" ? "all" : parseInt(value))
                                setCurrentPage(1)
                            }}
                            defaultSelectedKeys={["all"]}
                        >
                            <SelectItem key="all" value="all">
                                All Comments
                            </SelectItem>
                            <SelectItem key="0" value="0">
                                Pending
                            </SelectItem>
                            <SelectItem key="1" value="1">
                                Approved
                            </SelectItem>
                            <SelectItem key="2" value="2">
                                Rejected
                            </SelectItem>
                        </Select>
                    </div>
                </CardHeader>
                <CardBody className="p-0">
                    {paginatedComments.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 mb-4">No comments found</p>
                        </div>
                    ) : (
                        <div className="divide-y">
                            {paginatedComments.map((comment) => (
                                <div key={comment.id} className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="font-medium">{comment.name}</h3>
                                                {getStatusChip(comment.status)}
                                                <span className="text-xs text-gray-500">{formatDate(comment.created_at)}</span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-1">
                                                <span className="font-medium">Email:</span> {comment.email}
                                            </p>
                                            {comment.phone && (
                                                <p className="text-sm text-gray-600 mb-1">
                                                    <span className="font-medium">Phone:</span> {comment.phone}
                                                </p>
                                            )}

                                            <div className="mt-3 p-3 bg-gray-50 rounded-md">
                                                <p className="text-gray-800">{comment.comment}</p>
                                            </div>

                                            {comment.reply && (
                                                <div className="mt-3 ml-6 p-3 bg-blue-50 rounded-md border-l-4 border-blue-400">
                                                    <p className="text-xs text-gray-500 mb-1">Admin Reply:</p>
                                                    <p className="text-gray-800">{comment.reply}</p>
                                                </div>
                                            )}
                                        </div>
                                        <Dropdown>
                                            <DropdownTrigger>
                                                <Button isIconOnly variant="light" size="sm">
                                                    <MoreVertical size={16} />
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu aria-label="Comment Actions">
                                                <DropdownItem startContent={<MessageSquare size={16} />} onPress={() => handleReply(comment)}>
                                                    {comment.reply ? "Edit Reply" : "Reply"}
                                                </DropdownItem>
                                                {comment.status !== 1 && (
                                                    <DropdownItem
                                                        startContent={<CheckCircle size={16} />}
                                                        onPress={() => handleUpdateStatus(comment.id, 1)}
                                                    >
                                                        Approve
                                                    </DropdownItem>
                                                )}
                                                {comment.status !== 2 && (
                                                    <DropdownItem
                                                        startContent={<XCircle size={16} />}
                                                        onPress={() => handleUpdateStatus(comment.id, 2)}
                                                    >
                                                        Reject
                                                    </DropdownItem>
                                                )}
                                                {comment.status !== 0 && (
                                                    <DropdownItem
                                                        startContent={<MessageSquare size={16} />}
                                                        onPress={() => handleUpdateStatus(comment.id, 0)}
                                                    >
                                                        Mark as Pending
                                                    </DropdownItem>
                                                )}
                                                <DropdownItem
                                                    startContent={<Trash2 size={16} />}
                                                    className="text-danger"
                                                    color="danger"
                                                    onPress={() => handleDelete(comment.id)}
                                                >
                                                    Delete
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardBody>
                <CardFooter className="px-6 py-4 border-t flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                        Showing {paginatedComments.length} of {filteredComments.length} comments
                    </div>
                    <Pagination
                        total={Math.ceil(filteredComments.length / itemsPerPage)}
                        page={currentPage}
                        onChange={setCurrentPage}
                    />
                </CardFooter>
            </Card>

            <Modal isOpen={isOpen} onClose={onClose} size="2xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Reply to Comment</ModalHeader>
                            <ModalBody>
                                {currentComment && (
                                    <div className="space-y-4">
                                        <div className="p-3 bg-gray-50 rounded-md">
                                            <p className="text-xs text-gray-500 mb-1">
                                                From: {currentComment.name} ({currentComment.email})
                                            </p>
                                            <p className="text-gray-800">{currentComment.comment}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Your Reply</label>
                                            <Textarea
                                                placeholder="Enter your reply to this comment"
                                                minRows={4}
                                                value={replyText}
                                                onChange={(e) => setReplyText(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="flat" color="danger" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={handleSaveReply}>
                                    Save Reply
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

