import PropTypes from "prop-types";
import styles from "./FrameComponent1.module.css";

const FrameComponent1 = ({ className = "" }) => {
  return (
    <section
      className={[styles.projectManagementParentWrapper, className].join(" ")}
    >
      <div className={styles.projectManagementParent}>
        <div className={styles.projectManagementContentParent}>
          <div className={styles.projectManagementContent}>
            <div className={styles.frameParent}>
              <div className={styles.managementTitleContentParent}>
                <div className={styles.managementTitleContent}>
                  <img
                    className={styles.elementIcon}
                    alt=""
                    src="/element-1@2x.png"
                  />
                  <h1 className={styles.projectManagement}>
                    Project Management
                  </h1>
                </div>
                <div className={styles.imagesVideosPdfs}>
                  Images, videos, PDFs and audio files are supported. Create
                  math expressions and diagrams directly from the app. Take
                  photos with the mobile app and save them to a note.
                </div>
              </div>
              <button className={styles.btnGetStarted}>
                <div className={styles.getStarted}>Get Started</div>
                <div className={styles.btnGetStartedInner}>
                  <img
                    className={styles.frameChild}
                    alt=""
                    src="/group-214.svg"
                  />
                </div>
              </button>
            </div>
          </div>
          <div className={styles.imageContainer} />
        </div>
        <div className={styles.content}>
          <img
            className={styles.workTogetherImage}
            loading="lazy"
            alt=""
            src="/work-together-image@2x.png"
          />
          <div className={styles.headline}>
            <div className={styles.textBlock}>
              <img
                className={styles.elementIcon1}
                alt=""
                src="/element-2.svg"
              />
              <h1 className={styles.workTogether}>Work together</h1>
              <div className={styles.withWhitepaceShare}>
                With whitepace, share your notes with your colleagues and
                collaborate on them. You can also publish a note to the internet
                and share the URL with others.
              </div>
            </div>
            <button className={styles.btnGetStarted1}>
              <div className={styles.tryItNow}>Try it now</div>
              <div className={styles.icon}>
                <img className={styles.iconChild} alt="" src="/group-214.svg" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

FrameComponent1.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent1;
