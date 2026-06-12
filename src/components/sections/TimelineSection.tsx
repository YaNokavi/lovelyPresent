import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { timelineEvents } from "../../data/timeline";
import styles from "./TimelineSection.module.css";

function SceneSprites({
  sprites,
  icon,
  isFinal,
}: {
  sprites?: string[];
  icon?: string;
  isFinal?: boolean;
}) {
  if (sprites && sprites.length > 0) {
    return (
      <div className={styles.sceneSprites}>
        {sprites.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            width={isFinal ? 52 : 44}
            height={isFinal ? 52 : 44}
            loading="lazy"
            className={styles.sceneImg}
            style={{ imageRendering: "pixelated" }}
          />
        ))}
        {icon && (
          <span className={styles.sceneIcon} aria-hidden>
            {icon}
          </span>
        )}
      </div>
    );
  }
  return icon ? (
    <div className={styles.sceneSprites}>
      <span className={styles.sceneEmoji} role="img">{icon}</span>
    </div>
  ) : null;
}

function LevelCard({
  event,
  index,
}: {
  event: (typeof timelineEvents)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  const isFinal = event.isFinal;

  return (
    <div
      ref={ref}
      className={`${styles.card} ${isFinal ? styles.cardFinal : ""}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.5s ease ${index * 0.07}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${index * 0.07}s`,
      }}
    >
      <div className={`${styles.levelBadge} ${isFinal ? styles.badgeFinal : ""}`}>
        {isFinal ? "FINAL LEVEL" : `LEVEL ${index + 1}`}
      </div>

      <div className={styles.scene}>
        <SceneSprites sprites={event.sceneSprites} icon={event.sceneIcon} isFinal={isFinal} />
      </div>

      <div className={styles.info}>
        <p className={styles.title}>{event.title}</p>
        {event.date && <p className={styles.date}>{event.date}</p>}
        {isFinal && <p className={styles.loadingText}>LOADING...</p>}
      </div>

      {index === 0 && <div className={styles.startBadge}>START</div>}
    </div>
  );
}

export default function TimelineSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: trackRef });
  const progressWidth = useTransform(scrollXProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className={styles.section} aria-labelledby="adventure-title">
      <div className={styles.header}>
        <motion.h2
          id="adventure-title"
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          ❖ НАШЕ ПРИКЛЮЧЕНИЕ ❖
        </motion.h2>
      </div>

      <div className={styles.progressTrack}>
        <motion.div className={styles.progressBar} style={{ width: progressWidth }} />
      </div>

      <div ref={trackRef} className={styles.track} role="list" aria-label="Relationship timeline">
        <div className={styles.trackInner}>
          {timelineEvents.map((event, i) => (
            <div key={event.id} role="listitem" className={styles.cardWrapper}>
              <LevelCard event={event} index={i} />
              {i < timelineEvents.length - 1 && (
                <div className={styles.connector} aria-hidden>
                  <motion.span
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                  >
                    ♥
                  </motion.span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
