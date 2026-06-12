import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CampfireScene from "../ui/CampfireScene";
import styles from "./PowerUpsSection.module.css";

export default function PowerUpsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section ref={ref} className={styles.section} aria-label="Campfire scene">
      {/* Центральная пиксельная рамка */}
      <motion.div
        className={styles.frame}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className={styles.quote}>Ты мой любимый второй игрок!</p>
        <motion.div
          className={styles.heart}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          ♥
        </motion.div>
        <CampfireScene showCaption />
      </motion.div>
    </section>
  );
}
