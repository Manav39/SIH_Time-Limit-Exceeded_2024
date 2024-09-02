import PropTypes from "prop-types";
import styles from "./YourWork.module.css";

const YourWork = ({ className = "" }) => {
  return (
    <section className={[styles.yourWork, className].join(" ")}>
      <div className={styles.heading}>
        <div className={styles.textBlock}>
          <img className={styles.elementIcon} alt="" src="/element-6.svg" />
          <h1 className={styles.yourWorkEverywhere}>
            Your work, everywhere you are
          </h1>
          <div className={styles.accessYourNotes}>
            Access your notes from your computer, phone or tablet by
            synchronising with various services, including whitepace, Dropbox
            and OneDrive. The app is available on Windows, macOS, Linux, Android
            and iOS. A terminal app is also available!
          </div>
        </div>
        <button className={styles.btnTry}>
          <img
            className={styles.backgroundIcon}
            alt=""
            src="/background@2x.png"
          />
          <div className={styles.tryTaskey}>Try Taskey</div>
          <div className={styles.icon}>
            <img className={styles.iconChild} alt="" src="/group-214.svg" />
          </div>
        </button>
      </div>
    </section>
  );
};

YourWork.propTypes = {
  className: PropTypes.string,
};

export default YourWork;
