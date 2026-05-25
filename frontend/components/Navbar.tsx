export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Notes
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Cloud Notes — DevOps learning project
          </p>
        </div>
      </div>
    </header>
  );
}
