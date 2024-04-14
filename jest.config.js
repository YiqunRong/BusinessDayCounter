module.exports = {
  preset: "ts-jest",
  testEnvironment: "node", // Use 'jsdom' if your project is browser-based
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json", // Path to your TypeScript config file
    },
  },
};
