import { test, expect, type Page } from "@playwright/test";
import { HomePage } from "../pages/home-page";
import {
  BatchInfo,
  Configuration,
  EyesRunner,
  ClassicRunner,
  VisualGridRunner,
  BrowserType,
  DeviceName,
  ScreenOrientation,
  Eyes,
  Target,
} from "@applitools/eyes-playwright";
import * as dotenv from "dotenv";

/* 
test 1:
1. open playwright site 
2. Press Cmd + K 
3. Verify heading search dialog opens
*/

const URL = "https://playwright.dev/";
let homePage: HomePage;
dotenv.config();

// Applitools
export const USE_ULTRAFAST_GRID: boolean = false;
export let Batch: BatchInfo;
export let Config: Configuration;
export let Runner: EyesRunner;
let eyes: Eyes;
// end of Applitools

test.beforeAll(async () => {
  console.log("Starting testing");

  if (USE_ULTRAFAST_GRID) {
    Runner = new VisualGridRunner({ testConcurrency: 5 });
  } else {
    Runner = new ClassicRunner();
  }

  const runnerName = USE_ULTRAFAST_GRID ? "Ultrafast Grid" : "Classic runner";
  Batch = new BatchInfo({ name: `Playwright website - ${runnerName}` });

  Config = new Configuration();

  if (process.env.APPLITOOLS_API_KEY) {
    Config.setApiKey(process.env.APPLITOOLS_API_KEY);
  } else console.error("APPLITOOLS_API_KEY is not defined in the environment");

  Config.setBatch(Batch);
  if (USE_ULTRAFAST_GRID) {
    Config.addBrowser(800, 600, BrowserType.CHROME);
    Config.addBrowser(1600, 1200, BrowserType.FIREFOX);
    Config.addBrowser(1024, 768, BrowserType.SAFARI);
    Config.addDeviceEmulation(DeviceName.iPhone_11, ScreenOrientation.PORTRAIT);
    Config.addDeviceEmulation(DeviceName.Nexus_10, ScreenOrientation.LANDSCAPE);
  }
});

test.beforeEach(async ({ page }, testInfo) => {
  //Applitools
  eyes = new Eyes(Runner, Config);
  await eyes.open(page, "Playwright", test.info().title, {
    width: 1024,
    height: 768,
  });
  //end of Applitools
  await page.goto(URL);
  homePage = new HomePage(page);
  console.log(`Test info: ${testInfo.title}`);
  console.log(`Test info root dir: ${testInfo.config.rootDir}`);
});

test.afterAll(async () => {
  console.log("Finished testing");
  const results = await Runner.getAllTestResults();
  console.log('Visual test results', results);
});

test.afterEach(async () => {
  await eyes.close();
});
test("search modal opens via Cmd+K ", async () => {
  // Act
  await homePage.keyboardPress("Control+k");
  await homePage.waitForInputField();

  // Assert
  // await homePage.assertDocSearchListVisible();
  await eyes.check('Search modal', Target.window().fully());
});
