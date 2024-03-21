import { chromium, defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require("dotenv").config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 2,
  workers: undefined,
  timeout: 50000,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // Use the HTML reporter to create a report file that outputs to the playwright-report directory by default
  reporter: [['html', { open: 'never' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "https://staging.tasktrain.app/",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-all-retries",

    headless: true,

    testIdAttribute: "data-tt-tour",

    video: "off",

    screenshot: "on",
    
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "auth-setup",
      testDir: "./",
      testMatch: "auth-setup.ts",
    },
  
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], storageState:"./general-auth.json" },
      dependencies: ["auth-setup"],
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"], storageState:"./general-auth.json" },
      dependencies: ["auth-setup"],
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"], storageState:"./general-auth.json"  },
      dependencies: ["auth-setup"],
    },
  ],
});