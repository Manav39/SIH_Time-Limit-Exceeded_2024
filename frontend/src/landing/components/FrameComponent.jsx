import PropTypes from "prop-types";
import styles from "./FrameComponent.module.css";

const FrameComponent = ({ className = "" }) => {
  return (
    <section className={[styles.heroSectionWrapper, className].join(" ")}>
      <div className={styles.heroSection}>
        <img className={styles.elementIcon} alt="" src="/element.svg" />
        <div className={styles.heading}>
          <div className={styles.textBlock}>
            <h1 className={styles.getMoreDone}>Get More Done with whitepace</h1>
            <div className={styles.projectManagementSoftware}>
              Project management software that enables your teams to
              collaborate, plan, analyze and manage everyday tasks
            </div>
          </div>
          <button className={styles.btnFreeTrial}>
            <div className={styles.tryWhitepaceFree}>Try Whitepace free</div>
            <img
              className={styles.btnFreeTrialChild}
              alt=""
              src="/group-212-1.svg"
            />
          </button>
        </div>
        <div className={styles.imageContainer} />
      </div>
    </section>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent;
