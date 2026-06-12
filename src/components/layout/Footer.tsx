import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Пейзаж — фиксируемся по bottom:0, растёт вверх через границу секции */}
      {/* <img
        src={leftBg}
        alt=""
        aria-hidden="true"
        className={`${styles.scenery} ${styles.sceneryLeft}`}
        loading="eager"
      />
      <img
        src={rightBg}
        alt=""
        aria-hidden="true"
        className={`${styles.scenery} ${styles.sceneryRight}`}
        loading="eager"
      /> */}

      {/* Текст футера */}
      <p className={styles.tagline}>
        {" "}СДЕЛАНО С ЛЮБОВЬЮ <span className={styles.heart}>♥</span>
        {" "}ДЛЯ НАС
      </p>
    </footer>
  );
}
