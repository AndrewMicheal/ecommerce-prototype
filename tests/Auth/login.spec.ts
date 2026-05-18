import { test, expect } from "@playwright/test";
import { baseUrl } from "../../src/BaseUrl/BaseUrl";
import { log } from "console";

test.describe("Login Tests", () => {
  test("Check if backend is alive", async ({ request }) => {
    const endpoint = `${baseUrl}/api/v1/auth/signin`;

    try {
      const response = await request.head(endpoint);

    //   console.log("Status:", response.status());

      expect(response.status()).toBeLessThan(500);
    } catch (error) {
      console.error("Backend might be down!", error);
    }
  });

  test("login success", async ({ request }) => {
    console.log("EMAIL:", process.env.EMAIL_SUCCESS);
    console.log("PASSWORD:", process.env.PASSWORD_SUCCESS);
    const response = await request.post(`${baseUrl}/api/v1/auth/signin`, {
      data: {
       email: process.env.EMAIL_SUCCESS,
        password: process.env.PASSWORD_SUCCESS,
      },
    });
    const responseObject = await response.json();
    console.log(responseObject);
    expect(response.status()).toBe(200);
  });

  test("login fail", async ({ request }) => {
    console.log("EMAIL : " + process.env.EMAIL_FAIL);
    console.log("PASSWORD : " + process.env.PASSWORD_ERROR);

    const response = await request.post(`${baseUrl}/api/v1/auth/signin`, {
      data: {
        email: process.env.EMAIL_FAIL,
        password: process.env.PASSWORD_ERROR
      },
    });
    const responseObject = await response.json();
    console.log(responseObject);
    expect(response.status()).toBe(401);
    expect(responseObject.message).toBe("Incorrect email or password");
  });

  test("Login with empty fields" , async({page})=> {
    await page.goto("https://ecommerce-prototype-zeta.vercel.app/auth/login");
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

  test("Login with valid email and password" , async({page}) => {
    await page.goto("https://ecommerce-prototype-zeta.vercel.app/auth/login");
    await page.fill("input[name = 'email']" , process.env.EMAIL_SUCCESS || '');
    await page.fill("input[name = 'password']" , process.env.PASSWORD_SUCCESS || '');
    await page.click("button[type = 'submit']");
    await expect(page).toHaveURL("https://ecommerce-prototype-zeta.vercel.app/");
  })
});
