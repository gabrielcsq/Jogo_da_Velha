import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const emptyBoard = Array(9).fill("");
  const [board, setboard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState("O");
  const [winner, setWinner] = useState(null);

  const handleCelllClick = (index) => {
    if (winner) {
      console.log("Jogo finalizado.");
      return null;

    }
    if (board[index] !== "") {
      console.log("Posição ocupada.");
      return null;
    }
    setboard(
      board.map((item, itemIndex) =>
        itemIndex === index ? currentPlayer : item));

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  const checkwinner = () => {
    const possibleWaysToWin = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ]

    possibleWaysToWin.forEach(cells => {
      if (cells.every(cell => cell === "O")) setWinner("O");
      if (cells.every(cell => cell === "X")) setWinner("X");
    });

    checkDraw();
  }

  const checkDraw = () => {
    if (board.every(item => item !== "")) {
      setWinner("D");
    }
  }

  useEffect(checkwinner, [board]);

  const resetGame = () => {
    setCurrentPlayer("O");
    setboard(emptyBoard);
    setWinner(null);
  }
  return (
    <main>
      <h1 className="titulo">TIC-TAC-TOE</h1>

      <div className={`board`}>
        {board.map((item, index) => (
          <div
            key={index}
            className={`cell ${item}`}
            onClick={() => handleCelllClick(index)}
          >
            {item}
          </div>
        ))}
      </div>

      {winner &&
        <footer>
          {winner === "D" ?
            <h2 className="winner-message">
              <span className={winner}>DRAW :/</span>
            </h2>
            :
            <h2 className="winner-message">
              <span className={winner}>{winner}</span> WINS :D
            </h2>
          }
          <button onClick={resetGame}>START OVER</button>
        </footer>
      }
    </main>
  );
}

export default App;
