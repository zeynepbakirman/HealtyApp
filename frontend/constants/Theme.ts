export const COLORS = {
  primary: '#8A2BE2',
  primaryLight: '#F3E5F5',
  secondary: '#FF69B4',
  accent: '#FFD700',
  background: '#F2F2F7',
  white: '#FFFFFF',
  gray: '#8E8E93',
  lightGray: '#D1D1D6',
  dark: '#4A148C',
  text: '#1C1C1E',             // Bu eksikti, eklendi
  textSecondary: '#8E8E93',    // Bu eksikti, eklendi
  gradient: ['#8A2BE2', '#FF69B4'] as [string, string],
  pinkGradient: ['#FF69B4', '#FFB6C1'] as [string, string],
  cardBackground: '#FFFFFF',
  border: '#D1D1D6',
  notificationDot: '#FF3B30'
};

export const SHADOWS = {
  light: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

export default { COLORS, SHADOWS };