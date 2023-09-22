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
  const [rolls, setRolls] = useState(0);

  const best = localStorage.getItem("best-rolls") || 9999;

  useEffect(() => {
    const dieValue = dice[0].value;
    dice.every((die) => die.value === dieValue && die.isHeld)
      ? setTenzies(true)
      : null;
  }, [dice]);

  useEffect(() => {
    if (tenzies) {
      rolls < best ? localStorage.setItem("best-rolls", rolls) : null;
    }
  }, [tenzies]);

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
      setRolls(0);
    } else {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : { ...die, value: randomDieNumber() };
        })
      );
      setRolls((prevRolls) => prevRolls + 1);
    }
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
        <div className="rolls">
          <h3 className="rolls__best">Best: {best >= 9999 ? "∞" : best}</h3>
          <h3 className="rolls__current">Rolls: {rolls} </h3>
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
