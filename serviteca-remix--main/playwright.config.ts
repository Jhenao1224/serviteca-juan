import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/Pruebas/Cucumber',  // opcional, sólo si vas a lanzar playwright tests
  use: {
    headless: false,
    browserName: 'chromium',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },  // esto fuerza Chromium
    }
  ],
});
