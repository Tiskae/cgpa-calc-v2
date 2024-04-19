import Styles from "./Header.module.scss";

function Header() {
  return (
    <header className={Styles.header}>
      <div className={Styles.header__content}>
        <h1 className={Styles.header__text}>CGPA-CALC</h1>
      </div>
    </header>
  );
}

export default Header;
