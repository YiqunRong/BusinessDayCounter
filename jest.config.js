module.exports = {
  preset: "ts-jest",
  testEnvironment: "node", // Use 'jsdom' if your project is browser-based
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        // ts-jest configuration options
        tsconfig: "tsconfig.json",
      },
    ],
  },
};
