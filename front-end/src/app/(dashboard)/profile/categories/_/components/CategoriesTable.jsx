"use client";
import Empty from "@/ui/Empty";
import Table from "@/ui/Table";
import useCategories from "@/hooks/useCategories";
import CategoryRow from "./CategoryRow";
import Spinner from "@/ui/Spinner";

function CategoriesTable() {
  const { isLoading, categories } = useCategories();

  if (isLoading) return <Spinner />;

  if (!categories.length) return <Empty resourceName="دسته بندی ای" />;
  return (
    <Table>
      <Table.Header>
        <th>#</th>
        <th>دسته بندی</th>
        <th>عنوان انگلیسی</th>
        <th>توضیحات</th>
        <th>تاریخ ایجاد</th>
        <th>عملیات</th>
      </Table.Header>
      <Table.Body>
        {categories.map((category, index) => (
          <CategoryRow key={category.value} category={category} index={index} />
        ))}
      </Table.Body>
    </Table>
  );
}

export default CategoriesTable;
