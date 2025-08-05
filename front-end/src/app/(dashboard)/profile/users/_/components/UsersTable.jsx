"use client";
import Table from "@/ui/Table";
import Spinner from "@/ui/Spinner";
import { useGetAllUsers } from "@/hooks/useUsers";
import UserRow from "./UserRow";

function UsersTable() {
  const { isLoading, data } = useGetAllUsers();
  const { users } = data || [];

  if (isLoading) return <Spinner />;
  console.log(data);

  return (
    <Table>
      <Table.Header>
        <th>#</th>
        <th>نام</th>
        <th>ایمیل</th>
        <th>تاریخ ایجاد</th>
      </Table.Header>
      <Table.Body>
        {users.map((user, index) => (
          <UserRow key={user._id} user={user} index={index} />
        ))}
      </Table.Body>
    </Table>
  );
}

export default UsersTable;
