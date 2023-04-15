import styles from './HamburguerMenu.module.css';

type HamburguerMenuProps = {
  isOpenMenu: any;
  setIsOpenMenu: any;
};

export default function HamburguerMenu({
  isOpenMenu,
  setIsOpenMenu,
}: HamburguerMenuProps) {
  return (
    <div
      className={styles.hamburger_icon_container}
      onClick={() => setIsOpenMenu(!isOpenMenu)}
    >
      <span
        className={`${styles.line_one} ${
          (isOpenMenu && styles.rotate_add_45deg) || ''
        }`}
      ></span>
      <span
        className={`${styles.line_two} ${(isOpenMenu && styles.hidden) || ''}`}
      ></span>
      <span
        className={`${styles.line_three} ${
          (isOpenMenu && styles.rotate_remove_45deg) || ''
        }`}
      ></span>
    </div>
  );
}
