import type { Config } from "tailwindcss"

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "var(--oa-canvas)",
        surface: "var(--oa-surface)",
        "surface-strong": "var(--oa-surface-strong)",
        "surface-muted": "var(--oa-surface-muted)",
        line: "var(--oa-line)",
        copy: "var(--oa-copy)",
        "copy-muted": "var(--oa-copy-muted)",
        accent: "var(--oa-accent)",
        "accent-strong": "var(--oa-accent-strong)",
        "accent-soft": "var(--oa-accent-soft)",
        success: "var(--oa-success)",
        warning: "var(--oa-warning)",
      },
      borderRadius: {
        panel: "1.5rem",
        soft: "1rem",
      },
      fontFamily: {
        display: ["Iowan Old Style", "Palatino Linotype", "Book Antiqua", "Georgia", "serif"],
        sans: ["SF Pro Text", "Segoe UI", "Helvetica Neue", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config
