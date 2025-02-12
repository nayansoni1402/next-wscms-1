"use client"

import {
      Navbar,
      NavbarBrand,
      NavbarContent,
      NavbarItem,
      NavbarMenu,
      NavbarMenuItem,
      NavbarMenuToggle,
      Dropdown,
      DropdownTrigger,
      DropdownMenu,
      DropdownItem,
      Avatar,
      Button,
} from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"
import WsSvg from "../Common/WsSvg"
import { usePathname } from "next/navigation"

const navConfig = {
      cms: {
            image: "https://www.woodenstreet.com/svg/new-logo.svg",
            herf: "/",
            menuItems: [
                  {
                        title: "Catalogue",
                        dropdown: ["Living Room", "Bedroom", "Dining Room"],
                        href: "#"
                  },
                  {
                        title: "Stores",
                        dropdown: ["New York", "Los Angeles", "Chicago"],
                        href: "#"
                  },
                  {
                        title: "SEO Pages",
                        dropdown: ["About Us", "Blog", "Contact"],
                        href: "#"
                  },
                  { title: "Banners", href: "#" },
                  { title: "Web Search", href: "#" },
                  {
                        title: "Setting",
                        dropdown: ["Profile", "Preferences", "Logout"],
                        href: "#"
                  }
            ]
      },
      blog: {
            image: "https://www.woodenstreet.com/svg/new-logo.svg",
            herf: "/",
            menuItems: [
                  { title: "Dashboard", href: "/blog/dashboard" },
                  { title: "Blog List", href: "/blog/blog-list" },
                  { title: "Category", href: "/blog/category" },
                  { title: "Comment", href: "/blog/comment" },
                  { title: "Logs", href: "/blog/logs" }
            ]
      }
}

export default function Header() {
      const pathname = usePathname()
      const isBlog = pathname.includes("/blog")
      const config = isBlog ? navConfig.blog : navConfig.cms
      return (
            <Navbar
                  maxWidth="full"
                  className="bg-white border-b"
                  classNames={{
                        wrapper: "px-4 sm:px-6",
                  }}
            >
                  <NavbarContent className="gap-4">
                        <NavbarMenuToggle className="sm:hidden" />
                        <NavbarBrand>
                              <Link href={config.herf} className="flex items-center gap-2">
                                    <Image src={config.image} alt="Wooden Street LOGO" priority width={140} height={40} style={{ width: 'auto', height: 'auto' }} className="h-10 w-auto" />
                              </Link>
                        </NavbarBrand>
                  </NavbarContent>

                  <NavbarContent className="hidden sm:flex gap-4" justify="center">
                        {config.menuItems.map((item, index) =>
                              item.dropdown ? (
                                    <NavbarItem key={index}>
                                          <Dropdown>
                                                <DropdownTrigger>
                                                      <Button
                                                            variant="light"
                                                            className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                                                            endContent={<WsSvg type="dropdownArrow" hoverColor="#FF0000" size={20} />}
                                                      >
                                                            {item.title}
                                                      </Button>
                                                </DropdownTrigger>
                                                <DropdownMenu aria-label={`${item.title} options`}>
                                                      {item.dropdown.map((option, i) => (
                                                            <DropdownItem key={i}>{option}</DropdownItem>
                                                      ))}
                                                </DropdownMenu>
                                          </Dropdown>
                                    </NavbarItem>
                              ) : (
                                    <NavbarItem key={index}>
                                          <Link href={item.href} className="p-0 mr-1">
                                                {item.title}
                                          </Link>
                                    </NavbarItem>
                              )
                        )}
                  </NavbarContent>

                  <NavbarContent justify="end" className="gap-4">
                        <NavbarItem>
                              <Button isIconOnly variant="light" className="p-0 bg-transparent data-[hover=true]:bg-transparent">
                                    <WsSvg type="searchIcon" size={34} />
                              </Button>
                        </NavbarItem>
                        <NavbarItem className="relative">
                              <Button isIconOnly variant="light" className="p-0 bg-transparent data-[hover=true]:bg-transparent">
                                    <WsSvg type="bellIcon" size={34} active={true} />
                              </Button>
                        </NavbarItem>
                        <NavbarItem>
                              <Dropdown placement="bottom-end">
                                    <DropdownTrigger>
                                          <div className="flex items-center gap-2 cursor-pointer">
                                                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" size="sm" className="w-8 h-8" />
                                                <div className="hidden sm:flex flex-col items-start">
                                                      <span className="text-sm font-medium">SEO Team</span>
                                                      <span className="text-xs text-gray-500">Rajesh Shar.</span>
                                                </div>
                                                <WsSvg type="dropdownArrow" hoverColor="#FF0000" size={20} />
                                          </div>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="User menu">
                                          <DropdownItem>Profile</DropdownItem>
                                          <DropdownItem>Settings</DropdownItem>
                                          <DropdownItem className="text-danger" color="danger">
                                                Logout
                                          </DropdownItem>
                                    </DropdownMenu>
                              </Dropdown>
                        </NavbarItem>
                  </NavbarContent>
            </Navbar>
      )
}
