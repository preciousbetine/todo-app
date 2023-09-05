import Styles from '../styles/MobileMenu.module.scss';

export default function MobileMenu({ open, setMenuOpen } : { open: boolean, setMenuOpen: (state: boolean) => void }) {
  return (
    <div className={`${Styles['mobile-menu']} ${open ? Styles.open : Styles.close}`}>
      <div className={Styles['mobile-menu__top']}>
        <div className={Styles['mobile-menu__item'] + ' ' + Styles['close-btn']}>
          <button onClick={() => {
            setMenuOpen(false);
          }}>
            <img src="close.svg" alt="" />
          </button>
        </div>
        <a href="#" className={Styles['mobile-menu__item']}>
          <img src="bell-outline.svg" alt="" />
          <span>Notifications</span>
        </a>
        <a href="#" className={Styles['mobile-menu__item']}>
          <img src="settings.svg" alt="" />
          <span>Settings</span>
        </a>
      </div>
      <div className={Styles['mobile-menu__bottom']}>
        <a href="#" className={Styles['mobile-menu__item']}>
          <img className={Styles.avatar} src="avatar.png" alt="" />
          <span>My Account</span>
        </a>
      </div>
    </div>
  )
}
