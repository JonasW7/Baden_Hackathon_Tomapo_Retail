import Counter from "@organisms/Counter";

export default function HomePage() {
  return (
    <>
      <div className="flex flex-col ">
        <h1 className="text-2xl font-bold mb-4">Cypress Test Page</h1>
        <Counter />
      </div>
    </>
  );
}