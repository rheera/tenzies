import "../scss/Die.scss";

export default function Die(props) {
  return (
    <div className="die">
      <span className="die__number">{props.value}</span>
    </div>
  );
}
