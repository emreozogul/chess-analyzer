import React from 'react';
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
interface PgnViewerProps {
    history: string[];
    currentMoveIndex: number;
    onMoveSelect: (index: number) => void;
}

const PgnViewer: React.FC<PgnViewerProps> = ({ history, currentMoveIndex, onMoveSelect }) => {
    return (
        <Card className='flex flex-col w-1/2 bg-mixed-a0'>
            <ScrollArea className="ml-4 p-4 h-full w-full overflow-y-auto flex-1" >
                <h3 className="text-lg font-bold mb-2">Move History</h3>
                <div className="grid grid-cols-2 gap-2 p-2">
                    {history.map((move, index) => (
                        <button
                            type='button'
                            key={index}
                            className={`text-left px-2 py-1 rounded ${index === currentMoveIndex ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 text-black'
                                }`}
                            onClick={() => onMoveSelect(index)}
                        >
                            {index % 2 === 0 ? `${Math.floor(index / 2) + 1}.` : ''} {move}
                        </button>
                    ))}
                </div>
            </ScrollArea>
            <div className='flex flex-row justify-center gap-2'>
                <Button >
                    <ChevronFirst />
                </Button>
                <Button>
                    <ChevronLeft />
                </Button>
                <Button>
                    <ChevronRight />
                </Button>
                <Button>
                    <ChevronLast />
                </Button>
                <Button>
                    <RotateCcw />
                </Button>
            </div>
        </Card>
    );
};

export default PgnViewer;