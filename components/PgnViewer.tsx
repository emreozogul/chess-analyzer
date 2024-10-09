import React from 'react';
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, RotateCcw, Save } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
interface PgnViewerProps {
    history: string[];
    currentMoveIndex: number;
    onMoveSelect: (index: number) => void;
}

const PgnViewer: React.FC<PgnViewerProps> = ({ history, currentMoveIndex, onMoveSelect }) => {

    const ACTION_BUTTONS = [
        {
            icon: ChevronFirst,
            onClick: () => {
                onMoveSelect(0);
            }
        },
        {
            icon: ChevronLeft,
            onClick: () => {
                onMoveSelect(currentMoveIndex - 1);
            }
        },
        {
            icon: ChevronRight,
            onClick: () => {
                onMoveSelect(currentMoveIndex + 1);
            }
        },
        {
            icon: ChevronLast,
            onClick: () => {
                onMoveSelect(history.length - 1);
            }
        },
        {
            icon: RotateCcw,
            onClick: () => {
                onMoveSelect(currentMoveIndex);
            }
        },
        {
            icon: Save,
            onClick: () => {
                onMoveSelect(currentMoveIndex);
            }
        },

    ]
    return (
        <Card className='flex flex-col w-1/2'>
            <ScrollArea className=" w-full  h-full overflow-y-auto flex-1 rounded-t-lg" >
                <div className='p-2'>
                    <h3 className="text-lg font-bold mb-2">Move History</h3>
                </div>
                <div className="flex flex-col bg-slate-300 h-full">
                    {history.map((move, index) => (
                        index % 2 === 0 && (
                            <div
                                key={index}
                                className={`flex items-center p-1 ${Math.floor(index / 2) % 2 === 0 ? 'bg-slate-300' : 'bg-slate-400'}`}
                            >
                                <span className="w-8 text-gray-700 font-semibold">{Math.floor(index / 2) + 1}.</span>
                                <button
                                    type='button'
                                    className={`w-24 text-left px-2 py-1 rounded ${index === currentMoveIndex ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                                    onClick={() => onMoveSelect(index)}
                                >
                                    {move}
                                </button>
                                {history[index + 1] && (
                                    <button
                                        type='button'
                                        className={`w-24 text-left px-2 py-1 rounded ml-2 ${index + 1 === currentMoveIndex ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                                        onClick={() => onMoveSelect(index + 1)}
                                    >
                                        {history[index + 1]}
                                    </button>
                                )}
                            </div>
                        )
                    ))}
                </div>
            </ScrollArea>
            <div className='flex flex-row justify-center gap-2 bg-slate-400 rounded-b-lg p-2'>
                {ACTION_BUTTONS.map((button, index) => (
                    <Button key={index} onClick={button.onClick}>
                        <button.icon />
                    </Button>
                ))}
            </div>
        </Card>
    );
};

export default PgnViewer;