const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')
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
    await request.post('/api/users', {
      data: {
        name: 'other',
        username: 'other',
        password: 'other',
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
      await loginWith(page, 'savant', 'fP8aaasxh6Z_@')
      await expect(page.getByText('Marat logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'savant', 'wrong password')
      await expect(page.getByText('Marat logged in')).not.toBeVisible()
    })
  })
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'savant', 'fP8aaasxh6Z_@')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'test title', 'test author', 'test url')
      await expect(page.getByText('test title test author')).toBeVisible()
    })

    test('a new blog can be liked', async ({ page }) => {
      await createBlog(page, 'test title', 'test author', 'test url')
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await page.getByText('1').waitFor({ timeout: 5000 })
      expect(page.getByText('1')).toBeVisible()
    })
    test('a new blog can be deleted', async ({ page }) => {
      page.on('dialog', (dialog) => dialog.accept())
      await createBlog(page, 'test title', 'test author', 'test url')
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'remove' }).click()

      await expect(page.getByText('test title test author')).not.toBeVisible()
    })

    test("only the user who added the blog sees the blog's delete button", async ({
      page,
    }) => {
      await createBlog(page, 'test title', 'test author', 'test url')
      await page.getByRole('button', { name: 'logout' }).click()

      //другой пользователь логинится
      await loginWith(page, 'other', 'other')
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('remove')).not.toBeVisible()
    })
  })
})
