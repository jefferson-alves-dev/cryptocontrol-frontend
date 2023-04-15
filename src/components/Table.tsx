import styles from './Table.module.css';

// type Wallet = {
//   id: number;
//   name: string;
//   Contributions: any[]; // Substitua 'any[]' pelo tipo apropriado do array 'Contributions'
//   totalSumContributionsWallet: number;
//   walletProfit: number;
//   realBalanceWallet: number;
// };

type TableProps = {
  title?: string;
  theadColumns: string[];
  //   tbodyData: Wallet[]; // Substitua 'Wallet[]' pelo tipo apropriado do array 'tbodyData'
  tbodyData: any;
  actionButton?: object[];
};

export default function Table({
  theadColumns,
  tbodyData,
  actionButton,
  title,
}: TableProps) {
  return (
    <div className={styles.table_container}>
      {title && <h2>title</h2>}
      <table className={styles.table}>
        <thead>
          <tr>
            {theadColumns.map((name) => (
              <th key={name}>{name}</th>
            ))}
            {(actionButton && <td>Ações</td>) || ''}
          </tr>
        </thead>
        <tbody>{tbodyData}</tbody>
      </table>
    </div>
  );
}
