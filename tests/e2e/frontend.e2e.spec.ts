import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('can go on homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await expect(page).toHaveTitle(/.+/)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('can go on portfolio page', async ({ page }) => {
    await page.goto('http://localhost:3000/portfolio')

    await expect(page).toHaveTitle(/.+/)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
})
