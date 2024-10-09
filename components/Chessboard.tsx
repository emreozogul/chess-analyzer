"use client"

import React, { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Chess, Square, PieceSymbol } from 'chess.js';
import Image from 'next/image';
import PgnViewer from './PgnViewer';

const Chessboard = dynamic(() => import('chessboardjsx'), { ssr: false });

interface ChessBoardComponentProps {
    onFenChange: (fen: string) => void;
}

const ChessBoardComponent: React.FC<ChessBoardComponentProps> = ({ onFenChange }) => {
    const [game, setGame] = useState<Chess>(new Chess());
    const [highlightSquares, setHighlightSquares] = useState<{ [square: string]: { backgroundColor: string } }>({});
    const [pendingPromotion, setPendingPromotion] = useState<{ from: Square; to: Square } | null>(null);
    const [currentPlayer, setCurrentPlayer] = useState<'w' | 'b'>('w');
    const [history, setHistory] = useState<string[]>([]);
    const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);

    const handleMove = useCallback((from: Square, to: Square) => {
        if (!game) return;

        if (game.turn() !== currentPlayer) {
            console.log("It's not your turn");
            return;
        }

        const moves = game.moves({ verbose: true });
        const promotionMove = moves.find(m => m.from === from && m.to === to && m.promotion);

        if (promotionMove) {
            setPendingPromotion({ from, to });
        } else {
            try {
                const result = game.move({ from, to });
                if (result) {
                    setGame(game);  // Set the current game state

                    // Update FEN and history
                    onFenChange(game.fen());
                    setHistory(game.history());
                    setCurrentMoveIndex(game.history().length - 1);

                    // Clear highlights and switch turn
                    setHighlightSquares({});
                    setCurrentPlayer(currentPlayer === 'w' ? 'b' : 'w');
                }
            } catch (error) {
                console.log("Invalid move");
            }
        }
    }, [game, onFenChange, currentPlayer]);

    const handlePromotion = useCallback((piece: PieceSymbol) => {
        if (!pendingPromotion || !game) return;

        const { from, to } = pendingPromotion;
        try {
            const result = game.move({ from, to, promotion: piece });
            if (result) {
                setGame(game);  // Set the current game state

                // Update FEN and history
                onFenChange(game.fen());
                setHistory(game.history());
                setCurrentMoveIndex(game.history().length - 1);

                // Clear highlights and switch turn
                setHighlightSquares({});
                setCurrentPlayer(currentPlayer === 'w' ? 'b' : 'w');
            }
        } catch (error) {
            console.log("Invalid promotion");
        }

        setPendingPromotion(null);
    }, [game, pendingPromotion, onFenChange, currentPlayer]);

    const handleMoveSelect = useCallback((index: number) => {
        const newGame = new Chess();
        for (let i = 0; i <= index; i++) {
            newGame.move(history[i]);
        }
        setGame(newGame);
        setCurrentMoveIndex(index);
        onFenChange(newGame.fen());
    }, [history, onFenChange]);

    useEffect(() => {
        setHistory(game.history());
    }, [game]);

    const highlightAvailableMoves = useCallback((square: string) => {
        if (!game) return;

        const moves = game.moves({ square: square as Square, verbose: true });
        const newSquares: { [square: string]: { backgroundColor: string } } = {};
        moves.forEach((move) => {
            newSquares[move.to] = { backgroundColor: "rgba(255, 255, 0, 0.4)" };
        });
        newSquares[square] = { backgroundColor: "rgba(255, 165, 0, 0.4)" };
        setHighlightSquares(newSquares);
    }, [game]);

    const promotionPieces: PieceSymbol[] = ['q', 'r', 'b', 'n'];

    if (!game) return null;

    return (
        <div className="flex gap-4 w-full p-12 h-full justify-center ">
            <div className="relative">
                <Chessboard
                    position={game.fen()}
                    transitionDuration={100}
                    onDrop={(move) => handleMove(move.sourceSquare as Square, move.targetSquare as Square)}
                    onSquareClick={highlightAvailableMoves}
                    squareStyles={highlightSquares}
                    width={650}

                />
                {pendingPromotion && (
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <div className="grid grid-cols-2 gap-4">
                                {promotionPieces.map((piece) => (
                                    <button
                                        type='button'
                                        title={`Promote to ${piece}`}
                                        key={piece}
                                        className="w-16 h-16 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100"
                                        onClick={() => handlePromotion(piece)}
                                    >
                                        <Image
                                            src={`/chess-pieces/${currentPlayer}${piece.toUpperCase()}.png`}
                                            alt={`${currentPlayer === 'w' ? 'White' : 'Black'} ${piece}`}
                                            width={48}
                                            height={48}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <PgnViewer
                history={history}
                currentMoveIndex={currentMoveIndex}
                onMoveSelect={handleMoveSelect}
            />
        </div>
    );
};

export default ChessBoardComponent;