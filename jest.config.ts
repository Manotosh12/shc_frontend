import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          module: "esnext", // ✅ Force esnext for tests
          target: "es2020",
        },
        useESM: true,
      },
    ],
  },

  extensionsToTreatAsEsm: [".ts", ".tsx"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;
