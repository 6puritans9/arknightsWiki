import type { Config } from "jest";

const config: Config = {
    verbose: true,
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    roots: ["<rootDir>/src"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "^\\$/(.*)": "<rootDir>/$1",
    },
};

export default config;
