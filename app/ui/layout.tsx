import Navigation from "./navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-between relative bg-gradient-to-br from-slate-900 to-zinc-900 text-white">
      <section className="w-full h-[calc(100%_-_80px)]">{children}</section>
      <Navigation />
    </main>
  );
}
