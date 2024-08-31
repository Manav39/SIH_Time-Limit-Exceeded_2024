import PropTypes from "prop-types";
import styles from "./ProductLink.module.css";

const ProductLink = ({ className = "" }) => {
  return (
    <section className={[styles.productLink, className].join(" ")}>
      <div className={styles.apps}>
        <img className={styles.elementIcon} alt="" src="/element-10.svg" />
        <img
          className={styles.appsIcon}
          loading="lazy"
          alt=""
          src="/apps.svg"
        />
        <div className={styles.heading}>
          <div className={styles.textBlock}>
            <h1 className={styles.workWithYour}>
              Work with Your Favorite Apps Using whitepace
            </h1>
            <div className={styles.whitepaceTeamsUp}>
              Whitepace teams up with your favorite software. Integrate with
              over 1000+ apps with Zapier to have all the tools you need for
              your project success.
            </div>
          </div>
          <button className={styles.btnTry}>
            <div className={styles.readMore}>Read more</div>
            <div className={styles.icon}>
              <img className={styles.iconChild} alt="" src="/group-214.svg" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

ProductLink.propTypes = {
  className: PropTypes.string,
};

export default ProductLink;
