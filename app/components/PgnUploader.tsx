"use client"
import { useState } from "react";
import { Chess } from "chess.js";

interface PgnUploaderProps {
    onFenUpdate: (fen: string) => void;
}

const PgnUploader: React.FC<PgnUploaderProps> = ({ onFenUpdate }) => {
    const [game] = useState(new Chess());

    const handlePgnUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const pgn = e.target?.result as string;
            game.loadPgn(pgn);
            onFenUpdate(game.fen()); // Pass final FEN position
        };
        reader.readAsText(file);
    };

    return (
        <div>
            <input title="pgnUploader" type="file" onChange={handlePgnUpload} accept=".pgn" />
        </div>
    );
};

export default PgnUploader;