import localFont from "next/font/local";

/* One family for headings and body text. */
export const bodyFont = localFont({
  src: "./fonts/inter-tight-latin-wght-normal.woff2",
  variable: "--font-body",
  display: "swap",
});

export const fontVariables = bodyFont.variable;
