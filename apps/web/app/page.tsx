import TestCard from '@components/shared/Card/TestCard';

export default function Page(): JSX.Element {
  return (
    <main>
      <div>
        <h2 className="bg-red-400">Hello from web</h2>
        <TestCard />
      </div>
    </main>
  );
}
