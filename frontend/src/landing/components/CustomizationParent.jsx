import PriceBoard from "./PriceBoard";
import PropTypes from "prop-types";
import styles from "./CustomizationParent.module.css";

const CustomizationParent = ({ className = "" }) => {
  return (
    <section className={[styles.customizationParent, className].join(" ")}>
      <div className={styles.customiseItToYourNeeds}>
        <div className={styles.imageContainer} />
        <div className={styles.heading}>
          <div className={styles.textBlock}>
            <img className={styles.elementIcon} alt="" src="/element-4.svg" />
            <h1 className={styles.customiseItTo}>Customise it to your needs</h1>
            <div className={styles.customiseTheApp}>
              Customise the app with plugins, custom themes and multiple text
              editors (Rich Text or Markdown). Or create your own scripts and
              plugins using the Extension API.
            </div>
          </div>
          <button className={styles.btnGetStarted}>
            <div className={styles.letsGo}>Let’s Go</div>
            <div className={styles.icon}>
              <img className={styles.iconChild} alt="" src="/group-214.svg" />
            </div>
          </button>
        </div>
      </div>
      <div className={styles.pricing}>
        <div className={styles.heading1}>
          <img className={styles.elementIcon1} alt="" src="/element-5.svg" />
          <h1 className={styles.customiseItTo}>Choose Your Plan</h1>
          <div className={styles.whetherYouWant}>
            Whether you want to get organized, keep your personal life on track,
            or boost workplace productivity, Evernote has the right plan for
            you.
          </div>
        </div>
        <div className={styles.priceList}>
          <PriceBoard free="Free" planSubtitles="$0" />
          <div className={styles.priceBoard}>
            <div className={styles.textBlock1}>
              <div className={styles.personal}>Personal</div>
              <b className={styles.b}>$11.99</b>
              <div className={styles.keepHomeAnd}>
                Keep home and family on track
              </div>
            </div>
            <div className={styles.bulletPoint}>
              <div className={styles.point}>
                <img className={styles.icon1} alt="" src="/icon-6.svg" />
                <div className={styles.syncUnlimitedDevices}>
                  Sync unlimited devices
                </div>
              </div>
              <div className={styles.point}>
                <img className={styles.icon1} alt="" src="/icon-6.svg" />
                <div className={styles.syncUnlimitedDevices}>
                  10 GB monthly uploads
                </div>
              </div>
              <div className={styles.point}>
                <img className={styles.icon1} alt="" src="/icon-6.svg" />
                <div className={styles.syncUnlimitedDevices}>
                  200 MB max. note size
                </div>
              </div>
              <div className={styles.point3}>
                <img className={styles.icon1} alt="" src="/icon-9.svg" />
                <div className={styles.customizeHomeDashboard}>
                  Customize Home dashboard and access extra widgets
                </div>
              </div>
              <div className={styles.point3}>
                <img className={styles.icon1} alt="" src="/icon-9.svg" />
                <div className={styles.connectPrimaryGoogle}>
                  Connect primary Google Calendar account
                </div>
              </div>
              <div className={styles.point3}>
                <img className={styles.icon1} alt="" src="/icon-9.svg" />
                <div
                  className={styles.addDueDates}
                >{`Add due dates, reminders, and notifications to your tasks
 `}</div>
              </div>
            </div>
            <button className={styles.btnGetStarted1}>
              <div className={styles.getStarted}>Get Started</div>
            </button>
          </div>
          <PriceBoard free="Organization" planSubtitles="$49.99" />
        </div>
      </div>
    </section>
  );
};

CustomizationParent.propTypes = {
  className: PropTypes.string,
};

export default CustomizationParent;
