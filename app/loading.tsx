import Logo from '@/components/logo'

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <Logo/>
      <p className="mt-4 text-indigo-600 text-lg font-semibold">Loading...</p>
    </div>
  );
}
