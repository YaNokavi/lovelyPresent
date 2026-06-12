import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CampfireScene from "../ui/CampfireScene";
import styles from "./PowerUpsSection.module.css";
import leftBg from "../../assets/backgrounds/leftBottomBg.png";
import rightBg from "../../assets/backgrounds/rightBottomBg.png";

export default function PowerUpsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section
      ref={ref}
      className={styles.section}
      aria-label="Campfire scene"
    >
      {/* Боковые цветы */}
      <img src={leftBg}  alt="" className={styles.sideLeft}  aria-hidden="true" loading="lazy" />
      <img src={rightBg} alt="" className={styles.sideRight} aria-hidden="true" loading="lazy" />

      {/* Центральная панель с пиксельной рамкой */}
      <div className={styles.center}>
        <motion.div
          className={styles.frame}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className={styles.quote}>You're my favorite player two.</p>
          <motion.div
            className={styles.heart}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            ♥
          </motion.div>
          <CampfireScene showCaption />
        </motion.div>
      </div>
    </section>
  );
}
