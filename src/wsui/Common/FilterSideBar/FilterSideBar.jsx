import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    useDisclosure,
    Image,
    Link,
    Tooltip,
    Avatar,
    AvatarGroup,
} from "@heroui/react";
import { Input } from "@nextui-org/input";
import { FilterIcon, LockIcon, MailIcon } from "lucide-react";

export default function FilterSideBar() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button
                color="primary"
                endContent={<FilterIcon />}
                variant="flat"
                onPress={onOpen}
            >
                Advance Filter
            </Button>
            <Drawer
                hideCloseButton
                backdrop="blur"
                classNames={{
                    base: "data-[placement=right]:sm:m-2 data-[placement=left]:sm:m-2  rounded-medium",
                }}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader className="absolute top-0 inset-x-0 z-50 flex flex-row gap-2 px-2 py-2 border-b border-default-200/50 justify-between bg-content1/50 backdrop-saturate-150 backdrop-blur-lg">
                                <Tooltip content="Close">
                                    <Button
                                        isIconOnly
                                        className="text-default-400"
                                        size="sm"
                                        variant="light"
                                        onPress={onClose}
                                    >
                                        <svg
                                            fill="none"
                                            height="20"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            width="20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
                                        </svg>
                                    </Button>
                                </Tooltip>
                                <div className="w-full flex justify-start gap-2">
                                    Apply Advanced Filters
                                </div>
                            </DrawerHeader>
                            <DrawerBody className="pt-16">
                                <Input
                                    endContent={
                                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    label="Email"
                                    placeholder="Enter your email"
                                    variant="bordered"
                                />
                                <Input
                                    endContent={
                                        <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    label="Password"
                                    placeholder="Enter your password"
                                    type="password"
                                    variant="bordered"
                                />
                            </DrawerBody>
                            <DrawerFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Apply Filter
                                </Button>
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    )
}
