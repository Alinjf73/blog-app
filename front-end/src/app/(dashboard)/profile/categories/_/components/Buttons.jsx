"use client";
import { useRemoveCategory } from "@/hooks/useCategories";
import ButtonIcon from "@/ui/ButtonIcon";
import ConfirmDelete from "@/ui/ConfirmDelete";
import Modal from "@/ui/Modal";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export function CreateCategory() {
  return (
    <Link
      href="/profile/categories/create"
      className="justify-self-end flex gap-x-4 py-3 items-center rounded-lg bg-primary-900 px-4 text-sm font-medium text-secondary-0 
      transition-colors hover:bg-primary-700"
    >
      <span className="hidden md:block">ایجاد دسته بندی</span>{" "}
      <PlusIcon className="w-5" />
    </Link>
  );
}

export function DeleteCategory({ value, label }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading: isDeleting } = useRemoveCategory();

  const removeCategoryHandler = async (id) => {
    try {
      const { message } = await mutateAsync(id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطا در حذف دسته‌بندی");
    }
  };

  return (
    <>
      <ButtonIcon variant="outline" onClick={() => setOpen(true)}>
        <TrashIcon className="text-error" />
      </ButtonIcon>

      {open && (
        <Modal
          title={`حذف ${label}`}
          open={true}
          onClose={() => setOpen(false)}
        >
          <ConfirmDelete
            resourceName={label}
            onClose={() => setOpen(false)}
            onConfirm={() => removeCategoryHandler(value)}
            isLoading={isDeleting}
          />
        </Modal>
      )}
    </>
  );
}

export function UpdateCategory({ value }) {
  return (
    <Link href={`/profile/categories/${value}/edit`}>
      <ButtonIcon variant="outline">
        <PencilIcon />
      </ButtonIcon>
    </Link>
  );
}
