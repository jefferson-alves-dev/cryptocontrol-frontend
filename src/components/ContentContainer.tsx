import styles from './ContentContainer.module.css';
type LayoutProps = { children?: React.ReactNode };

export default function ContentContainer({ children }: LayoutProps) {
  return <div className={styles.content_container}>{children}</div>;
}
