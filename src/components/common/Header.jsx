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
import { ChevronDown } from "lucide-react"

export default function SiteHeader() {
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
          <Link href="/" className="flex items-center gap-2">
            <Image src="https://www.woodenstreet.com/svg/new-logo.svg" alt="Wooden Street" width={140} height={40} className="h-10 w-auto" />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="light"
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<ChevronDown className="text-sm" />}
              >
                Catalogue
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Catalogue options">
              <DropdownItem>Living Room</DropdownItem>
              <DropdownItem>Bedroom</DropdownItem>
              <DropdownItem>Dining Room</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>

        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="light"
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<ChevronDown className="text-sm" />}
              >
                Stores
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Store locations">
              <DropdownItem>New York</DropdownItem>
              <DropdownItem>Los Angeles</DropdownItem>
              <DropdownItem>Chicago</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>

        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="light"
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<ChevronDown className="text-sm" />}
              >
                SEO Pages
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="SEO Pages">
              <DropdownItem>About Us</DropdownItem>
              <DropdownItem>Blog</DropdownItem>
              <DropdownItem>Contact</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>

        <NavbarItem>
          <Button variant="light" className="p-0 bg-transparent data-[hover=true]:bg-transparent">
            Banners
          </Button>
        </NavbarItem>

        <NavbarItem>
          <Button variant="light" className="p-0 bg-transparent data-[hover=true]:bg-transparent">
            Web Search
          </Button>
        </NavbarItem>

        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="light"
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<ChevronDown className="text-sm" />}
              >
                Setting
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Settings">
              <DropdownItem>Profile</DropdownItem>
              <DropdownItem>Preferences</DropdownItem>
              <DropdownItem>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-4">
        <NavbarItem>
          <Button isIconOnly variant="light" className="p-0 bg-transparent data-[hover=true]:bg-transparent">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="17" cy="17" r="16.75" fill="#EFF4FB" stroke="#D6D6D6" stroke-width="0.5" />
              <path d="M23.75 23.7501L19.25 19.2501M20.75 15.5001C20.75 16.1896 20.6142 16.8722 20.3504 17.5092C20.0865 18.1462 19.6998 18.7249 19.2123 19.2124C18.7248 19.6999 18.146 20.0867 17.5091 20.3505C16.8721 20.6143 16.1894 20.7501 15.5 20.7501C14.8106 20.7501 14.1279 20.6143 13.4909 20.3505C12.854 20.0867 12.2752 19.6999 11.7877 19.2124C11.3002 18.7249 10.9135 18.1462 10.6496 17.5092C10.3858 16.8722 10.25 16.1896 10.25 15.5001C10.25 14.1077 10.8031 12.7724 11.7877 11.7878C12.7723 10.8032 14.1076 10.2501 15.5 10.2501C16.8924 10.2501 18.2277 10.8032 19.2123 11.7878C20.1969 12.7724 20.75 14.1077 20.75 15.5001Z" stroke="#64748B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>



          </Button>
        </NavbarItem>
        <NavbarItem className="relative">
          <Button isIconOnly variant="light" className="p-0 bg-transparent data-[hover=true]:bg-transparent">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="17" cy="17" r="16.75" fill="#EFF4FB" stroke="#D6D6D6" stroke-width="0.5" />
              <path d="M20 22H25L23.595 20.595C23.4063 20.4063 23.2567 20.1822 23.1546 19.9357C23.0525 19.6891 23 19.4249 23 19.158V16C23.0002 14.7589 22.6156 13.5483 21.8992 12.5349C21.1829 11.5214 20.17 10.755 19 10.341V10C19 9.46957 18.7893 8.96086 18.4142 8.58579C18.0391 8.21071 17.5304 8 17 8C16.4696 8 15.9609 8.21071 15.5858 8.58579C15.2107 8.96086 15 9.46957 15 10V10.341C12.67 11.165 11 13.388 11 16V19.159C11 19.697 10.786 20.214 10.405 20.595L9 22H14M20 22H14M20 22V23C20 23.7956 19.6839 24.5587 19.1213 25.1213C18.5587 25.6839 17.7956 26 17 26C16.2044 26 15.4413 25.6839 14.8787 25.1213C14.3161 24.5587 14 23.7956 14 23V22" stroke="#64748B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      {/* add conditon here */}
              <circle cx="28" cy="5" r="4" fill="#DC3545" stroke="white" stroke-width="2" />
            </svg>

          </Button>
        </NavbarItem>
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar src="/placeholder.svg" size="sm" className="w-8 h-8" />
                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-sm font-medium">SEO Team</span>
                  <span className="text-xs text-gray-500">Rajesh Shar.</span>
                </div>
                <ChevronDown className="h-4 w-4" />
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

      <NavbarMenu>
        <NavbarMenuItem>
          <Link href="#" className="w-full">
            Catalogue
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="#" className="w-full">
            Stores
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="#" className="w-full">
            SEO Pages
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="#" className="w-full">
            Banners
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="#" className="w-full">
            Web Search
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="#" className="w-full">
            Setting
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}

