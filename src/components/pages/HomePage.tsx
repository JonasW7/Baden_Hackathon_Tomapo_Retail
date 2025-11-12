import Counter from "@/components/organisms/Counter";

function HomePage() {
  return (
    <>
      <div className="flex flex-col ">
        <h1 className="text-2xl font-bold mb-4">Cypress Test Page</h1>
        <Counter />
      </div>
    </>
  );
}

export default HomePage;
