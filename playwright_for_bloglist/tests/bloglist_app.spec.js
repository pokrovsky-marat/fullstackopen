const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')
describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Marat',
        username: 'savant',
        password: 'fP8aaasxh6Z_@',
      },
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByText('login')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      loginWith(page, 'savant', 'fP8aaasxh6Z_@')
      await expect(page.getByText('Marat logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      loginWith(page, 'savant', 'wrong password')
      await expect(page.getByText('Marat logged in')).not.toBeVisible()
    })
  })
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      loginWith(page, 'savant', 'fP8aaasxh6Z_@')
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByLabel('title').fill('test title')
      await page.getByLabel('author').fill('test author')
      await page.getByLabel('url').fill('test url')
      await page.getByRole('button', { name: 'create' }).click()
      await page.getByText('test title test author').waitFor({ timeout: 5000 })
      await expect(page.getByText('test title test author')).toBeVisible()
    })
  })
})
