import styles from './NavExtension.module.css';

type NavExtensionProps = {
  title: string;
  subtitle: string;
};

export default function NavExtension({ title, subtitle }: NavExtensionProps) {
  return (
    <div className={styles.nav_extension_container}>
      <h2>{title}</h2>
      <h3>{subtitle}</h3>
    </div>
  );
}
