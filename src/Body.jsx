import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function Body() {
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [points, setPoints] = useState([]);
  const [functionExpr, setFunctionExpr] = useState("");
  const [domainStart, setDomainStart] = useState("");
  const [domainEnd, setDomainEnd] = useState("");

  const handleAddPoint = () => {
    const xNum = parseFloat(x);
    const yNum = parseFloat(y);
    if (!isNaN(xNum) && !isNaN(yNum)) {
      const existingIndex = points.findIndex((point) => point.x === xNum);
      let newPoints;
      if (existingIndex !== -1) {
        newPoints = [...points];
        newPoints[existingIndex] = { x: xNum, y: yNum };
      } else {
        newPoints = [...points, { x: xNum, y: yNum }];
      }
      newPoints.sort((a, b) => a.x - b.x);
      setPoints(newPoints);
      setX("");
      setY("");
    }
  };

  const handlePlotFunction = () => {
    const start = parseFloat(domainStart);
    const end = parseFloat(domainEnd);
    if (isNaN(start) || isNaN(end) || start >= end || functionExpr.trim() === "") return;

    const step = (end - start) / 50; // 50 punktów
    const newPoints = [];

    for (let i = start; i <= end; i += step) {
      try {
        // UWAGA: eval tylko do testów lub środowiska lokalnego!
        const x = i;
        const y = eval(functionExpr);
        if (typeof y === "number" && isFinite(y)) {
          newPoints.push({ x: parseFloat(x.toFixed(2)), y: parseFloat(y.toFixed(2)) });
        }
      } catch (error) {
        console.error("Błąd w funkcji:", error);
        break;
      }
    }

    setPoints(newPoints);
  };

  const handleClear = () => {
    setPoints([]);
    setX("");
    setY("");
    setFunctionExpr("");
    setDomainStart("");
    setDomainEnd("");
  };

  return (
    <div className="p-4 h-[100vh] w-[100vw] bg-black text-white overflow-auto">
      <h2 className="text-lg font-bold mb-4">Dodaj punkt do wykresu</h2>

      <div className="mb-4 flex flex-wrap gap-2 items-center">
        <label htmlFor="x">x:</label>
        <input
          type="number"
          id="x"
          value={x}
          onChange={(e) => setX(e.target.value)}
          className="border border-gray-400 bg-white text-black px-2 py-1 rounded focus:outline-none focus:ring focus:ring-blue-400"
        />
        <label htmlFor="y">y:</label>
        <input
          type="number"
          id="y"
          value={y}
          onChange={(e) => setY(e.target.value)}
          className="border border-gray-400 bg-white text-black px-2 py-1 rounded focus:outline-none focus:ring focus:ring-blue-400"
        />
        <button onClick={handleAddPoint} className="bg-blue-600 px-4 py-1 rounded">
          Dodaj
        </button>
      </div>

      <h2 className="text-lg font-bold mb-4">Narysuj funkcję</h2>
      <div className="mb-4 flex flex-wrap gap-2 items-center">
        <label htmlFor="function">f(x) = </label>
        <input
          type="text"
          id="function"
          placeholder="np. x**2 + 3*x"
          value={functionExpr}
          onChange={(e) => setFunctionExpr(e.target.value)}
          className="border border-gray-400 bg-white text-black px-2 py-1 rounded focus:outline-none focus:ring focus:ring-green-400 w-[200px]"
        />
        <label>od:</label>
        <input
          type="number"
          placeholder="start"
          value={domainStart}
          onChange={(e) => setDomainStart(e.target.value)}
          className="border border-gray-400 bg-white text-black px-2 py-1 rounded focus:outline-none focus:ring focus:ring-green-400 w-[80px]"
        />
        <label>do:</label>
        <input
          type="number"
          placeholder="end"
          value={domainEnd}
          onChange={(e) => setDomainEnd(e.target.value)}
          className="border border-gray-400 bg-white text-black px-2 py-1 rounded focus:outline-none focus:ring focus:ring-green-400 w-[80px]"
        />
        <button onClick={handlePlotFunction} className="bg-green-600 px-4 py-1 rounded">
          Rysuj funkcję
        </button>
        <button onClick={handleClear} className="bg-red-600 px-4 py-1 rounded">
          Wyczyść
        </button>
      </div>

      {points.length > 0 ? (
        <LineChart
          width={600}
          height={300}
          data={points}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid stroke="#444" strokeDasharray="3 3" />
          <XAxis dataKey="x" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip contentStyle={{ backgroundColor: "#222", border: "none", color: "#fff" }} />
          <Legend />
          <Line type="monotone" dataKey="y" stroke="#00d4ff" dot={true} />
        </LineChart>
      ) : (
        <p className="mt-4 text-gray-400">Brak danych do wyświetlenia.</p>
      )}
    </div>
  );
}
