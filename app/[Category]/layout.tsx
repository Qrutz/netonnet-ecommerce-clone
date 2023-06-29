import IconBreadcrumbs from '@/components/Breadcrumbs';
import CategoryNavbar from '@/components/CategoryNavbar';

export default function CategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { Category: string };
}) {
  // fix general name later

  return (
    <>
      <IconBreadcrumbs params={''} />
      <section className='flex text-black gap-5 pt-1 '>
        {/* Include shared UI here e.g. a header or sidebar */}

        <CategoryNavbar />

        <main className='flex-[8] w-full '>{children}</main>
      </section>
    </>
  );
}
