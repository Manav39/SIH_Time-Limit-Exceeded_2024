import PropTypes from "prop-types";
import styles from "./Footer.module.css";

const Footer = ({ className = "" }) => {
  return (
    <footer className={[styles.footer, className].join(" ")}>
      <div className={styles.visualHierarchy}>
        <div className={styles.designSystem}>
          <div className={styles.accessibilityConsiderationsParent}>
            <div className={styles.accessibilityConsiderations}>
              <img className={styles.logoIcon} alt="" src="/logo-icon.svg" />
            </div>
            <h3 className={styles.whitepace}>whitepace</h3>
          </div>
          <div className={styles.whitepaceWasCreated}>
            whitepace was created for the new ways we live and work. We make a
            better workspace around the world
          </div>
        </div>
        <div className={styles.contentMarketing}>
          <div className={styles.productParent}>
            <b className={styles.product}>Product</b>
            <div className={styles.overview}>Overview</div>
            <div className={styles.pricing}>Pricing</div>
            <div className={styles.customerStories}>Customer stories</div>
          </div>
          <div className={styles.footerElements}>
            <b className={styles.resources}>Resources</b>
            <div className={styles.blog}>Blog</div>
            <div className={styles.guidesTutorials}>{`Guides & tutorials`}</div>
            <div className={styles.helpCenter}>Help center</div>
          </div>
          <div className={styles.footerElements1}>
            <b className={styles.company}>Company</b>
            <div className={styles.aboutUs}>About us</div>
            <div className={styles.careers}>Careers</div>
            <div className={styles.customerStories}>Media kit</div>
          </div>
        </div>
        <div className={styles.tryItTodayParent}>
          <h3 className={styles.tryItToday}>Try It Today</h3>
          <div className={styles.getStartedFor}>
            Get started for free. Add your whole team as your needs grow.
          </div>
          <button className={styles.btnTry}>
            <div className={styles.startToday}>Start today</div>
            <div className={styles.trialButtonIcon}>
              <img
                className={styles.trialButtonIconChild}
                alt=""
                src="/group-214.svg"
              />
            </div>
          </button>
        </div>
      </div>
      <div className={styles.btm}>
        <div className={styles.temsAndCondition}>
          <div className={styles.language}>
            <div className={styles.icon}>
              <img className={styles.groupIcon} alt="" src="/group-4.svg" />
            </div>
            <div className={styles.english}>English</div>
            <div className={styles.arrow}>
              <img className={styles.vectorIcon} alt="" src="/vector-4.svg" />
            </div>
          </div>
          <div className={styles.termsPrivacy}>{`Terms & privacy`}</div>
          <div className={styles.security}>Security</div>
          <div className={styles.status}>Status</div>
          <div className={styles.whitepaceLlc}>©2021 Whitepace LLC.</div>
        </div>
        <div className={styles.socialIcon}>
          <img
            className={styles.x301FacebookIcon}
            alt=""
            src="/-x30-1-facebook.svg"
          />
          <img className={styles.twitterIcon} alt="" src="/twitter.svg" />
          <img className={styles.linkedinIcon} alt="" src="/linkedin.svg" />
        </div>
      </div>
      <div className={styles.footerDivider} />
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
