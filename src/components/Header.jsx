"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React from "react";
import ActiveUser from "./common/ActiveUser";

export const ChevronDown = ({ fill, size, height, width, ...props }) => {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const Lock = ({ fill, size, height, width, ...props }) => {
  const color = fill;

  return (
    <svg
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g transform="translate(3.5 2)">
        <path
          d="M9.121,6.653V4.5A4.561,4.561,0,0,0,0,4.484V6.653"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth={1.5}
          transform="translate(3.85 0.75)"
        />
        <path
          d="M.5,0V2.221"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth={1.5}
          transform="translate(7.91 12.156)"
        />
        <path
          d="M7.66,0C1.915,0,0,1.568,0,6.271s1.915,6.272,7.66,6.272,7.661-1.568,7.661-6.272S13.4,0,7.66,0Z"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth={1.5}
          transform="translate(0.75 6.824)"
        />
      </g>
    </svg>
  );
};

export const Activity = ({ fill, size, height, width, ...props }) => {
  return (
    <svg
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      >
        <path d="M6.918 14.854l2.993-3.889 3.414 2.68 2.929-3.78" />
        <path d="M19.668 2.35a1.922 1.922 0 11-1.922 1.922 1.921 1.921 0 011.922-1.922z" />
        <path d="M20.756 9.269a20.809 20.809 0 01.194 3.034c0 6.938-2.312 9.25-9.25 9.25s-9.25-2.312-9.25-9.25 2.313-9.25 9.25-9.25a20.931 20.931 0 012.983.187" />
      </g>
    </svg>
  );
};

export const Flash = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.09 13.28h3.09v7.2c0 1.68.91 2.02 2.02.76l7.57-8.6c.93-1.05.54-1.92-.87-1.92h-3.09v-7.2c0-1.68-.91-2.02-2.02-.76l-7.57 8.6c-.92 1.06-.53 1.92.87 1.92Z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const Server = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.32 10H4.69c-1.48 0-2.68-1.21-2.68-2.68V4.69c0-1.48 1.21-2.68 2.68-2.68h14.63C20.8 2.01 22 3.22 22 4.69v2.63C22 8.79 20.79 10 19.32 10ZM19.32 22H4.69c-1.48 0-2.68-1.21-2.68-2.68v-2.63c0-1.48 1.21-2.68 2.68-2.68h14.63c1.48 0 2.68 1.21 2.68 2.68v2.63c0 1.47-1.21 2.68-2.68 2.68ZM6 5v2M10 5v2M6 17v2M10 17v2M14 6h4M14 18h4"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const TagUser = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18 18.86h-.76c-.8 0-1.56.31-2.12.87l-1.71 1.69c-.78.77-2.05.77-2.83 0l-1.71-1.69c-.56-.56-1.33-.87-2.12-.87H6c-1.66 0-3-1.33-3-2.97V4.98c0-1.64 1.34-2.97 3-2.97h12c1.66 0 3 1.33 3 2.97v10.91c0 1.63-1.34 2.97-3 2.97Z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M12 10a2.33 2.33 0 1 0 0-4.66A2.33 2.33 0 0 0 12 10ZM16 15.66c0-1.8-1.79-3.26-4-3.26s-4 1.46-4 3.26"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const Scale = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7ZM18 6 6 18"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M18 10V6h-4M6 14v4h4"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];


  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
    scale: <Scale className="text-warning" fill="currentColor" size={30} />,
    lock: <Lock className="text-success" fill="currentColor" size={30} />,
    activity: (
      <Activity className="text-secondary" fill="currentColor" size={30} />
    ),
    flash: <Flash className="text-primary" fill="currentColor" size={30} />,
    server: <Server className="text-success" fill="currentColor" size={30} />,
    user: <TagUser className="text-danger" fill="currentColor" size={30} />,
  };

  const path = usePathname();
  const isBlog = path.includes('/blog');
  return (

    <Navbar className="bg-white" onMenuOpenChange={setIsMenuOpen}>

      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand justify="start">
          <Link href="#">
            <img
              src="https://www.woodenstreet.com/svg/new-logo.svg"
              alt="Logo"
              width={180}
              height={70}
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>
      {isBlog ? (<NavbarContent className="hidden sm:flex gap-4" justify="center">


        {/* menu 1 */}
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Dashboard</Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Blog List</Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Category</Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Comment</Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Logs</Link>
        </NavbarItem>

        <ActiveUser />
      </NavbarContent>) : (<NavbarContent className="hidden sm:flex gap-4" justify="center">


        {/* menu 1 */}
        <NavbarItem>
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button className="p-0 bg-transparent" endContent={icons.chevron}>
                  Catalouge
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label=" catalogue"
              className="w-[240px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem key="category">Category</DropdownItem>
              <DropdownItem key="products">Products</DropdownItem>
              <DropdownItem key="combo">Combo</DropdownItem>
              <DropdownItem key="review">Reviews</DropdownItem>
              <DropdownItem key="product-template">Product Template</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        {/* menu 2 */}
        <NavbarItem>
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button className="p-0 bg-transparent" endContent={icons.chevron}>
                  Stores
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label=" catalogue"
              className="w-[240px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem key="store-list">Stores List</DropdownItem>
              <DropdownItem key="city-list">City List</DropdownItem>
              <DropdownItem key="offer">Offer & Other Setting</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        {/* menu 3 */}
        <NavbarItem>
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button className="p-0 bg-transparent" endContent={icons.chevron}>
                  SEO Pages
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label=" catalogue"
              className="w-[240px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem key="information">Information</DropdownItem>
              <DropdownItem key="looks">Looks</DropdownItem>
              <DropdownItem key="modular-kitchen">Modular Kitchen</DropdownItem>
              <DropdownItem key="ws-project">Ws Project</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        {/* menu 4 */}
        <NavbarItem>
          <Button className="p-0 bg-transparent">
            Banners
          </Button>
        </NavbarItem>
        {/* menu 5 */}
        <NavbarItem>
          <Button className="p-0 bg-transparent">
            Web Search
          </Button>
        </NavbarItem>
        {/* menu 6 */}
        <NavbarItem>
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button className="p-0 bg-transparent" endContent={icons.chevron}>
                  Settings
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label=" catalogue"
              className="w-[240px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem key="coupon">Coupon</DropdownItem>
              <DropdownItem key="GS">General Setting</DropdownItem>
              <DropdownItem key="filter">Filter Options</DropdownItem>
              <DropdownItem key="users">Users</DropdownItem>
              <DropdownItem key="other setting">Other Settings</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>)}


      {/* Navbar menus End */}
      <NavbarContent justify="end">
        {/* <NavbarItem className="hidden lg:flex">
          <Link href="#">Logout</Link>
        </NavbarItem> */}
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>


  );
}
