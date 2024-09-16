import { defineConfig } from 'cypress';
import populateDB from './populateDB';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        populateDB() {
          populateDB();
          return null;
        },
      });

      return config;
    },
  },
});
