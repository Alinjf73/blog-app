import Table from "@/ui/Table";
import { toLocalDateShort } from "@/utils/dateFormatter";
import { toPersianDigits } from "@/utils/numberFormatter";

function UserRow({ index, user }) {
  const { name, email, createdAt } = user;

  return (
    <Table.Row>
      <td>{toPersianDigits(index + 1)}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{toLocalDateShort(createdAt)}</td>
    </Table.Row>
  );
}

export default UserRow;
