import setCookieOnReq from "@/utils/setCookieOnReq";
import { cookies } from "next/headers";
import { getAllUsersApi } from "./authService";
import { getAllCommentsApi } from "./commentService";
import { getPosts } from "./postServices";

export async function fetchCardData() {
  const cookieStore = cookies();
  const options = await setCookieOnReq(cookieStore);

  try {
    const data = await Promise.all([
      getAllUsersApi(options),
      getAllCommentsApi(options),
      getPosts(),
    ]);
    const numOfUsers = Number(data[0].users.length ?? "0");
    const numOfPosts = Number(data[2].posts.length ?? "0");
    const numOfComments = Number(data[1].commentsCount ?? "0");

    return {
      numOfUsers,
      numOfPosts,
      numOfComments,
    };
  } catch (error) {
    throw new Error("خطا در بارگذاری اطلاعات");
  }
}
