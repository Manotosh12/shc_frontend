// env.ts
// ✅ Correct way for Vite frontend – use import.meta.env
export const getApiBaseUrl = (): string => {
  return import.meta.env.VITE_API_URL || "http://localhost:3000";
};

