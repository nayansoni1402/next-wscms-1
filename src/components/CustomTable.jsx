'use client'
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Tooltip,
  Pagination,
} from "@nextui-org/react";

export const columns = [
  { name: "ID", uid: "id", sortable: false },
  { name: "Category", uid: "name", sortable: true },
  { name: "Status", uid: "status", sortable: true },
  { name: "No of Products", uid: "productcount", sortable: true },
  { name: "SEO Content", uid: "role", sortable: true },
  { name: "Testimonials", uid: "testimonials" },
  { name: "Actions", uid: "actions" },
];

export const EyeIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
        stroke="#64748B"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
        stroke="#64748B"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const EditIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
        stroke="#64748B"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
        stroke="#64748B"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M2.5 18.3333H17.5"
        stroke="#64748B"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const statusOptions = [
  { name: "Available", uid: "active" },
  { name: "Pending", uid: "pending" },
  { name: "Available", uid: "active" },
  { name: "Draft", uid: "draft" },
];

export const users = [
  {
    id: 1,
    name: "Fabric Sofas",
    role: "available",
    testimonials: "available",
    status: "available",
    productcount: "100",
    avatar: "https://images.woodenstreet.de/image/cache/data%2Ffabric-sofa%2Fparker-fabric-sofa%2Fcream-robins%2Fupdated%2Fnew-logo%2F7-100x100.jpg",
  },
  {
    id: 2,
    name: "Wooden Sofa Sets",
    role: "pending",
    testimonials: "pending",
    status: "draft",
    productcount: "283",
    avatar: "https://images.woodenstreet.de/image/cache/data%2Fwooden-sofa%2Fwinster-wooden-sofa-revised%2Frevised%2Fhoney%2Fupdated%2Fnew-logo%2F1-100x100.jpg",
  },
  {
    id: 3,
    name: "Lounge Chairs",
    role: "available",
    testimonials: "available",
    status: "available",
    productcount: "126",
    avatar: "https://images.woodenstreet.de/image/cache/data%2Flounge-chairs%2Fjoan-lounge-chair%2Fmagnolia-beige%2Fnew-logo%2F1-100x100.jpg",
  },
  {
    id: 4,
    name: "Fabric Sofa Cum Beds",
    role: "pending",
    testimonials: "pending",
    status: "available",
    productcount: "86",
    avatar: "https://images.woodenstreet.de/image/cache/data%2Fsofa-beds%2Fvoltz-3-seater-fabric-sofa-cum-bed%2Fmocha-brown%2F1-100x100.jpg",
  },
  {
    id: 5,
    name: "Single Recliner Sofa",
    role: "available",
    testimonials: "active",
    status: "active",
    productcount: "107",
    avatar: "https://images.woodenstreet.de/image/cache/data%2Frecliner%2FLittle+Nap+New%2Farvana-suede-fabric-1-seater-rocking-revolving-motorized-recliner-beige%2F3D+-images%2Fnew+images%2F1-100x100.jpg",
  },
  {
    id: 6,
    name: "2 Seater Dining Table Sets",
    role: "available",
    testimonials: "active",
    productcount: "26",
    avatar: "https://images.woodenstreet.de/image/cache/data%2Fdining-set%2Fcalabria%2F2-seater%2Fhoney%2Fnew-logo%2F1-100x100.jpg",
    status: "active",
  },
  {
    id: 7,
    name: "Folding Dining Table",
    role: "draft",
    testimonials: "pending",
    status: "pending",
    productcount: "11",
    avatar: "https://images.woodenstreet.de/image/cache/data%2Fdining-set%2F4-seater%2Fadvin-4-seater-revised%2Fhoney%2Fupdated%2Fnew-logo%2F1-100x100.jpg",
  },
  {
    id: 8,
    name: "Serving Trays",
    role: "available",
    testimonials: "active",
    status: "active",
    productcount: "472",
    avatar: "https://images.woodenstreet.de/image/cache/data%2Facn-quote%2Fmadrid-rectangle-serving-tray%2F1-100x100.jpg",
  },
  {
    id: 9,
    name: "Ergonomic Chairs",
    role: "available",
    testimonials: "available",
    status: "available",
    productcount: "60",
    avatar: "https://images.woodenstreet.de/image/cache/data%2Fteal-chairs%2Fnew-listing%2Fsara-high-back-office-chair-grey%2F1-100x100.jpg",
  },
  {
    id: 10,
    name: "Tripod Lamps",
    role: "active",
    testimonials: "pending",
    status: "pending",
    productcount: "24",
    avatar: "https://images.woodenstreet.de/image/cache/data%2Flamps-lighting%2Ffloor-lamps%2Fnatural-brown-wooden-stick-tripod-floor-lamp%2Fupdated%2FKPL-1-100x100.jpg",
  },
];

export function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export const PlusIcon = ({ size = 24, width, height, ...props }) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M6 12h12" />
        <path d="M12 18V6" />
      </g>
    </svg>
  );
};

export const VerticalDotsIcon = ({ size = 24, width, height, ...props }) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
        fill="currentColor"
      />
    </svg>
  );
};

