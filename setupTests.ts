import '@testing-library/jest-dom/vitest';
import { beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

beforeEach(() => {
  vi.clearAllMocks();
  cleanup();
});
