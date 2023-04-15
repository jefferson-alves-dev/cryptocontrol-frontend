import { requestServerSideAPI } from '@/services/fetchServerSide';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Router from 'next/router';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Login.module.css';

const Login: NextPage = () => {
  const { signIn } = useContext(AuthContext);

  const [errorRequestLogin, setErrorRequestLogin] = useState('');

  const inputEmail = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);

  async function handleSignIn(event: React.FormEvent) {
    event.preventDefault();
    if (inputEmail.current && inputPassword.current) {
      if (await signIn(inputEmail.current.value, inputPassword.current.value)) {
        Router.push('/dashboard');
      }
    }
  }

  return (
    <main className={styles.container}>
      <section className={styles.loginContainer}>
        <form onSubmit={handleSignIn} className={styles.loginForm}>
          <div className={styles.formHead}>
            {errorRequestLogin && <span>{errorRequestLogin}</span>}
            <h1>Login</h1>
          </div>
          <div className={styles.formBody}>
            <div className={styles.formGroup}>
              <label>Endereço de E-mail</label>
              <input
                type="email"
                name="email"
                required
                placeholder="Insira o endereço de e-email..."
                ref={inputEmail}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Senha</label>
              <input
                type="password"
                name="password"
                required
                placeholder="Insira sua senha..."
                ref={inputPassword}
              />
            </div>
          </div>
          <div className={styles.formFooter}>
            <input
              type="submit"
              value="Entrar"
              className={styles.inputSubmit}
            />
            <h3>OU</h3>
            <div className={styles.socialInputGroup}>
              <input
                type="submit"
                value="Fazer login com Google"
                className={styles.inputGoogleLogin}
              />
              <input
                type="submit"
                value="Fazer login com Facebook"
                className={styles.inputFacebookLogin}
                disabled
              />
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { accessToken } = context.req.cookies;

  if (accessToken) {
    const requestServer = requestServerSideAPI(context);
    const response = await requestServer.post('/auth/checkToken');
    const { status } = response.data;
    console.log(status);

    if (status === true) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
};

export default Login;
