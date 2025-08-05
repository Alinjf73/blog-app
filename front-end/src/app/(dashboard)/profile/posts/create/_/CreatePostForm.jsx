"use client";

import useCategories from "@/hooks/useCategories";
import Button from "@/ui/Button";
import ButtonIcon from "@/ui/ButtonIcon";
import FileInput from "@/ui/FileInput";
import RHFSelect from "@/ui/RHFSelect";
import RHFTextField from "@/ui/RHFTextField";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import SpinnerMini from "@/ui/SpinnerMini";
import { imageUrlToFile } from "@/utils/fileFormatter";
import { useCreatePost, useEditPost } from "@/hooks/usePosts";

const schema = yup
  .object({
    title: yup
      .string()
      .min(5, "حداقل ۵ کاراکتر را وارد کنید")
      .required("عنوان ضروری است"),
    briefText: yup
      .string()
      .min(5, "حداقل ۱۰ کاراکتر را وارد کنید")
      .required("توضیحات ضروری است"),
    text: yup
      .string()
      .min(5, "حداقل ۱۰ کاراکتر را وارد کنید")
      .required("توضیحات ضروری است"),
    slug: yup.string().required("اسلاگ ضروری است"),
    readingTime: yup
      .number()
      .positive()
      .integer()
      .required("زمان مطالعه ضروری است")
      .typeError("یک عدد را وارد کنید"),
    category: yup.string().required("دسته بندی ضروری است"),
  })
  .required();

function CreatePostForm({ postToEdit = {} }) {
  const { _id: editId } = postToEdit;

  const isEditSession = Boolean(editId);
  const {
    title,
    briefText,
    text,
    slug,
    readingTime,
    category,
    coverImage,
    coverImageUrl: prevCoverImageUrl,
  } = postToEdit;

  let editValues = {};
  if (isEditSession) {
    editValues = {
      title,
      briefText,
      text,
      slug,
      readingTime,
      category: category._id,
      coverImage,
    };
  }

  const { isLoading, categories } = useCategories();
  const [coverImageUrl, setCoverImageUrl] = useState(prevCoverImageUrl || null);
  const { createPost, isCreating } = useCreatePost();
  const { editPost, isEditing } = useEditPost();
  const router = useRouter();

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
    defaultValues: editValues,
  });

  useEffect(() => {
    if (prevCoverImageUrl) {
      async function fetchMyApi() {
        const file = await imageUrlToFile(prevCoverImageUrl);
        setValue("coverImage", file);
      }
      fetchMyApi();
    }
  }, [editId]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    if (isEditSession) {
      editPost(
        { id: editId, data: formData },
        {
          onSuccess: () => {
            reset;
            router.push("/profile/posts");
          },
        }
      );
    } else {
      createPost(formData, {
        onSuccess: () => {
          router.push("/profile/posts");
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
        label="متن کوتاه"
        name="briefText"
        register={register}
        isRequired
        errors={errors}
      />
      <RHFTextField
        label="متن"
        name="text"
        register={register}
        isRequired
        errors={errors}
      />
      <RHFTextField
        label="اسلاگ"
        name="slug"
        register={register}
        isRequired
        errors={errors}
      />
      <RHFTextField
        label="زمان مطالعه"
        name="readingTime"
        register={register}
        isRequired
        errors={errors}
      />
      <RHFSelect
        label="دسته بندی"
        isRequired
        name="category"
        register={register}
        options={categories}
      />

      <Controller
        control={control}
        name="coverImage"
        rules={{ required: "عکس کاور پست الزامی است" }}
        render={({ field: { value, onChange, ...rest } }) => {
          return (
            <FileInput
              label="انتخاب کاور پست"
              type="file"
              name="coverImage"
              isRequired
              errors={errors}
              {...rest}
              value={value?.fileName}
              onChange={(event) => {
                const file = event.target.files[0];
                onChange(file);
                setCoverImageUrl(URL.createObjectURL(file));
                event.target.value = null;
              }}
            />
          );
        }}
      />

      {coverImageUrl && (
        <div className="relative aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
          <Image
            className="object-cover object-center"
            fill
            alt="cover-iamge"
            src={coverImageUrl}
          />
          <ButtonIcon
            type="button"
            onClick={() => {
              setCoverImageUrl(null);
              setValue("coverImage", null);
            }}
            variant="red"
            className="w-6 h-6 absolute !left-0"
          >
            <XMarkIcon />
          </ButtonIcon>
        </div>
      )}
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

export default CreatePostForm;
