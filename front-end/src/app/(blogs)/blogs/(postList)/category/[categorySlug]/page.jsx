import { getPosts } from "@/services/postServices";
import setCookieOnReq from "@/utils/setCookieOnReq";
import { cookies } from "next/headers";
import queryString from "query-string";
import PostList from "../../../_components/PostList";

async function Category({ params, searchParams }) {
  const { categorySlug } = await params;

  const queries =
    queryString.stringify(await searchParams) +
    "&" +
    `categorySlug=${categorySlug}`;
  const cookieStore = cookies();
  const options = await setCookieOnReq(cookieStore);
  const { posts } = await getPosts(queries, options);
  const { search } = await searchParams;

  return (
    <>
      {search ? (
        <p className="mb-4 text-secondary-700">
          {posts.length === 0
            ? "هیچ پستی با این مشخصات یافت نشد "
            : `نشان دادن ${posts.length} نتیجه برای `}
          <span className="font-bold">&quot;{search}&quot;</span>
        </p>
      ) : null}
      <PostList posts={posts} />
    </>
  );
}

export default Category;
