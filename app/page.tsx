"use client"
import ChessBoardComponent from "@/components/Chessboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";


const Home: React.FC = () => {
  const [fen, setFen] = useState("start");

  const handleFenChange = (newFen: string) => {
    setFen(newFen);
  };

  return (

    <Tabs defaultValue="analyze" className="">
      <TabsList className="p-2" >
        <TabsTrigger value="analyze">Analyze</TabsTrigger>
        <TabsTrigger value="play">Play</TabsTrigger>
      </TabsList>
      <TabsContent value="analyze">
        <div className="w-full min-h-full flex flex-col items-center justify-center">
          <ChessBoardComponent onFenChange={handleFenChange} />
        </div>

      </TabsContent>
      <TabsContent value="play">
        <div>Play content goes here</div>
      </TabsContent>
    </Tabs>
  );
};

export default Home;