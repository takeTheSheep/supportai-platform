export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-app">
      <div className="absolute left-[-8%] top-[-12%] h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute right-[-6%] top-[12%] h-72 w-72 rounded-full bg-violet/20 blur-3xl" />
      <div className="absolute bottom-[-14%] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-teal/10 blur-3xl" />
      <div className="absolute inset-0 landing-grid opacity-35" />
      <section className="relative flex min-h-screen items-center justify-center px-4 py-12 sm:px-6">
        {children}
      </section>
    </div>
  );
}

