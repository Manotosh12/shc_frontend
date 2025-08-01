// src/env.ts
export const getApiBaseUrl = (): string => {
  // ✅ Use process.env for Jest / Node environment
  if (typeof process !== "undefined" && process.env?.VITE_API_URL) {
    return process.env.VITE_API_URL;
  }

  // ✅ Use eval() so TypeScript does not complain about import.meta
  try {
    // eslint-disable-next-line no-eval
    const meta = eval("import.meta");
    return meta?.env?.VITE_API_URL || "http://localhost:3000";
  } catch {
    return "http://localhost:3000";
  }
};
