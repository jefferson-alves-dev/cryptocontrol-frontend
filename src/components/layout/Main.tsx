import Aside from './Aside';
import styles from './Main.module.css';
import Nav from './Nav';
type LayoutProps = { children?: React.ReactNode };
export default function Main({ children }: LayoutProps) {
  return (
    <main className={styles.container}>
      <Aside />
      <Nav />

      <section className={styles.main_section}>{children}</section>
    </main>
  );
}
