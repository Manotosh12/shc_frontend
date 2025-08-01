export const getApiBaseUrl = () => {
  // ✅ Use process.env for Jest / Node
  if (typeof process !== "undefined" && process.env?.VITE_API_URL) {
    return process.env.VITE_API_URL;
  }

  // ✅ Use eval() to bypass TS parser for import.meta
  try {
    const meta = eval("import.meta");
    return meta?.env?.VITE_API_URL || "http://localhost:3000";
  } catch {
    return "http://localhost:3000";
  }
};
