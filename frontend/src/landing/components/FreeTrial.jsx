import PropTypes from "prop-types";
import styles from "./FreeTrial.module.css";

const FreeTrial = ({ className = "" }) => {
  return (
    <section className={[styles.freeTrial, className].join(" ")}>
      <div className={styles.heading}>
        <div className={styles.textBlock}>
          <h1 className={styles.tryWhitepaceToday}>Try Whitepace today</h1>
          <div className={styles.getStartedForContainer}>
            <p className={styles.getStartedFor}>Get started for free.</p>
            <p className={styles.getStartedFor}>
              Add your whole team as your needs grow.
            </p>
          </div>
        </div>
        <button className={styles.btnTry}>
          <div className={styles.tryTaskeyFree}>Try Taskey free</div>
          <div className={styles.icon}>
            <img className={styles.iconChild} alt="" src="/group-214.svg" />
          </div>
        </button>
        <div className={styles.onABig}>On a big team? Contact sales</div>
        <div className={styles.appIcon}>
          <img
            className={styles.appleBlackLogo2Icon}
            loading="lazy"
            alt=""
            src="/appleblacklogo-2.svg"
          />
          <img
            className={styles.appleBlackLogo2Icon}
            loading="lazy"
            alt=""
            src="/windowslogo-1.svg"
          />
          <img
            className={styles.appleBlackLogo2Icon}
            loading="lazy"
            alt=""
            src="/androidlogo-1.svg"
          />
        </div>
      </div>
    </section>
  );
};

FreeTrial.propTypes = {
  className: PropTypes.string,
};

export default FreeTrial;
