import PropTypes from "prop-types";
import styles from "./Header.module.css";

const Header = ({ className = "" }) => {
  return (
    <header className={[styles.header, className].join(" ")}>
      <div className={styles.logoWrapper}>
        <div className={styles.logo}>
          <div className={styles.logoIconWrapper}>
            <img
              className={styles.logoIcon}
              loading="lazy"
              alt=""
              src="/logo-icon.svg"
            />
          </div>
          <a className={styles.whitepace}>Report.ai</a>
        </div>
      </div>
      <div className={styles.menu}>
        <div className={styles.navMenu}>
          <div className={styles.products}>
            <a className={styles.products1}>Products</a>
            <div className={styles.downArrow}>
              <img className={styles.vectorIcon} alt="" src="/vector.svg" />
            </div>
          </div>
          <div className={styles.solutios}>
            <a className={styles.solutions}>Solutions</a>
            <div className={styles.downArrow}>
              <img className={styles.vectorIcon} alt="" src="/vector.svg" />
            </div>
          </div>
          <div className={styles.solutios}>
            <a className={styles.resources1}>Resources</a>
            <div className={styles.downArrow}>
              <img className={styles.vectorIcon} alt="" src="/vector.svg" />
            </div>
          </div>
          <div className={styles.products}>
            <a className={styles.pricing1}>Pricing</a>
            <div className={styles.downArrow}>
              <img className={styles.vectorIcon} alt="" src="/vector.svg" />
            </div>
          </div>
        </div>
        <div className={styles.btn}>
          <button className={styles.btnLogin}>
            <a className={styles.login}>Login</a>
          </button>
          <button className={styles.btnFreeTrial}>
            <a className={styles.tryWhitepaceFree}>Try Whitepace free</a>
            <div className={styles.icon}>
              <img className={styles.iconChild} alt="" src="/group-212.svg" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
