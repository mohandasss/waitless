import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-md px-container-padding py-lg flex flex-col gap-xl">
        {children}
      </main>
    </div>
  );
}
