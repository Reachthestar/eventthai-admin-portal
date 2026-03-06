import { test, expect } from "@playwright/test";

test.describe("Login Flow", () => {
  // Hook นี้จะทำงานก่อนเริ่มแต่ละ Test Case เสมอ (เปิดหน้าเว็บมารอเลย)
  test.beforeEach(async ({ page }) => {
    // สมมติว่ารันที่ localhost:3000 (ถ้าเซ็ต baseURL ใน playwright.config.ts ไว้แล้ว ใส่แค่ '/login' ได้เลย)
    await page.goto("http://localhost:3000/login");
  });

  test("1. Check Zod Validation: When email and password are empty, it should show an error message", async ({
    page,
  }) => {
    await page.getByTestId("login-submit").click();

    await expect(page.getByTestId("email-error")).toBeVisible();
    await expect(page.getByTestId("password-error")).toBeVisible();
    await expect(page.getByTestId("email-error")).toContainText(
      "Email is required",
    );
    await expect(page.getByTestId("password-error")).toContainText(
      "Password must be at least 6 characters",
    );
  });

  test("2. Check API Error: When enter wrong email and password, it should show an error message", async ({
    page,
  }) => {
    await page.getByTestId("login-email").fill("wrong@example.com");
    await page.getByTestId("login-password").fill("wrongpassword123");
    await page.getByTestId("login-submit").click();

    await expect(page.locator("[data-sonner-toast]")).toContainText(
      "Login failed",
    );
  });

  test("3. Check Success Login: When enter correct email and password, it should login successfully and go to Dashboard", async ({
    page,
  }) => {
    await page.getByTestId("login-email").fill("eve.holt@reqres.in");
    await page.getByTestId("login-password").fill("cityslicka");
    await page.getByTestId("login-submit").click();

    await expect(page).toHaveURL("http://localhost:3000/en");
    await expect(page.locator("[data-sonner-toast]")).toContainText(
      "Login success",
    );
    await expect(page.getByTestId("user-search-input")).toBeVisible({
      timeout: 10000,
    });
  });

  test("4. Check Zod Validation: When enter wrong email format, it should show an error message", async ({
    page,
  }) => {
    await page.getByTestId("login-email").fill("invalid-email-format");
    await page.getByTestId("login-password").fill("password123");
    await page.getByTestId("login-submit").click();

    await expect(page.getByTestId("email-error")).toBeVisible();
    await expect(page.getByTestId("email-error")).toContainText(
      "Invalid email address",
    );
  });

  test("5. Check UI: Can toggle password visibility (Hide/Show Password)", async ({
    page,
  }) => {
    const passwordInput = page.getByTestId("login-password");

    await passwordInput.fill("secret123");
    await expect(passwordInput).toHaveAttribute("type", "password");
    await page.getByRole("button", { name: "Show password" }).click();
    await expect(passwordInput).toHaveAttribute("type", "text");
    await page.getByRole("button", { name: "Hide password" }).click();
    await expect(passwordInput).toHaveAttribute("type", "password");
  });
});
