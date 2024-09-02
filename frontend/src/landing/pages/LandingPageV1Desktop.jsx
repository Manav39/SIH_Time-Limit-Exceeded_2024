import Header from "../components/Header";
import FrameComponent from "../components/FrameComponent";
import FrameComponent1 from "../components/FrameComponent1";
import CustomizationParent from "../components/CustomizationParent";
import YourWork from "../components/YourWork";
import OurSponsors from "../components/OurSponsors";
import ProductLink from "../components/ProductLink";
import NavigationMenu from "../components/NavigationMenu";
import FreeTrial from "../components/FreeTrial";
import Footer from "../components/Footer";
import styles from "./LandingPageV1Desktop.module.css";

const LandingPageV1Desktop = () => {
  return (
    <div className={styles.landingPageV1Desktop19}>
      <Header />
      <FrameComponent />
      <FrameComponent1 />
      <section className={styles.customiseItToYourNeeds}>
        <div className={styles.extensionParent}>
          <div className={styles.extensionContent}>
            <div className={styles.frameParent}>
              <div className={styles.elementParent}>
                <img
                  className={styles.elementIcon}
                  alt=""
                  src="/element-3.svg"
                />
                <h1 className={styles.useAsExtension}>Use as Extension</h1>
              </div>
              <div className={styles.useTheWeb}>
                Use the web clipper extension, available on Chrome and Firefox,
                to save web pages or take screenshots as notes.
              </div>
            </div>
            <button className={styles.btnGetStarted}>
              <div className={styles.letsGo}>Let’s Go</div>
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
        <div className={styles.image} />
      </section>
      <CustomizationParent />
      <YourWork />
      <section className={styles.yourData}>
        <div className={styles.heading}>
          <div className={styles.textBlock}>
            <img className={styles.elementIcon1} alt="" src="/element-7.svg" />
            <b className={styles.yourData1}>100% your data</b>
            <div className={styles.useTheWeb}>
              The app is open source and your notes are saved to an open format,
              so you'll always have access to them. Uses End-To-End Encryption
              (E2EE) to secure your notes and ensure no-one but yourself can
              access them.
            </div>
          </div>
          <button className={styles.btnTry}>
            <div className={styles.readMore}>Read more</div>
            <div className={styles.icon}>
              <img className={styles.iconChild} alt="" src="/group-214.svg" />
            </div>
          </button>
        </div>
        <img className={styles.elementIcon2} alt="" src="/element-8.svg" />
      </section>
      <OurSponsors />
      <ProductLink />
      <NavigationMenu />
      <FreeTrial />
      <img className={styles.backgroundIcon} alt="" src="/background-1.svg" />
      <Footer />
    </div>
  );
};

export default LandingPageV1Desktop;
