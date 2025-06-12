import Image from "next/image";
import Link from "next/link";

function CoverImage({ title, coverImageUrl, slug }) {
  return (
    <Link href={`/blogs/${slug}`}>
      <div className="relative aspect-w-5 aspect-h-3 overflow-hidden rounded-md mb-6">
        <Image
          src={coverImageUrl}
          alt={title}
          fill
          className="object-cover object-center hover:scale-110 transition-all duration-300 ease-out"
          quality={80}
        />
      </div>
    </Link>
  );
}

export default CoverImage;
