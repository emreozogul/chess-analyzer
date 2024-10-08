"use client";

import { useEffect, useState } from "react";

interface StockfishAnalysisProps {
    fen: string;
}

const StockfishAnalysis: React.FC<StockfishAnalysisProps> = ({ fen }) => {
    const [evaluation, setEvaluation] = useState<string>('');
    const [bestMove, setBestMove] = useState<string>('');

    useEffect(() => {
        let stockfish: Worker | null = null;

        if (typeof window !== 'undefined') {
            stockfish = new Worker('/lib/engine/stockfish-nnue-16.js');

            stockfish.onmessage = (event: MessageEvent) => {
                const message = event.data;
                console.log(message);

                if (typeof message === 'string') {
                    if (message.startsWith('info') && message.includes('score cp')) {
                        const scoreMatch = message.match(/score cp (-?\d+)/);
                        if (scoreMatch) {
                            const score = parseInt(scoreMatch[1]) / 100;
                            setEvaluation(score.toFixed(2));
                        }
                    } else if (message.startsWith('bestmove')) {
                        const bestMoveMatch = message.match(/bestmove (\S+)/);
                        if (bestMoveMatch) {
                            setBestMove(bestMoveMatch[1]);
                        }
                    }
                }
            };

            stockfish.postMessage('uci');
            stockfish.postMessage('isready');
            stockfish.postMessage(`position fen ${fen}`);
            stockfish.postMessage('go depth 15');
        }

        return () => {
            if (stockfish) {
                stockfish.postMessage('quit');
                stockfish.terminate();
            }
        };
    }, [fen]);

    return (
        <div>
            <h2>Stockfish Analysis</h2>
            <p>Evaluation: {evaluation}</p>
            <p>Best Move: {bestMove}</p>
        </div>
    );
};

export default StockfishAnalysis;