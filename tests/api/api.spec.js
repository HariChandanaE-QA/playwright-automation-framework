// tests/api/api.spec.js
// Test Suite: REST API Testing using Playwright's APIRequestContext
// Target API: https://reqres.in — public demo REST API

const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://reqres.in/api';

test.describe('REST API Tests — User Management', () => {

  // ─── GET Tests ────────────────────────────────────────────────

  test('TC016 — GET all users returns 200 and valid response structure', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users?page=1`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('data');
    expect(body).toHaveProperty('total');
    expect(Array.isArray(body.data)).toBeTruthy();
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('TC017 — GET single user by ID returns correct user data', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/2`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data).toHaveProperty('id', 2);
    expect(body.data).toHaveProperty('email');
    expect(body.data).toHaveProperty('first_name');
    expect(body.data).toHaveProperty('last_name');
  });

  test('TC018 — GET non-existent user returns 404', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/9999`);

    expect(response.status()).toBe(404);
  });

  // ─── POST Tests ───────────────────────────────────────────────

  test('TC019 — POST create new user returns 201 with user data', async ({ request }) => {
    const newUser = {
      name: 'Hari Chandana',
      job: 'QA Automation Engineer',
    };

    const response = await request.post(`${BASE_URL}/users`, {
      data: newUser,
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body).toHaveProperty('name', newUser.name);
    expect(body).toHaveProperty('job', newUser.job);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('createdAt');
  });

  test('TC020 — POST register user with valid credentials returns 200 and token', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/register`, {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'pistol',
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('token');
    expect(body.token).toBeTruthy();
  });

  test('TC021 — POST register without password returns 400 with error message', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/register`, {
      data: {
        email: 'eve.holt@reqres.in',
      },
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body).toHaveProperty('error');
    expect(body.error).toContain('Missing password');
  });

  // ─── PUT Tests ────────────────────────────────────────────────

  test('TC022 — PUT update user returns 200 with updated data', async ({ request }) => {
    const updatedUser = {
      name: 'Chandana Updated',
      job: 'Senior QA Engineer',
    };

    const response = await request.put(`${BASE_URL}/users/2`, {
      data: updatedUser,
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('name', updatedUser.name);
    expect(body).toHaveProperty('job', updatedUser.job);
    expect(body).toHaveProperty('updatedAt');
  });

  // ─── DELETE Tests ─────────────────────────────────────────────

  test('TC023 — DELETE user returns 204 No Content', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/users/2`);

    expect(response.status()).toBe(204);
  });

  // ─── Response Header Tests ────────────────────────────────────

  test('TC024 — API response contains correct Content-Type header', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/1`);

    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
  });
});
