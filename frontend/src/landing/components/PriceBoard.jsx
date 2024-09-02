import PropTypes from "prop-types";
import styles from "./PriceBoard.module.css";

const PriceBoard = ({ className = "", free, planSubtitles }) => {
  return (
    <div className={[styles.priceBoard, className].join(" ")}>
      <div className={styles.textBlock01}>
        <div className={styles.free}>{free}</div>
        <b className={styles.planSubtitles}>{planSubtitles}</b>
        <div className={styles.captureIdeasAnd}>
          Capture ideas and find them quickly
        </div>
      </div>
      <div className={styles.bulletPoint}>
        <div className={styles.point}>
          <img className={styles.icon} loading="lazy" alt="" src="/icon.svg" />
          <div className={styles.syncUnlimitedDevices}>
            Sync unlimited devices
          </div>
        </div>
        <div className={styles.point}>
          <img className={styles.icon} alt="" src="/icon.svg" />
          <div className={styles.syncUnlimitedDevices}>
            10 GB monthly uploads
          </div>
        </div>
        <div className={styles.point}>
          <img className={styles.icon} alt="" src="/icon.svg" />
          <div className={styles.syncUnlimitedDevices}>
            200 MB max. note size
          </div>
        </div>
        <div className={styles.point3}>
          <img className={styles.icon} alt="" src="/icon.svg" />
          <div className={styles.customizeHomeDashboard}>
            Customize Home dashboard and access extra widgets
          </div>
        </div>
        <div className={styles.point}>
          <img className={styles.icon} alt="" src="/icon.svg" />
          <div className={styles.syncUnlimitedDevices}>
            Connect primary Google Calendar account
          </div>
        </div>
        <div className={styles.point3}>
          <img className={styles.icon} alt="" src="/icon.svg" />
          <div
            className={styles.customizeHomeDashboard}
          >{`Add due dates, reminders, and notifications to your tasks
 `}</div>
        </div>
      </div>
      <button className={styles.btnGetStarted}>
        <div className={styles.getStarted}>Get Started</div>
      </button>
    </div>
  );
};

PriceBoard.propTypes = {
  className: PropTypes.string,
  free: PropTypes.string,
  planSubtitles: PropTypes.string,
};

export default PriceBoard;
