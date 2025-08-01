import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// ✅ Assign polyfills
(global as unknown as { TextEncoder: typeof TextEncoder }).TextEncoder = TextEncoder;
(global as unknown as { TextDecoder: typeof TextDecoder }).TextDecoder = TextDecoder;

// ✅ Safely set env variable without redeclaring process
process.env.VITE_API_URL = "http://localhost:3000";

