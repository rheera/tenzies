import "../scss/Die.scss";

export default function Die(props) {
  return (
    <div
      className={`die ${props.isHeld ? "die--isHeld" : ""}`}
      onClick={props.holdDie}
    >
      <span className="die__number">{props.value}</span>
    </div>
  );
}
