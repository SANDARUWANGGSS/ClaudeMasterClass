// preview page for newly created UI components
import Avatar from "@/components/Avatar"

export default function PreviewPage() {
  return (
    <div className="page-content">
      <h2>Preview</h2>

      <section>
        <h3>Avatar</h3>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginTop: "1rem" }}>
          <Avatar name="alice" />
          <Avatar name="Bob" />
          <Avatar name="PocketHeist" />
          <Avatar name="JohnDoe" />
        </div>
      </section>
    </div>
  )
}