export const SearchIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export const ChevronDownIcon = ({ strokeWidth = 1.5, ...otherProps }) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...otherProps}
    >
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

const statusColorMap = {
  active: "success",
  pending: "danger",
  available: "success",
  draft: "primary",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions", "testimonials", "productcount"];

export default function CustomTable() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "productcount",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(users.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status),
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User className="text-lg"
            avatarProps={{ radius: "sm", size: "lg", src: user.avatar }} description={user.email} name={cellValue}>
            {user.email}
          </User>
        );
      case "role":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[user.role]}
            size="sm"
            variant="dot"
          >
            <span className="text-sm text-slate-800" variant="flat">{cellValue}</span>
          </Chip>
        );
      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[user.status]}
            size="sm"
            variant="dot"
          >
            <span className="text-sm text-slate-800" variant="flat">{cellValue}</span>
          </Chip>

        );
      case "testimonials":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[user.testimonials]}
            size="sm"
            variant="dot"
          >
            <span className="text-sm text-slate-800">{cellValue}</span>
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="container p-4">
        <div className="flex flex-col gap-4 ">
          <div className="flex justify-start gap-3 items-center">
            <div className="text-gray-700 inline-block text-base">Filters :</div>
            <Input
              isClearable
              classNames={{
                base: "w-full sm:max-w-[35%]",
                inputWrapper: "border-1",
              }}
              placeholder="Search by name..."
              size="sm"
              startContent={<SearchIcon className="text-default-300" />}
              value={filterValue}
              variant="bordered"
              onClear={() => setFilterValue("")}
              onValueChange={onSearchChange}
            />
            <div className="flex gap-3">
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex w-40">
                  <Button
                    endContent={<ChevronDownIcon />}
                    size="md"
                    variant="flat"
                    className="bg-transparent border-1 border-slate-200"
                  >
                    Select Status
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={statusFilter}
                  selectionMode="multiple"
                  onSelectionChange={setStatusFilter}
                >
                  {statusOptions.map((status) => (
                    <DropdownItem key={status.uid} className="capitalize ">
                      {capitalize(status.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex w-50">
                  <Button
                    endContent={<ChevronDownIcon />}
                    size="md"
                    variant="flat"
                    className="bg-transparent border-1 border-slate-200">
                    SEO Content Status
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={visibleColumns}
                  selectionMode="multiple"
                  onSelectionChange={setVisibleColumns}
                >
                  {columns.map((column) => (
                    <DropdownItem key={column.uid} className="capitalize">
                      {capitalize(column.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex w-50">
                  <Button
                    endContent={<ChevronDownIcon />}
                    size="md"
                    variant="flat"
                    className="bg-transparent border-1 border-slate-200">
                    Testimonial Status
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={visibleColumns}
                  selectionMode="multiple"
                  onSelectionChange={setVisibleColumns}
                >
                  {columns.map((column) => (
                    <DropdownItem key={column.uid} className="capitalize">
                      {capitalize(column.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-default-400 text-small">Total {users.length} users</span>
            <label className="flex items-center text-default-400 text-small">
              Rows per page:
              <select
                className="bg-transparent outline-none text-default-400 text-small"
                onChange={onRowsPerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    users.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center container">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400 ">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${items.length} selected`}
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-slate-100", "text-default-700", "border-b", "border-divider", "text-md", "p-3"],
      td: ["p-3", "border-b-1",
        "group-data-[first=true]/tr:first:before:rounded-none",
        "group-data-[first=true]/tr:last:before:rounded-none",
        "group-data-[middle=true]/tr:before:rounded-none",
        "group-data-[last=true]/tr:first:before:rounded-none",
        "group-data-[last=true]/tr:last:before:rounded-none",
      ],
    }),
    [],
  );

  return (
    <>
      <div className="flex container p-0 pt-5 justify-between items-center">
        <h3 className="text-2xl/7 font-bold text-gray-700 sm:truncate sm:text-2xl sm:tracking-tight">Category</h3>
        <div className="flex justify-end">
          <Button className="bg-white bordered mr-2 rounded" size="md" variant="bordered">
            Import
          </Button>
          <Button className="bg-white bordered mr-2 rounded" size="md" variant="bordered">
            Export
          </Button>
          <Button className="bg-foreground text-background rounded" endContent={<PlusIcon />} size="md">
            Add Category
          </Button>
        </div>
      </div>
      <div className="container bg-white p-5 mt-5 mb-5 border-1 border-gray-200">
        <Table
          isCompact
          removeWrapper
          aria-label="Example table with custom cells, pagination and sorting"
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          checkboxesProps={{
            classNames: {
              wrapper: "after:bg-foreground after:text-background text-background ",
            },
          }}
          classNames={classNames}
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
          onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
        >
          <TableHeader columns={headerColumns} className="border-1 border-b-1 ">
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
                className="bg-slate-100"
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No users found"} items={sortedItems}>
            {(item) => (
              <TableRow key={item.id} className="">
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>

  );
}

