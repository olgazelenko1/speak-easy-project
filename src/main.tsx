import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "normalize.css";
import "./index.module.css";
import App from "./App/App.tsx";
import { BrowserRouter } from "react-router-dom";
// Theme initialization and helper
const themes = [
  "theme-yellow",
  "theme-green",
  "theme-blue",
  "theme-pink",
  "theme-peach",
] as const;

type Theme = (typeof themes)[number];

function applyTheme(name: Theme | null) {
  const root = document.documentElement;
  themes.forEach((t) => root.classList.remove(t));
  if (name) root.classList.add(name);
}

function isTheme(value: unknown): value is Theme {
  return (
    typeof value === "string" && (themes as readonly string[]).includes(value)
  );
}

const saved = localStorage.getItem("theme");
const initial: Theme = saved && isTheme(saved) ? saved : "theme-yellow";
applyTheme(initial);
localStorage.setItem("theme", initial);

declare global {
  interface Window {
    toggleTheme?: (next?: string) => void;
  }
}

window.toggleTheme = (next?: string) => {
  if (next && isTheme(next)) {
    applyTheme(next);
    localStorage.setItem("theme", next);
    return;
  }
  const current = themes.find((t) =>
    document.documentElement.classList.contains(t),
  );
  const idx = current ? themes.indexOf(current) : -1;
  const nextIdx = (idx + 1) % themes.length;
  const nt = themes[nextIdx];
  applyTheme(nt);
  localStorage.setItem("theme", nt);
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
