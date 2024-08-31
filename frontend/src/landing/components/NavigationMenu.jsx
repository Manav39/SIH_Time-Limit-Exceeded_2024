import Client from "./Client";
import PropTypes from "prop-types";
import styles from "./NavigationMenu.module.css";

const NavigationMenu = ({ className = "" }) => {
  return (
    <section className={[styles.navigationMenu, className].join(" ")}>
      <div className={styles.heroContainer}>
        <div className={styles.groupParent}>
          <img
            className={styles.groupIcon}
            loading="lazy"
            alt=""
            src="/group.svg"
          />
          <h1 className={styles.whatOurClients}>What Our Clients Says</h1>
        </div>
        <div className={styles.content}>
          <Client group="/group-1.svg" avater="/avater@2x.png" />
          <Client
            propBoxShadow="unset"
            propBackgroundColor="#4f9cf9"
            propBorderBottom="1px solid #fff"
            group="/group-2.svg"
            propColor="#fff"
            avater="/avater-1@2x.png"
            propColor1="#043873"
            propColor2="#fff"
          />
          <Client
            propBoxShadow="unset"
            propBackgroundColor="#4f9cf9"
            propBorderBottom="1px solid #fff"
            group="/group-2.svg"
            propColor="#fff"
            avater="/avater-2@2x.png"
            propColor1="#043873"
            propColor2="#fff"
          />
        </div>
        <div className={styles.featureHighlight}>
          <div className={styles.slider}>
            <div className={styles.dot} />
            <div className={styles.dot1} />
            <div className={styles.dot} />
          </div>
        </div>
      </div>
    </section>
  );
};

NavigationMenu.propTypes = {
  className: PropTypes.string,
};

export default NavigationMenu;
