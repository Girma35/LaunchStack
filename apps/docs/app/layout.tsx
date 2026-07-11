export const metadata = {
  title: "LaunchStack Docs"
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "ui-sans-serif, system-ui", margin: 0 }}>{children}</body>
    </html>
  );
}
