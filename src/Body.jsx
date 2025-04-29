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

//biblioteka lucide

export default function Body() {
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [points, setPoints] = useState([]);

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
  
  return (
    <div className="p-4 h-[100vh] w-[100vw] bg-black text-white">
      <h2 className="text-lg font-bold mb-4">Dodaj punkt do wykresu</h2>

      <div className="mb-4">
        <label htmlFor="x" className="mr-2">
          Podaj x:
        </label>
        <input
          type="number"
          name="x"
          id="x"
          value={x}
          onChange={(e) => setX(e.target.value)}
          className="border px-2 py-1 mr-4"
        />

        <label htmlFor="y" className="mr-2">
          Podaj y:
        </label>
        <input
          type="number"
          name="y"
          id="y"
          value={y}
          onChange={(e) => setY(e.target.value)}
          className="border px-2 py-1 mr-4"
        />

        <button
          onClick={handleAddPoint}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          Dodaj
        </button>
      </div>

      <LineChart width={600} height={300} data={points}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="x" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="y" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}
