import "./scss/App.scss";
import Die from "./components/Die";

function App() {
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
        <section className="dice">
          <Die value={1} />
          <Die value={1} />
          <Die value={1} />
          <Die value={1} />
          <Die value={1} />
          <Die value={1} />
          <Die value={1} />
          <Die value={1} />
          <Die value={1} />
          <Die value={1} />
        </section>
        <button className="rollButton">Roll</button>
      </main>
    </>
  );
}

export default App;
