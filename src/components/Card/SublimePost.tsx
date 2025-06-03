import { SublimePostContent } from "@/models/Card";

interface SublimePostProps {
  post: SublimePostContent;
  disableUserSelect?: boolean;
}

export default function SublimePost({ post, disableUserSelect }: SublimePostProps) {
  return (
    <>
      {
        post.text && (
          <p className={`card-description ${disableUserSelect ? "disable-user-select" : ""}`}>{post.text}</p>
        )
      }
    </>
  )
}