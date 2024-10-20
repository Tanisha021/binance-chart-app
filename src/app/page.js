import { ChartContainer } from '@/components/ChartContainer';

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Crypto Chart</h1>
        <ChartContainer />
      </div>
    </main>
  );
}