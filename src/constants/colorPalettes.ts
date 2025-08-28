// src/constants/colorPalettes.ts

export const COLOR_PALETTES = {
  default: {
    name: "Professional Blue",
    primary: "text-blue-700",
    secondary: "text-gray-800",
    accent: "bg-blue-700",
    border: "border-blue-700",
    background: "#1d4ed8",
  },
  maroon: {
    name: "Executive Maroon",
    primary: "text-red-800",
    secondary: "text-gray-800",
    accent: "bg-red-800",
    border: "border-red-800",
    background: "#800000",
  },
  teal: {
    name: "Modern Teal",
    primary: "text-teal-700",
    secondary: "text-gray-800",
    accent: "bg-teal-700",
    border: "border-teal-700",
    background: "#047857",
  },
  purple: {
    name: "Creative Purple",
    primary: "text-purple-700",
    secondary: "text-gray-800",
    accent: "bg-purple-700",
    border: "border-purple-700",
    background: "#7c3aed",
  },
  green: {
    name: "Fresh Green",
    primary: "text-green-700",
    secondary: "text-gray-800",
    accent: "bg-green-700",
    border: "border-green-700",
    background: "#15803d",
  },
  orange: {
    name: "Energetic Orange",
    primary: "text-orange-700",
    secondary: "text-gray-800",
    accent: "bg-orange-700",
    border: "border-orange-700",
    background: "#ea580c",
  },
  slate: {
    name: "Professional Gray",
    primary: "text-slate-700",
    secondary: "text-gray-800",
    accent: "bg-slate-700",
    border: "border-slate-700",
    background: "#374151",
  },
  indigo: {
    name: "Corporate Indigo",
    primary: "text-indigo-700",
    secondary: "text-gray-800",
    accent: "bg-indigo-700",
    border: "border-indigo-700",
    background: "#4338ca",
  },
}

export const getColorStyles = (palette: any) => {
  if (!palette) return {}
  return {
    primaryText: palette.primary,
    secondaryText: palette.secondary,
    accentBg: palette.accent,
    accentBorder: palette.border,
  }
}
