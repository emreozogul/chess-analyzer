"use client"
import ChessBoardComponent from "@/components/Chessboard";
import { useState } from "react";


const Home: React.FC = () => {
  const [fen, setFen] = useState("start");

  const handleFenChange = (newFen: string) => {
    setFen(newFen);
  };

  return (
    <div className="w-full  min-h-full flex flex-col items-center justify-center">
      <ChessBoardComponent onFenChange={handleFenChange} />
    </div>
  );
};

export default Home;