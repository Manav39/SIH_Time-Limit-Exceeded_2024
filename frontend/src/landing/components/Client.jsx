import { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./Client.module.css";

const Client = ({
  className = "",
  propBoxShadow,
  propBackgroundColor,
  propBorderBottom,
  group,
  propColor,
  avater,
  propColor1,
  propColor2,
}) => {
  const clientStyle = useMemo(() => {
    return {
      boxShadow: propBoxShadow,
      backgroundColor: propBackgroundColor,
    };
  }, [propBoxShadow, propBackgroundColor]);

  const commentStyle = useMemo(() => {
    return {
      borderBottom: propBorderBottom,
    };
  }, [propBorderBottom]);

  const whitepateIsDesignedStyle = useMemo(() => {
    return {
      color: propColor,
    };
  }, [propColor]);

  const oberonShawMCHStyle = useMemo(() => {
    return {
      color: propColor1,
    };
  }, [propColor1]);

  const headOfTalentStyle = useMemo(() => {
    return {
      color: propColor2,
    };
  }, [propColor2]);

  return (
    <div className={[styles.client, className].join(" ")} style={clientStyle}>
      <div className={styles.comment} style={commentStyle}>
        <div className={styles.quote}>
          <img className={styles.groupIcon} alt="" src={group} />
        </div>
        <div
          className={styles.whitepateIsDesigned}
          style={whitepateIsDesignedStyle}
        >
          Whitepate is designed as a collaboration tool for businesses that is a
          full project management solution.
        </div>
      </div>
      <div className={styles.nameBox}>
        <img className={styles.avaterIcon} loading="lazy" alt="" src={avater} />
        <div className={styles.name}>
          <div className={styles.oberonShawMch} style={oberonShawMCHStyle}>
            Oberon Shaw, MCH
          </div>
          <div className={styles.headOfTalent} style={headOfTalentStyle}>
            Head of Talent Acquisition, North America
          </div>
        </div>
      </div>
    </div>
  );
};

Client.propTypes = {
  className: PropTypes.string,
  group: PropTypes.string,
  avater: PropTypes.string,

  /** Style props */
  propBoxShadow: PropTypes.any,
  propBackgroundColor: PropTypes.any,
  propBorderBottom: PropTypes.any,
  propColor: PropTypes.any,
  propColor1: PropTypes.any,
  propColor2: PropTypes.any,
};

export default Client;
