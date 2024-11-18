import {test, expect} from '@playwright/test';

test.describe("Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/astro-build');
  });

  test('De frontend toont  een lijst van games en deze heeft minstens 2 games', async ({ page }) => {
    const gameItems = await page.$$('.game-item');
    expect(gameItems.length).toBeGreaterThanOrEqual(2);
  });

  test('Er is een zoekbalk voor games te filteren op naam', async ({ page }) => {
    const searchInput = await page.$('#simple-search');
    expect(searchInput).not.toBeNull();
  });

  test('De filter toont de juiste games bij filteren op 75 procent', async ({ page }) => {
    await page.evaluate(() => {
      const slider = document.getElementById('discount-slider') as HTMLInputElement;
      if (slider) {
        slider.value = '75';
        slider.dispatchEvent(new Event('input'));
      }
    });
    const gameItems = await page.$$('.game-item:not(.hidden)');
    expect(gameItems.length).toBe(7);
  });

  test('De filter toont de juiste games bij filteren op naam en korting', async ({ page }) => {
    await page.fill('#simple-search', 'crew');
    await page.evaluate(() => {
      const slider = document.getElementById('discount-slider') as HTMLInputElement;
      if (slider) {
        slider.value = '75';
        slider.dispatchEvent(new Event('input'));
      }
    });``
    const gameItems = await page.$$('.game-item:not(.hidden)');
    expect(gameItems.length).toBe(2);
  });
});