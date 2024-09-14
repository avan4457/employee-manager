import request from 'supertest';
import app from '../server';
import env from '../config/env';

/**
 * This function is a test for the root route of the API.
 * It sends a GET request to the root route and verifies that the response
 * contains the expected text and HTML.
 */
describe('App', () => {
  it(`should respond with "Welcome to ${env.PROJECT_NAME} API services!"`, async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe(`<h2 style='text-align:center;margin-top:50px'>Welcome to ${env.PROJECT_NAME} API services!\n<br></h2><h4 style='text-align:center'><button><a href='/api-docs'>Click here for api reference</a></button></h4>`);
  });
});