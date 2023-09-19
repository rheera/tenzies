import "./scss/App.scss";

function App() {
  return (
    <>
      <main>
        <h1>Tenzies</h1>
        <h2>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </h2>
        <section>Dice</section>
        <button className="rollButton">Roll</button>
      </main>
    </>
  );
}

export default App;
