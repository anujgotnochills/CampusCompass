
"use client";

export function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-1 flex-col gap-4 pb-24 md:pb-6 px-4 md:px-6">
       {children}
    </main>
  );
}
