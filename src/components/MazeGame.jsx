// MazeGame.jsx
import { useState, useEffect, useCallback } from 'react';

function MazeGame() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });
  const [moves, setMoves] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'completed'
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(true);

  // Crazy big mazes
  const mazes = [
    // Level 1 - 10x10 simple start
    [
      [1,1,1,1,1,1,1,1,1,1],
      [1,2,0,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,1,1,0,1],
      [1,0,1,0,0,0,0,1,0,1],
      [1,0,1,0,1,1,0,1,0,1],
      [1,0,1,0,1,3,0,1,0,1],
      [1,0,0,0,1,1,0,0,0,1],
      [1,1,1,0,0,0,0,1,1,1],
      [1,0,0,0,1,1,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1]
    ],
    // Level 2 - spiral maze 12x12
    [
      [1,1,1,1,1,1,1,1,1,1,1,1],
      [1,2,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,0,1,1,1,1,0,1],
      [1,0,0,0,1,0,1,0,0,1,0,1],
      [1,0,1,0,1,0,1,0,1,1,0,1],
      [1,0,1,0,0,0,0,0,1,0,0,1],
      [1,0,1,1,1,1,1,0,1,0,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,3,1],
      [1,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    // Level 3 - zigzag loops 12x12
    [
      [1,1,1,1,1,1,1,1,1,1,1,1],
      [1,2,0,0,1,0,0,0,0,0,0,1],
      [1,0,1,0,1,1,1,1,0,1,0,1],
      [1,0,1,0,0,0,0,1,0,1,0,1],
      [1,0,1,1,1,1,0,1,0,1,0,1],
      [1,0,0,0,0,1,0,0,0,1,0,1],
      [1,1,1,1,0,1,1,1,0,1,0,1],
      [1,0,0,0,0,0,0,1,0,0,0,1],
      [1,0,1,1,1,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,3,1],
      [1,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    // Level 4 - snake loops 14x14
    [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,2,0,0,0,0,1,0,0,0,0,0,0,1],
      [1,1,1,1,0,1,1,0,1,1,1,1,0,1],
      [1,0,0,1,0,0,0,0,0,0,0,1,0,1],
      [1,0,1,1,1,1,1,1,1,1,0,1,0,1],
      [1,0,0,0,0,0,0,0,0,1,0,1,0,1],
      [1,1,1,1,1,1,1,0,1,1,0,1,0,1],
      [1,0,0,0,0,0,1,0,0,0,0,1,0,1],
      [1,0,1,1,1,0,1,1,1,1,0,1,0,1],
      [1,0,0,0,1,0,0,0,0,1,0,0,0,1],
      [1,1,1,0,1,1,1,1,0,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,3,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    // Level 5 - loops + deadends 14x14
    [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,2,0,1,0,0,0,0,1,0,0,0,0,1],
      [1,0,0,1,0,1,1,0,1,0,1,1,0,1],
      [1,1,0,1,0,1,0,0,1,0,0,1,0,1],
      [1,0,0,0,0,1,0,1,1,1,0,1,0,1],
      [1,0,1,1,1,1,0,0,0,0,0,1,0,1],
      [1,0,0,0,0,0,1,1,1,1,0,0,0,1],
      [1,1,1,1,1,0,0,0,0,1,1,1,0,1],
      [1,0,0,0,1,1,1,0,0,0,0,1,0,1],
      [1,0,1,0,0,0,0,0,1,1,0,1,0,1],
      [1,0,1,1,1,1,1,0,0,0,0,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,3,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
  ];

  const findPlayerPosition = useCallback(() => {
    const maze = mazes[currentLevel];
    for (let y=0;y<maze.length;y++){
      for (let x=0;x<maze[y].length;x++){
        if (maze[y][x]===2) return {x,y};
      }
    }
    return {x:1,y:1};
  },[currentLevel]);

  const findExitPosition = useCallback(()=>{
    const maze = mazes[currentLevel];
    for (let y=0;y<maze.length;y++){
      for (let x=0;x<maze[y].length;x++){
        if (maze[y][x]===3) return {x,y};
      }
    }
    return {x:maze[0].length-2,y:maze.length-2};
  },[currentLevel]);

  useEffect(()=>{
    setPlayerPosition(findPlayerPosition());
    setGameStatus('playing');
    setMoves(0);
    setTime(0);
    setTimerActive(true);
  },[currentLevel, findPlayerPosition]);

  useEffect(()=>{
    let interval;
    if(timerActive) interval = setInterval(()=>setTime(prev=>prev+1),1000);
    return ()=>clearInterval(interval);
  },[timerActive]);

  useEffect(()=>{
    const handleKey = e=>{
      if(gameStatus!=='playing') return;
      let {x,y} = playerPosition;
      let newX=x,newY=y;
      switch(e.key){
        case 'ArrowUp': newY--; break;
        case 'ArrowDown': newY++; break;
        case 'ArrowLeft': newX--; break;
        case 'ArrowRight': newX++; break;
        default: return;
      }
      if(newY>=0 && newY<mazes[currentLevel].length &&
         newX>=0 && newX<mazes[currentLevel][0].length &&
         mazes[currentLevel][newY][newX]!==1){
           setPlayerPosition({x:newX,y:newY});
           setMoves(moves+1);
           const exitPos=findExitPosition();
           if(newX===exitPos.x && newY===exitPos.y){
             setGameStatus('won');
             setTimerActive(false);
           }
         }
    };
    window.addEventListener('keydown',handleKey);
    return ()=>window.removeEventListener('keydown',handleKey);
  },[playerPosition,gameStatus,moves,currentLevel,findExitPosition]);

  const renderCell = (cell,x,y)=>{
    const isPlayer = playerPosition.x===x && playerPosition.y===y;
    const isExit = !isPlayer && cell===3;
    let className='w-5 h-5 md:w-6 md:h-6 flex items-center justify-center ';
    if(isPlayer) className+='bg-blue-500 rounded-full ';
    else if(isExit) className+='bg-green-500 ';
    else className+=cell===1?'bg-gray-800 ':'bg-gray-200 ';
    return <div key={`${x}-${y}`} className={className}></div>;
  };

  const resetLevel = ()=>{ setPlayerPosition(findPlayerPosition()); setGameStatus('playing'); setMoves(0); setTime(0); setTimerActive(true); };
  const nextLevel = ()=>{ if(currentLevel<mazes.length-1) setCurrentLevel(currentLevel+1); else setGameStatus('completed'); };
  const formatTime = sec=>`${Math.floor(sec/60)}:${sec%60<10?'0':''}${sec%60}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-6xl">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">Crazy Maze Game</h1>
        <p className="text-center text-gray-600 mb-6">Navigate through {mazes.length} insane mazes!</p>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-semibold">Level: {currentLevel+1}/{mazes.length}</div>
              <div className="text-lg font-semibold">Moves: {moves}</div>
              <div className="text-lg font-semibold">Time: {formatTime(time)}</div>
            </div>
            <div className="bg-gray-300 p-2 rounded-lg inline-block overflow-auto max-h-[500px]">
              {mazes[currentLevel].map((row,y)=>
                <div key={y} className="flex">{row.map((cell,x)=>renderCell(cell,x,y))}</div>
              )}
            </div>
            <div className="mt-4 flex justify-center space-x-4">
              <button onClick={resetLevel} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">Reset</button>
              {currentLevel>0 && <button onClick={()=>setCurrentLevel(currentLevel-1)} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition">Prev</button>}
            </div>
          </div>
          <div className="md:w-1/3">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">How to Play</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Use arrow keys to move the blue player</li>
                <li>Reach the green exit</li>
                <li>Avoid black walls</li>
                <li>Try to finish in minimal moves and time</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Modals */}
        {gameStatus==='won' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div className="bg-white p-6 rounded-xl text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-4">Level Completed!</h2>
              <p className="mb-2">Time: {formatTime(time)}, Moves: {moves}</p>
              <div className="mt-4 flex justify-center space-x-4">
                <button onClick={resetLevel} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Retry</button>
                <button onClick={nextLevel} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                  {currentLevel<mazes.length-1?'Next Level':'Finish'}
                </button>
              </div>
            </div>
          </div>
        )}
        {gameStatus==='completed' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div className="bg-white p-6 rounded-xl text-center">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">You conquered all crazy mazes!</h2>
              <button onClick={()=>setCurrentLevel(0)} className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">Play Again</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MazeGame;
