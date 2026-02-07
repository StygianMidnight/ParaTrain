export default function Header() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold">ParaTrain Dashboard</h1>

      <div className="text-sm text-gray-600">
        Patient Mode
      </div>
    </header>
  );
}
