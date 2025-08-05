import CategoriesTable from "./_/components/CategoriesTable";
import { CreateCategory } from "./_/components/Buttons";

function Page() {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-xl font-bold mb-5">دسته بندی ها</h1>
        <CreateCategory />
      </div>
      <CategoriesTable />
    </div>
  );
}

export default Page;
