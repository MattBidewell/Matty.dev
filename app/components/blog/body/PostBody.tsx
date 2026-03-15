import { ReactNode } from "react";

type PostBodyProps = {
  content?: string;
  children?: ReactNode;
};

export default function PostBody({ content, children }: PostBodyProps) {
  return (
    <div className="content">
      {typeof content === "string" ? (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        children
      )}
    </div>
  );
}
