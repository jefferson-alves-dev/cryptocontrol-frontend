'use client';
import styles from './Dashboard.module.css';

import { requestServerSideAPI } from '@/services/fetchServerSide';
import { GetServerSideProps } from 'next';

import { requestClientSideAPI } from '@/services/fetchClientSide';
import getPrice from '@/utils/basePricesFiatCoins';
import formatDateTime from '@/utils/dateTimeFormat';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaEye, FaMinusSquare, FaPlusSquare } from 'react-icons/fa';
import ContentContainer from '../../components/ContentContainer';
import NavExtension from '../../components/NavExtension';
import Table from '../../components/Table';
import Main from '../../components/layout/Main';

type Wallets = any;
type Contributions = any;

export default function Dashboard() {
  const [wallets, setWallets] = useState<Wallets | ''>('');
  const [contributions, setContributions] = useState<Contributions | ''>('');

  useEffect(() => {
    const getData = async () => {
      const response = await requestClientSideAPI.get(
        '/portfolio/portfolio-balance/2783'
      );
      setWallets(response.data);

      const [responsePortfolio, responseContributions] = await Promise.all([
        requestClientSideAPI.get('/portfolio/portfolio-balance/2783'),
        requestClientSideAPI.get('/contribution/all'),
      ]);

      setWallets(responsePortfolio.data);
      setContributions(responseContributions.data);
    };
    getData();
  }, []);

  return (
    <>
      <Head>
        <title>Crypto Control - Dashboard</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
      </Head>
      <Main>
        <NavExtension
          title="Balanço Total"
          subtitle={`${wallets?.totalBalance}`}
        />
        <ContentContainer>
          <Table
            theadColumns={[
              'Nome',
              'Qtd. aportes',
              'Qtd. retiradas',
              'Total aportado',
              'Lucro',
              'Balanço atual',
              'Ações',
            ]}
            tbodyData={wallets?.wallets?.map((wallet: any) => (
              <tr key={wallet.id}>
                <td>{wallet?.name}</td>
                <td>{wallet?.Contributions?.length}</td>
                <td>{wallet?.Withdrawals?.length}</td>
                <td>{wallet.totalSumContributionsWallet}</td>
                <td>{wallet.walletProfit}</td>
                <td>{wallet.realBalanceWallet}</td>
                <td>
                  <div className={styles.container_actions_table}>
                    <Link href={`/wallets/${wallet.id}`}>
                      <FaEye /> Detalhes
                    </Link>
                    <Link href={`/wallets/${wallet.id}`}>
                      <FaPlusSquare /> Aporte
                    </Link>
                    <Link href={`/wallets/${wallet.id}`}>
                      <FaMinusSquare /> Retirada
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          />
          <Table
            theadColumns={[
              'Carteira',
              'Moeda de compra',
              'Preço moeda de compra',
              'Moeda aportada',
              'Preço moeda',
              'Taxa aporte',
              'Total aportado',
              'Qtd. moedas',
              'Data aporte',
              'Ações',
            ]}
            tbodyData={contributions?.contributions?.map(
              (contribution: any) => (
                <tr key={contribution.id}>
                  <td>{contribution?.walletId}</td>
                  <td>{contribution?.contributionSymbol}</td>
                  <td>{getPrice(2783, contribution?.basePricesFiatCoins)}</td>
                  <td>
                    {contribution.coinName} ({contribution.coinSymbol})
                  </td>
                  <td>{contribution.coinPrice}</td>
                  <td>{contribution.brokerFee}</td>
                  <td>{contribution.amountContribution}</td>
                  <td>{contribution.amountCoins}</td>
                  <td>{formatDateTime(contribution.createdAt)}</td>
                  <td>
                    <div className={styles.container_actions_table}>
                      <Link href={`/contribution/${contribution.id}`}>
                        <FaEye /> Detalhes
                      </Link>
                    </div>
                  </td>
                </tr>
              )
            )}
          />
        </ContentContainer>
      </Main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { accessToken } = context.req.cookies;

  if (!accessToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const requestServer = requestServerSideAPI(context);
  const response = await requestServer.post('/auth/checkToken');
  const { status } = response.data;

  if (status !== true) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
