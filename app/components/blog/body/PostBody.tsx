export default function PostBody({ content }: { content: string }) {
  return (
    <div className="content">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
