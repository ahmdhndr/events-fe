"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

import { ColumnDef } from "@tanstack/react-table";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdDelete, MdInfo } from "react-icons/md";

import DataTable from "@/components/datatable";
import { DataTableColumnHeader } from "@/components/datatable/datatable-column-header";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useModal } from "@/context/modal-context";
import { blurDataURL } from "@/utils/blur-data-url";

import useCategory from "../_hooks/use-category";
import AddCategoryDialog from "./add-category-dialog";

export type TCategory = {
  _id: string;
  icon: string;
  name: string;
  description: string;
};

export default function CategoryTable() {
  const { open } = useModal();
  const router = useRouter();
  const {
    categoryData,
    currentPage,
    currentLimit,
    currentSearch,
    isLoadingCategory,
    isRefetchingCategory,
    handleChangePage,
    handleChangeLimit,
    handleChangeSearch,
    setURL,
  } = useCategory();

  const handleDelete = useCallback((id: string) => {
    console.log("Delete", id);
  }, []);

  const columns: ColumnDef<TCategory>[] = [
    {
      accessorKey: "icon",
      header: "Icon",
      cell: ({ row }) => {
        const category = row.original;
        let url = "";
        if (category.icon.startsWith("https")) {
          url = category.icon;
        } else {
          url = "/images/icons/placeholder.png";
        }

        return (
          <div className="relative h-10 w-10">
            <Image
              fill
              src={url}
              alt={category.name}
              // width={50}
              // height={50}
              className="object-contain"
              sizes="40px"
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const category = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <BiDotsVerticalRounded className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => router.push(`/admin/category/${category._id}`)}
              >
                <MdInfo className="h-4 w-4" /> Detail
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer text-red-500 hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white"
                onClick={() => handleDelete(category._id)}
              >
                <MdDelete className="h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  useEffect(() => {
    if (!currentPage || !currentLimit) {
      setURL();
    }
  }, [currentPage, currentLimit, setURL]);

  return (
    <>
      <DataTable
        loading={isLoadingCategory || isRefetchingCategory}
        columns={columns}
        data={categoryData?.list}
        totalPages={categoryData?.totalPages}
        currentPage={Number(currentPage)}
        onChangePage={handleChangePage}
        valueLimit={currentLimit || "4"}
        onChangeLimit={handleChangeLimit}
        valueInput={currentSearch || ""}
        onChangeSearch={handleChangeSearch}
        buttonTopContent={
          <div className="flex flex-col gap-1 md:flex-row">
            <Button size="sm" onClick={open}>
              Create Category
            </Button>
          </div>
        }
      />

      <ResponsiveDialog
        title="Add Category"
        className="max-h-[575px] overflow-y-auto md:max-w-sm"
      >
        <ScrollArea>
          <AddCategoryDialog />
        </ScrollArea>
      </ResponsiveDialog>
    </>
  );
}
