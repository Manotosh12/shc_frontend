import "@testing-library/jest-dom";

import { TextEncoder, TextDecoder } from "util";
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder as any;

// ✅ Mock process.env for tests
(globalThis as any).process = {
  env: {
    VITE_API_URL: "http://localhost:3000",
  },
};
