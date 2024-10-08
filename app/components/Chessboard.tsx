"use client"

import React, { useState } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';

interface ChessBoardComponentProps {
    onFenChange: (fen: string) => void;
}

const ChessBoardComponent: React.FC<ChessBoardComponentProps> = ({ onFenChange }) => {
    const [game] = useState(new Chess());

    const handleMove = (move: any) => {
        if (game.move(move)) {
            onFenChange(game.fen());
        }
    };

    return (
        <Chessboard
            position={game.fen()}
            onDrop={(move) =>
                handleMove({
                    from: move.sourceSquare,
                    to: move.targetSquare,
                    promotion: 'q',
                })
            }
        />
    );
};

export default ChessBoardComponent;