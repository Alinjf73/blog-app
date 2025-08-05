"use client";

import { useCreateCategory, useUpdateCategory } from "@/hooks/useCategories";
import Button from "@/ui/Button";
import RHFTextField from "@/ui/RHFTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import SpinnerMini from "@/ui/SpinnerMini";

const schema = yup
  .object({
    title: yup
      .string()
      .min(5, "حداقل ۵ کاراکتر را وارد کنید")
      .required("عنوان ضروری است"),
    englishTitle: yup
      .string()
      .min(5, "حداقل ۵ کاراکتر را وارد کنید")
      .required("عنوان انگلیسی ضروری است"),
    description: yup
      .string()
      .min(10, "حداقل ۱۰ کاراکتر را وارد کنید")
      .required("توضیحات ضروری است"),
  })
  .required();

function CreateCategoryForm({ categoryToEdit = {} }) {
  const { _id: editId } = categoryToEdit;

  const isEditSession = Boolean(editId);
  const { title, englishTitle, description } = categoryToEdit;

  let editValues = {};
  if (isEditSession) {
    editValues = {
      title,
      englishTitle,
      description,
    };
  }
  const { isLoading: isCreating, mutateAsync: CreateCategory } =
    useCreateCategory();
  const { isLoading: isUpdating, mutateAsync: UpdateCategory } =
    useUpdateCategory();
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
    defaultValues: editValues,
  });

  const onSubmit = async (data) => {
    if (isEditSession) {
      UpdateCategory(
        { id: editId, data },
        {
          onSuccess: () => {
            reset();
            router.push("/profile/categories");
          },
        }
      );
    } else {
      CreateCategory(data, {
        onSuccess: () => {
          router.push("/profile/categories");
        },
      });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField
        name="title"
        label="عنوان"
        register={register}
        errors={errors}
        isRequired
      />
      <RHFTextField
        label="عنوان انگلیسی"
        name="englishTitle"
        register={register}
        isRequired
        errors={errors}
      />

      <RHFTextField
        label="توضیحات"
        name="description"
        register={register}
        isRequired
        errors={errors}
      />

      <div>
        {isCreating ? (
          <SpinnerMini />
        ) : (
          <Button variant="primary" type="submit" className="w-full">
            تایید
          </Button>
        )}
      </div>
    </form>
  );
}

export default CreateCategoryForm;
