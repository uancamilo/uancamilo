const nextJest = require("next/jest");

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files
	dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	testEnvironment: "jest-environment-jsdom",
	moduleNameMapper: {
		// Handle module aliases (this replaces tsconfig.json paths)
		"^@/components/(.*)$": "<rootDir>/components/$1",
		"^@/pages/(.*)$": "<rootDir>/pages/$1",

		// Handle CSS imports (with CSS modules)
		"^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",

		// Handle CSS imports (without CSS modules)
		"^.+\\.(css|sass|scss)$": "identity-obj-proxy",

		// Handle image imports
		"^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$":
			"<rootDir>/__mocks__/fileMock.js",
	},
	testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
	collectCoverageFrom: [
		"pages/**/*.{js,jsx,ts,tsx}",
		"components/**/*.{js,jsx,ts,tsx}",
		"!pages/_app.js",
		"!pages/_document.js",
		"!**/*.d.ts",
	],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
