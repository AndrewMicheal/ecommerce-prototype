import { test, expect } from "@playwright/test";
import { baseUrl } from "../../src/BaseUrl/BaseUrl";

test.describe("Login Tests", () => {
  test("Check if backend is alive", async ({ request }) => {
    const endpoint = `${baseUrl}/api/v1/auth/signin`;

    try {
      const response = await request.head(endpoint);

      console.log("Status:", response.status());

      expect(response.status()).toBeLessThan(500);
    } catch (error) {
      console.error("Backend might be down!", error);
    }
  });

  test("login success", async ({ request }) => {
    const response = await request.post(`${baseUrl}/api/v1/auth/signin`, {
      data: {
        email: "andrew22@test.com",
        password: "Andrew123",
      },
    });
    const responseObject = await response.json();
    console.log(responseObject);
    expect(response.status()).toBe(200);
  });

  test("login fail", async ({ request }) => {
    const response = await request.post(`${baseUrl}/api/v1/auth/signin`, {
      data: {
        email: "andrew22@gmail.com",
        password: "Andrew123",
      },
    });
    const responseObject = await response.json();
    console.log(responseObject);
    expect(response.status()).toBe(401);
    expect(responseObject.message).toBe("Incorrect email or password");
  });

  test("Login with empty fields" , async({page})=> {
    await page.goto("http://localhost:5173/auth/login");
    await page.click("button[type='submit']");
    const emailInput = await page.locator('input[name= "email"]');
    const passwordInput = await page.locator('input[name= "password"]');
    await expect(emailInput).toHaveValue('');
    await expect(passwordInput).toHaveValue('');
    const emailError = page.locator('.emailError');
    const passwordError = page.locator('.passwordError');
    await expect(emailError).toBeVisible();
    await expect(passwordError).toBeVisible();


  })
});
