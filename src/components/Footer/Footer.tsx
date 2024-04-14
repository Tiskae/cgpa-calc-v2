import Styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={Styles.footer}>
      <p>&copy; 2024.&nbsp;</p>
      <p>
        Carefully handcrafted by <a href="https://tiskae.codes">Tiskae</a>
      </p>
    </footer>
  );
}

export default Footer;
