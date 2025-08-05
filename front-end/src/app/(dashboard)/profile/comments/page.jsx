"use client";
import { useGetComments } from "@/hooks/useGetComments";
import Spinner from "@/ui/Spinner";

function Page() {
  const { data, isLoading } = useGetComments();
  const comments = data?.comments ?? [];

  if (isLoading) return <Spinner />;
  console.log(comments);

  if (comments.length === 0) {
    return <p>هنوز کامنتی ثبت نشده است.</p>;
  }

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment._id} className="border-b py-2">
          {comment.content.text}
        </div>
      ))}
    </div>
  );
}

export default Page;
