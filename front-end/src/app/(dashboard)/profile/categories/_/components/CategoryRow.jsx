import Table from "@/ui/Table";
import { toLocalDateShort } from "@/utils/dateFormatter";
import { toPersianDigits } from "@/utils/numberFormatter";
import { DeleteCategory, UpdateCategory } from "./Buttons";

function CategoryRow({ index, category }) {
  const { label, value, englishTitle, description, createdAt } = category;

  return (
    <Table.Row>
      <td>{toPersianDigits(index + 1)}</td>
      <td>{label}</td>
      <td>{englishTitle}</td>
      <td>{description}</td>
      <td>{toLocalDateShort(createdAt)}</td>
      <td className="flex items-center gap-x-3">
        <UpdateCategory value={value} />
        <DeleteCategory value={value} label={label} />
      </td>
    </Table.Row>
  );
}

export default CategoryRow;
