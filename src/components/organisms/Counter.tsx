import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center gap-2">
      <p data-testid="count">Count: {count}</p>
      <button
        data-testid="increment"
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
        onClick={() => setCount((c) => c + 1)}
      >
        Increment
      </button>
    </div>
  );
}
