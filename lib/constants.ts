export const FADE_IN_ANIMATION_SETTINGS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.2 },
};

export const FADE_DOWN_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

export const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

export const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID || "";
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

if (!PROJECT_ID) throw new Error("Project ID not set in .env");
if (!API_URL) throw new Error("API URL not set in .env");
