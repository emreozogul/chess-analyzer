"use client"
import { useState } from "react";
import PgnUploader from "./components/PgnUploader";
import ChessBoardComponent from "./components/Chessboard";
import StockfishAnalysis from "./components/StockfishAnalysis";

const Home: React.FC = () => {
  const [fen, setFen] = useState("start");

  const handleFenChange = (newFen: string) => {
    setFen(newFen);
  };

  return (
    <div>
      <h1>Chess Game Analyzer</h1>
      <PgnUploader onFenUpdate={handleFenChange} />
      <ChessBoardComponent onFenChange={handleFenChange} />
      <StockfishAnalysis fen={fen} />
    </div>
  );
};

export default Home;