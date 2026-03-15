import { CSSProperties, ReactNode } from "react";
import styles from "./Interactive.module.css";

type DemoFrameProps = {
  title: string;
  lead?: ReactNode;
  children: ReactNode;
  controls?: ReactNode;
  caption?: ReactNode;
  accent?: string;
};

export function DemoFrame({
  title,
  lead,
  children,
  controls,
  caption,
  accent,
}: DemoFrameProps) {
  return (
    <figure
      className={styles.frame}
      style={accent ? ({ ["--demo-accent" as string]: accent } as CSSProperties) : undefined}
    >
      <div className={styles.header}>
        <p className={styles.title}>{title}</p>
        {lead ? <p className={styles.lead}>{lead}</p> : null}
      </div>
      <div className={styles.body}>{children}</div>
      {controls ? <div className={styles.controls}>{controls}</div> : null}
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  );
}
