import { alpha } from "@mui/material/styles";

function createGradient(color1, color2) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

const PRIMARY = {
  light: "#e6ecef",
  lightHover: "#d9e3e7",
  lightActive: "#b1c5ce",
  main: "#024562",
  mainHover: "#023e58",
  mainActive: "#02374e",
  dark: "#02344a",
  darkHover: "#01293b",
  darkActive: "#011f2c",
  darker: "#011822",
};
const SECONDARY = {
  light: "#e8f5f5",
  lightHover: "#ddf0f0",
  lightActive: "#b9e0e0",
  main: "#1c9c9b",
  mainHover: "#198c8c",
  mainActive: "#167d7c",
  dark: "#157574",
  darkHover: "#115e5d",
  darkActive: "#0d4646",
  darker: "#0a3736",
};
const INFO = {
  light: "#eaf8fe",
  lightHover: "#dff4fe",
  lightActive: "#bde8fc",
  main: "#29b6f6",
  mainHover: "#25a4dd",
  mainActive: "#2192c5",
  dark: "#1f89b9",
  darkHover: "#196d94",
  darkActive: "#12526f",
  darker: "#0e4056",
};
const SUCCESS = {
  light: "#e6f6ed",
  lightHover: "#daf2e5",
  lightActive: "#b2e3c8",
  main: "#08a64f",
  mainHover: "#079547",
  mainActive: "#06853f",
  dark: "#067d3b",
  darkHover: "#05642f",
  darkActive: "#044b24",
  darker: "#033a1c",
};
const WARNING = {
  light: "#fff6e9",
  lightHover: "#fff2de",
  lightActive: "#ffe4bc",
  main: "#ffa726",
  mainHover: "#e69622",
  mainActive: "#cc861e",
  dark: "#bf7d1d",
  darkHover: "#996417",
  darkActive: "#734b11",
  darker: "#593a0d",
};
const ERROR = {
  light: "#fde9e9",
  lightHover: "#fcdede",
  lightActive: "#f9babc",
  main: "#ed2226",
  mainHover: "#d51f22",
  mainActive: "#be1b1e",
  dark: "#b21a1d",
  darkHover: "#8e1417",
  darkActive: "#6b0f11",
  darker: "#530c0d",
};
const NEUTRAL_COOL = {
  light: "#fdfdfe",
  lightHover: "#fbfcfd",
  lightActive: "#f8f9fa",
  main: "#e7ecf0",
  mainHover: "#d0d4d8",
  mainActive: "#b9bdc0",
  dark: "#adb1b4",
  darkHover: "#8b8e90",
  darkActive: "#686a6c",
  darker: "#515354",
};
const NEUTRAL_WARM = {
  light: "#ffffff",
  lightHover: "#ffffff",
  lightActive: "#ffffff",
  main: "#ffffff",
  mainHover: "#e6e6e6",
  mainActive: "#cccccc",
  dark: "#bfbfbf",
  darkHover: "#999999",
  darkActive: "#737373",
  darker: "#595959",
};

const ACCENT = {
  light: "#fef3e9",
  lightHover: "#fdedde",
  lightActive: "#fbdaba",
  main: "#f18821",
  mainHover: "#d97a1e",
  mainActive: "#c16d1a",
  dark: "#b56619",
  darkHover: "#915214",
  darkActive: "#6c3d0f",
  darker: "#54300c",
};

const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#1C232B",
  500_8: alpha("#919EAB", 0.08),
  500_12: alpha("#919EAB", 0.12),
  500_16: alpha("#919EAB", 0.16),
  500_24: alpha("#919EAB", 0.24),
  500_32: alpha("#919EAB", 0.32),
  500_48: alpha("#919EAB", 0.48),
  500_56: alpha("#919EAB", 0.56),
  500_80: alpha("#919EAB", 0.8),
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  secondary: createGradient(SECONDARY.light, SECONDARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
  neutralCool: createGradient(NEUTRAL_COOL.light, NEUTRAL_COOL.main),
  neutralWarm: createGradient(NEUTRAL_WARM.light, NEUTRAL_WARM.main),
  accent: createGradient(ACCENT.light, ACCENT.main),
};

const CHART_COLORS = {
  violet: ["#826AF9", "#9E86FF", "#D0AEFF", "#F7D2FF"],
  blue: ["#2D99FF", "#83CFFF", "#A5F3FF", "#CCFAFF"],
  green: ["#2CD9C5", "#60F1C8", "#A4F7CC", "#C0F2DC"],
  yellow: ["#FFE700", "#FFEF5A", "#FFF7AE", "#FFF3D6"],
  red: ["#FF6C40", "#FF8F6D", "#FFBD98", "#FFF2D4"],
};

const COMMON = {
  common: { black: "#000", white: "#fff" },
  primary: { ...PRIMARY, contrastText: "#fff" },
  secondary: { ...SECONDARY, contrastText: "#fff" },
  info: { ...INFO, contrastText: "#fff" },
  success: { ...SUCCESS, contrastText: GREY[800] },
  warning: { ...WARNING, contrastText: GREY[800] },
  error: { ...ERROR, contrastText: "#fff" },
  neutralCool: { ...NEUTRAL_COOL, contrastText: "#000" },
  neutralWarm: { ...NEUTRAL_WARM, contrastText: "#000" },
  accent: { ...ACCENT, contrastText: "#000" },
  grey: GREY,
  gradients: GRADIENTS,
  chart: CHART_COLORS,
  divider: GREY[500_24],
  action: {
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

const palette = {
  light: {
    ...COMMON,
    mode: "light",
    text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
    background: { paper: "#F0F3F8", default: "#fff", neutral: GREY[200] },
    action: { active: GREY[600], ...COMMON.action },
  },
};

export default palette;
