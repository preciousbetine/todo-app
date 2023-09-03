import HeaderStyles from '../styles/Header.module.scss';

function Header () {
  return (
    <header className={HeaderStyles.header}>
      <div className={HeaderStyles.container}>
        <div className={HeaderStyles.logo}>
          <img src="logo.svg" alt="" />
          <span className={HeaderStyles.heading}>ToDo</span>
        </div>
        <img className={HeaderStyles.hamburger} src="hamburger.svg" alt="" />
      </div>
    </header>
  )
}

export default Header;
