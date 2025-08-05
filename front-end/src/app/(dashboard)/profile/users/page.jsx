import UsersTable from "./_/components/UsersTable";

function Page() {
  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-bold mb-5">کاربران</h1>
      </div>
      <UsersTable />
    </div>
  );
}

export default Page;
