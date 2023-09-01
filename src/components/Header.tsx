import HeaderStyles from '../styles/Header.module.scss';

function Header () {
  return (
    <header className={HeaderStyles.header}>
      <span className={HeaderStyles.heading}>ToDo</span>
      <img className={HeaderStyles.hamburger} src="hamburger.svg" alt="" />
    </header>
  )
}

export default Header;
