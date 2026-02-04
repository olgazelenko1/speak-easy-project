import styles from "./ThemeToggle.module.css";

declare global {
  interface Window {
    toggleTheme?: (t?: string) => void;
  }
}

const available = [
  "theme-yellow",
  "theme-green",
  "theme-blue",
  "theme-pink",
  "theme-peach",
] as const;

export default function ThemeToggle() {
  const cycle = () => {
    if (typeof window !== "undefined" && window.toggleTheme) {
      window.toggleTheme();
    }
  };

  const setTheme = (t: string) => {
    if (typeof window !== "undefined" && window.toggleTheme) {
      window.toggleTheme(t);
    }
  };

  return (
    <div className={styles.root} aria-hidden={false}>
      <button
        className={`${styles.button}`}
        onClick={cycle}
        title="Toggle theme"
      >
        ♻
      </button>
      <div className={styles.dotRow}>
        {available.map((a) => (
          <button
            key={a}
            className={styles.dot}
            onClick={() => setTheme(a)}
            style={{
              background:
                a === "theme-yellow"
                  ? "#f4c550"
                  : a === "theme-green"
                    ? "#9fbaae"
                    : a === "theme-blue"
                      ? "#9fb7ce"
                      : a === "theme-pink"
                        ? "#e0a39a"
                        : "#f0aa8d",
            }}
            aria-label={a}
          />
        ))}
      </div>
    </div>
  );
}
