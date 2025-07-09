export default function Summary({ buys, sells }) {
  const net = buys - sells;

  return (
    <div>
      <h2>Net Direction: {net > 0 ? 'Buy Heavy 🟢' : net < 0 ? 'Sell Heavy 🔴' : 'Neutral ⚪'}</h2>
      <p>Total Buys: {buys} | Total Sells: {sells}</p>
    </div>
  );
}
