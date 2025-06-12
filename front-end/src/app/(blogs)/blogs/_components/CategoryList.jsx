import Link from "next/link";

async function CategoryList() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/list`);
  const {
    data: { categories },
  } = await res.json();

  return (
    <ul className="space-y-4">
      <Link href="/blogs">همه</Link>
      {categories.map((c) => (
        <li key={c._id}>
          <Link href={`/blogs/category/${c.slug}`}>{c.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default CategoryList;
