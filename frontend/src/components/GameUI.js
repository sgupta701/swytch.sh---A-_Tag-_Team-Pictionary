// frontend/src/components/GameUI.js

import React from 'react';

const GameUI = ({ totalTime, relayTime, currentWord, myHint, maskedWord, gameState, username, isHost, roomId, socket }) => {
    const d1Name = gameState?.drawer1?.username || "Player 1";
    const d2Name = gameState?.drawer2?.username || "Player 2";

    let mainWord = "_ _ _ _ _ _";
    let subHint = "";

    if (currentWord) {
        mainWord = currentWord.split('').join(' '); 
    } else if (maskedWord) {
        mainWord = maskedWord; 
        if (myHint) {
            subHint = `(${myHint.toLowerCase()})`;
        }
    }

    return (
        <div className="w-full max-w-4xl flex flex-col gap-1 relative -mt-8">

            <div className="bg-gray-800 text-white py-2 px-4 rounded-t-xl flex justify-between items-center">
                <div className="text-lg font-bold w-1/4">
                    ROUND {gameState?.currentRound} / {gameState?.totalRounds}
                </div>

                <div className="flex gap-4 justify-center w-2/4">
                    <div className={`px-4 py-1 rounded border-2 ${gameState?.activeDrawer === gameState?.drawer1?.id ? 'border-yellow-400 bg-gray-700' : 'border-transparent'}`}>
                        {d1Name} {gameState?.activeDrawer === gameState?.drawer1?.id && "✏️"}
                    </div>
                    <span className="text-blue-400 font-black">&</span>
                    <div className={`px-4 py-1 rounded border-2 ${gameState?.activeDrawer === gameState?.drawer2?.id ? 'border-yellow-400 bg-gray-700' : 'border-transparent'}`}>
                        {d2Name} {gameState?.activeDrawer === gameState?.drawer2?.id && "✏️"}
                    </div>
                </div>

                <div className="flex items-center justify-end gap-4 w-1/4">
                    <div className="text-2xl font-mono text-yellow-400 font-black">
                        {totalTime}s
                    </div>
                    {isHost && (
                        <button 
                            onClick={() => socket.emit('end_game_early', roomId)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg border border-red-400 font-bold uppercase text-xs transition-colors shadow-lg"
                        >
                            End
                        </button>
                    )}
                </div>
            </div>
            
            <div className="bg-white p-1 text-center border-2 border-gray-300 rounded-b-lg flex flex-col items-center justify-center min-h-[50px]">
                <p className="tracking-[0.3em] font-black text-2xl uppercase">
                    {mainWord}
                </p>
                {subHint && (
                    <p className="text-sm font-bold text-gray-500 mt-1 tracking-widest">
                        {subHint}
                    </p>
                )}
            </div>
        </div>
    );
};

export default GameUI;