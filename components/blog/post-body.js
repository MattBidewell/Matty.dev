
export default function PostBody({ content }) {
  return (
    <div className="content">
      <div
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}
