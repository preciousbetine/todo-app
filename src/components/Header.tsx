import { useState } from 'react';
import MobileMenu from './MobileMenu';
import HeaderStyles from '../styles/Header.module.scss';

function Header () {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <header className={HeaderStyles.header}>
      <MobileMenu open={menuOpen} setMenuOpen={setMenuOpen} />
      <div className={HeaderStyles.container}>
        <div className={HeaderStyles.logo}>
          <img src="logo.svg" alt="" />
          <span className={HeaderStyles.heading}>ToDo</span>
        </div>
        <button
          type="button"
          className={HeaderStyles['menu-btn']}
          onClick={() => {
            setMenuOpen(true);
          }}
        >
          <img className={HeaderStyles.hamburger} src="hamburger.svg" alt="" />
        </button>
        <nav>
          <div className={HeaderStyles.tools}>
            <img src="settings.svg" alt="" />
            <img src="bell-outline.svg" alt="" />
          </div>
          <img className={HeaderStyles.avatar} src="avatar.png" alt="" />
        </nav>
      </div>
    </header>
  )
}

export default Header;
