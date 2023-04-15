import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AiFillMinusSquare, AiFillPlusSquare } from 'react-icons/ai';
import { IoExitSharp } from 'react-icons/io5';
import { RiDashboardFill, RiWallet3Fill } from 'react-icons/ri';
import BlueLogo from '../../../public/BlueLogo.svg';
import HamburguerMenu from '../HamburguerMenu';
import styles from './Aside.module.css';

export default function Aside() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <>
      <HamburguerMenu isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />
      <aside
        className={`${styles.aside} ${(isOpenMenu && styles.open_menu) || ''}`}
      >
        <div className={styles.aside_container_logo}>
          <Image src={BlueLogo} alt="Logomarca Crypto Control" />
          <h1>Crypto Control</h1>
        </div>
        <div className={styles.aside_container_menu}>
          <ul>
            <li>
              <Link href="/dashboard">
                <RiDashboardFill />
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/wallets">
                <RiWallet3Fill />
                Carteiras
              </Link>
            </li>
            <li>
              <Link href="/contributions">
                <AiFillPlusSquare />
                Aportes
              </Link>
            </li>
            <li>
              <Link href="/withdrawals">
                <AiFillMinusSquare />
                Retiradas
              </Link>
            </li>
            <li>
              <Link href="/logout">
                <IoExitSharp />
                Sair
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
