import { test, expect, Page } from '@playwright/test'

test.describe('Frontend', () => {
  let page: Page

  test.beforeAll(async ({ browser }, testInfo) => {
    const context = await browser.newContext()
    page = await context.newPage()
  })

  test('can go on homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await expect(page).toHaveTitle(/Awinel/)

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Awinel')
  })

  test('can go on portfolio page', async ({ page }) => {
    await page.goto('http://localhost:3000/portfolio')

    await expect(page).toHaveTitle(/Work/)

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Benjamin Antonio Huerta Torres')
  })
})
