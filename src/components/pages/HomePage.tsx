import Counter from "@organisms/Counter";
import { Button } from "@atoms/button";

export default function HomePage() {
  return (
    <>
      <div className="flex flex-col ">
        <h1 className="text-2xl font-bold mb-4">Home Page</h1>
        <Counter />
        <Button> Click Me </Button>
      </div>
    </>
  );
}
