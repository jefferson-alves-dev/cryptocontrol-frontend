import ContentContainer from '@/components/ContentContainer';
import NavExtension from '@/components/NavExtension';
import Main from '@/components/layout/Main';
import { requestClientSideAPI } from '@/services/fetchClientSide';
import { requestServerSideAPI } from '@/services/fetchServerSide';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Wallet = {
  name: string;
  createdAt: string;
};

export default function WalletIdPage() {
  const router = useRouter();
  const { walletId } = router.query;

  const [wallet, setWallet] = useState<Wallet>({ name: '', createdAt: '' });

  useEffect(() => {
    const getWallet = async () => {
      const response = await requestClientSideAPI.get(
        `/wallet/${Number(walletId)}`
      );
      setWallet(response.data);
    };
    getWallet();
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
        <NavExtension title={wallet?.name} subtitle={wallet?.createdAt} />
        <ContentContainer>Olá</ContentContainer>
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
