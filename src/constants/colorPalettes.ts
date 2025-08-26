// src/constants/colorPalettes.ts
export const COLOR_PALETTES = {
  default: {
    name: 'Default Blue',
    primary: 'text-blue-700',
    secondary: 'text-gray-800',
    accent: 'bg-blue-700',
    border: 'border-blue-700',
  },
  maroon: {
    name: 'Maroon',
    primary: 'text-maroon-dark',
    secondary: 'text-gray-800',
    accent: 'bg-maroon-dark',
    border: 'border-maroon-dark',
  },
  teal: {
    name: 'Teal',
    primary: 'text-teal-700',
    secondary: 'text-gray-800',
    accent: 'bg-teal-700',
    border: 'border-teal-700',
  },
  // Add more palettes here
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