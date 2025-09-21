export default function CMSLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <div>
        {children}
      </div>
    </>
      
  );
}
