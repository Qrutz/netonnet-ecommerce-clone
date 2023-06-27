export default function CategoryLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='flex text-black bg-white'>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav className='flex-[3] bg-blue-300'>NAV</nav>

      <main className='flex-[8] w-full '>{children}</main>
    </section>
  );
}
