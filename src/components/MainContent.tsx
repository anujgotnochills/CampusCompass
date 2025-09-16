
"use client";

export function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-1 flex-col gap-4 pb-20 sm:pb-6">
       {children}
    </main>
  );
}
