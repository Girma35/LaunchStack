const sections = [
  {
    title: "Architecture",
    href: "/architecture"
  },
  {
    title: "Deployment",
    href: "/deployment"
  }
];

export default function DocsHomePage() {
  return (
    <main style={{ padding: 40, maxWidth: 900, margin: "0 auto" }}>
      <h1>LaunchStack Documentation</h1>
      <p>Production starter-kit documentation for architecture, operations, and extension guidelines.</p>
      <ul>
        {sections.map((section) => (
          <li key={section.href} style={{ marginBottom: 8 }}>
            <a href={section.href}>{section.title}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
