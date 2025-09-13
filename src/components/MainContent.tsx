
"use client";

export function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6 pb-20 sm:pb-6">
       {children}
    </main>
  );
}
