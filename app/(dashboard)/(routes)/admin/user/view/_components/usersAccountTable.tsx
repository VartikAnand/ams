"use client";
import React, { useState, useMemo, useCallback, ChangeEvent } from "react";

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
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
} from "@nextui-org/react";

import { Plus, MoreVertical, Search } from "lucide-react";

import { columns, statusOptions } from "/utils/usersAccounts.ts";
import { capitalize } from "/utils/table";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Add } from "./(action)/add";
import { Delete } from "./(action)/delete";
import { TopContent } from "./topContent";

const statusColorMap: Record<string, ChipProps["color"]> = {
  true: "success",
  false: "danger",
};

type UserData = (typeof users)[0];

const INITIAL_VISIBLE_COLUMNS = [
  "amount",
  "paymentType",
  "paymentFromTo",
  "ForToName",
  "paymentMode",
  "createdAt",
  "actions",
];
type LandPaymentData = {
  payId: string;
  paidAmount: number;
  paymentType: string;
  particular: string;
  paymentGivenBy: string;
  paymentMode: string;
  isPaymentAdded: boolean;
  perSqCost: number;
  totalLandCost: number;
  remainingAmount: number;
};
interface PaymentTableProps {
  userId: string;
  userData: string;
  initialData: LandPaymentData[];
}

export const UsersAccountTable = ({ userId, initialData, userData }) => {
  const [filterValue, setFilterValue] = useState<string>("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "createdAt",
    direction: "descending",
  });

  const [page, setPage] = useState<number>(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredData = [...initialData];

    if (hasSearchFilter) {
      filteredData = filteredData.filter((land) =>
        land.paymentGivenBy?.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredData = filteredData.filter((land) =>
        Array.from(statusFilter).includes(land.status)
      );
    }

    return filteredData;
  }, [initialData, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: UserData, b: UserData) => {
      const first = a[sortDescriptor.column as keyof UserData] as number;
      const second = b[sortDescriptor.column as keyof UserData] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((user: UserData, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof UserData];

    switch (columnKey) {
      //paid amount
      case "amount":
        return (
          <p>
            &#8377;
            {user?.creditAmount?.toLocaleString("en-IN") ||
              user?.debitAmount?.toLocaleString("en-IN") ||
              "null"}
          </p>
        );

      // particular
      case "paymentType":
        return (
          <>
            {user?.paymentType === "Debit" ? (
              <Chip
                className="capitalize  py-1 px-3"
                color="danger"
                size="sm"
                variant="bordered"
              >
                Debit
              </Chip>
            ) : (
              <>
                <Chip
                  className="capitalize px-2.5 py-1 mx-auto"
                  color="primary"
                  size="sm"
                  variant="bordered"
                >
                  Credit
                </Chip>
              </>
            )}
          </>
        );
      // paymentGivenBy
      case "paymentFromTo":
        return <p>{user?.paymentFor || user?.paymentTo || "Null"}</p>;

      case "ForToName":
        return <p>{user?.ForToName}</p>;
      case "paymentTo":
        return <p> {user?.paymentTo}</p>;

      case "paymentMode":
        return <p>{user?.paymentMode}</p>;
      // Per sq cost
      case "paymentModeId":
        return <p>{user?.paymentModeId}</p>;
      // Total Land  cost
      case "paymentModeInfo":
        return <p> {user?.paymentModeInfo}</p>;

      // createdAt
      case "createdAt":
        return (
          <p>
            {user.createdAt.toLocaleString("en-US", {
              day: "numeric",
              month: "short",

              year: "numeric",
            })}
          </p>
        );
      case "actions":
        return (
          <div className=" flex justify-start items-center gap-2 pl-4">
            <Delete farmerPaymentId={user} />
          </div>
        );

      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  // TOP CONETENT

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4 p-6">
        <div className="flex justify-between gap-3 items-end">
          {/* Search input */}
          <Input
            size="xs"
            color="primary"
            isClearable
            className="lg:w-1/2 w-full"
            placeholder="Search by name..."
            startContent={<Search />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button color="primary" variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                color="primary"
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
            {/* <Add userData={userId} /> */}
          </div>
        </div>
        <TopContent initialData={initialData} userData={userData} />

        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small mx-2">
            Total {initialData.length} Record&apos;s
          </span>
          <label className="flex mx-2 items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    onClear,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex lg:justify-between justify-center items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          variant="flat"
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-full justify-end gap-2">
          <Button
            color="primary"
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            color="primary"
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [page, pages, onPreviousPage, onNextPage]);

  return (
    <div className="lg:mx-5 mx-2 ">
      <Table
        // onRowAction={(key) => toast.success("Success")}
        isCompact
        aria-label="user table"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          th: [" bg-primary-400/10 bg-opacity-80"],
          td: ["cursor-pointer"],
        }}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader removeWrapper selectionMode columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          color="primary"
          emptyContent={"No Payment's "}
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={item.payId}>
              {(columnKey) => (
                <TableCell key={columnKey}>
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
