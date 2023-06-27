export default function CategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { Category: string };
}) {
  return (
    <section className='flex text-black bg-gray-300'>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav className='hidden lg:block flex-[3] bg-blue-300'>
        <h1>{params.Category}</h1>
      </nav>

      <main className='flex-[8] w-full '>{children}</main>
    </section>
  );
}
