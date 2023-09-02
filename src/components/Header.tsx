import HeaderStyles from '../styles/Header.module.scss';

function Header () {
  return (
    <header className={HeaderStyles.header}>
      <div className={HeaderStyles.container}>
        <span className={HeaderStyles.heading}>ToDo</span>
        <img className={HeaderStyles.hamburger} src="hamburger.svg" alt="" />
      </div>
    </header>
  )
}

export default Header;
