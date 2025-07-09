export default function TransactionTable({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Wallet</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Protocol</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {data.map(tx => (
          <tr key={tx.id}>
            <td>{tx.walletAddress.slice(0, 6)}...{tx.walletAddress.slice(-4)}</td>
            <td style={{ color: tx.type === 'buy' ? 'green' : 'red' }}>{tx.type}</td>
            <td>{parseFloat(tx.amount).toFixed(4)}</td>
            <td>{tx.protocol}</td>
            <td>{new Date(tx.timestamp).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
