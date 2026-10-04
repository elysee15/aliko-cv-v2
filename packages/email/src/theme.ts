/**
 * Les jetons de `tooling/tailwind/theme.css` convertis en hexadécimal : aucun
 * client de messagerie ne sait lire `oklch()`, et beaucoup ignorent aussi les
 * variables CSS. Les valeurs sont donc figées ici, une seule fois, et
 * re-dérivées du thème si celui-ci bouge.
 */
export const color = {
  ink: "#151c19",
  paper: "#ffffff",
  chrome: "#fbfbf9",
  graphite: "#6b7570",
  hairline: "#e4e4e2",
  sauge: "#1e6e4f",
  saugeTint: "#f1f6f3",
  onSauge: "#fafdfb",
} as const;

export const fontStack =
  "'Instrument Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

export const monoStack =
  "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";
