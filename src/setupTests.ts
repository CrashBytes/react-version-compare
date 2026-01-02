// src/setupTests.ts
require('@testing-library/jest-dom');

// Suppress act() warnings for async Contentful rendering
// This is expected behavior - the component renders loading state first,
// then updates with diff results asynchronously
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: An update to Compare inside a test was not wrapped in act')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
