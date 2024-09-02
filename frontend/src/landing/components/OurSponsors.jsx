import PropTypes from "prop-types";
import styles from "./OurSponsors.module.css";

const OurSponsors = ({ className = "" }) => {
  return (
    <section className={[styles.ourSponsors, className].join(" ")}>
      <img className={styles.elementIcon} alt="" src="/element-9.svg" />
      <h1 className={styles.ourSponsors1}>Our sponsors</h1>
      <div className={styles.sponsors}>
        <div className={styles.apple}>
          <img
            className={styles.appleIcon}
            loading="lazy"
            alt=""
            src="/apple.svg"
          />
        </div>
        <div className={styles.microsoft}>
          <img
            className={styles.microsoft1Icon}
            loading="lazy"
            alt=""
            src="/microsoft-1.svg"
          />
        </div>
        <div className={styles.slack}>
          <img
            className={styles.microsoft1Icon}
            loading="lazy"
            alt=""
            src="/slack-technologies-logo-1.svg"
          />
        </div>
        <div className={styles.google}>
          <img
            className={styles.microsoft1Icon}
            loading="lazy"
            alt=""
            src="/group-246.svg"
          />
        </div>
      </div>
    </section>
  );
};

OurSponsors.propTypes = {
  className: PropTypes.string,
};

export default OurSponsors;
