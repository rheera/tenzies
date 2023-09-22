import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import "./scss/App.scss";
import Die from "./components/Die";

function App() {
  const randomDieNumber = () => Math.ceil(Math.random() * 6);

  const allNewDice = () => {
    let diceArr = [];
    for (let i = 0; i < 10; i++) {
      let newDie = {
        id: i,
        value: randomDieNumber(),
        isHeld: false,
      };
      diceArr.push(newDie);
    }
    return diceArr;
  };

  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const dieValue = dice[0].value;
    dice.every((die) => die.value === dieValue && die.isHeld)
      ? setTenzies(true)
      : setTenzies(false);
  }, [dice]);

  const diceElements = dice.map((die, index) => {
    return (
      <Die
        key={`die-${index}`}
        value={die.value}
        isHeld={die.isHeld}
        holdDie={() => holdDie(die.id)}
      />
    );
  });

  function holdDie(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function rollDice() {
    if (tenzies) {
      setDice(allNewDice());
      setTenzies(false);
    }
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : { ...die, value: randomDieNumber() };
      })
    );
  }

  return (
    <>
      <main>
        <div className="title-text">
          <h1>Tenzies</h1>
          <h2>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </h2>
        </div>
        <section className="dice">{diceElements}</section>
        <button className="rollButton" onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
        {tenzies && <Confetti />}
      </main>
    </>
  );
}

export default App;
