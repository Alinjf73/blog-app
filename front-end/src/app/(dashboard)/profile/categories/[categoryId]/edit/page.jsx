import Breadcrumbs from "@/ui/Breadcrumbs";
import { notFound } from "next/navigation";
import { getCategoryById } from "@/services/categoryService";
import CreateCategoryForm from "../../create/_/CreateCategoryForm";

async function EditPage({ params }) {
  params = await params;
  const { categoryId } = params;

  const { category } = await getCategoryById(categoryId);

  if (!category) {
    notFound();
  }
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "دسته بندی ها",
            href: "/profile/categories",
          },
          {
            label: "ویرایش دسته بندی",
            href: `/profile/categories/${categoryId}/edit`,
            active: true,
          },
        ]}
      />
      <CreateCategoryForm categoryToEdit={category} />
    </div>
  );
}

export default EditPage;
