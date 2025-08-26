// src/constants/colorPalettes.ts

export const COLOR_PALETTES = {
  default: {
    name: 'Default Blue',
    primary: 'text-blue-700',
    secondary: 'text-gray-800',
    accent: 'bg-blue-700',
    border: 'border-blue-700',
    background: '#1d4ed8',
  },
  maroon: {
    name: 'Maroon',
    primary: 'text-maroon-dark',
    secondary: 'text-gray-800',
    accent: 'bg-maroon-dark',
    border: 'border-maroon-dark',
    background: '#800000',
  },
  teal: {
    name: 'Teal',
    primary: 'text-teal-700',
    secondary: 'text-gray-800',
    accent: 'bg-teal-700',
    border: 'border-teal-700',
    background: '#047857',
  },
};

export const getColorStyles = (palette) => {
  if (!palette) return {};
  return {
    primaryText: palette.primary,
    secondaryText: palette.secondary,
    accentBg: palette.accent,
    accentBorder: palette.border,
  };
};