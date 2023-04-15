import { requestServerSideAPI } from '@/services/fetchServerSide';
import { GetServerSideProps } from 'next';

export default function WalletsPage() {
  return <h1>Wallets Page</h1>;
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
