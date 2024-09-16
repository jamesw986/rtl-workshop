function filterTable(searchText: string) {
  // Due to the asynchronous nature of Cypress (and its need for retryability), we only have access to findBy queries
  cy.findByRole('columnheader', { name: 'Title' }).within(() => {
    // Notice how we can chain cy methods to our findBy query
    cy.findByRole('button', { name: 'Menu' }).click();
  });

  /*
    MUI uses React Portals to render some components like menus or dialogs outside the normal DOM hierarchy.
    The filter menuitem here can't be found inside the .within because it's rendered in a different part
    of the DOM, hence performing this query outside.
  */
  cy.findByRole('menuitem', { name: 'Filter' }).click();

  /*
    userEvent has no use in Cypress (though you technically could use it) since Cypress already
    has powerful built in methods for user interactions. Cypress Testing Library only really
    provides benefits for querying.
  */
  cy.findByPlaceholderText('Filter value').type(searchText);

  cy.get('body').type('{esc}');

  cy.findByRole('gridcell', { name: searchText }).should('exist');
}

describe('E2E tests using Cypress Testing Library', () => {
  beforeEach(() => {
    cy.task('populateDB');
  });

  it('moves a task to the archive after marking as done', () => {
    cy.visit('http://localhost:5173');

    filterTable('today task 1');

    cy.findByRole('button', { name: 'Open' }).click();

    cy.findByRole('button', { name: 'Mark as done' }).click();

    // The table is still being filtered, so if the task has been deleted then this will be displayed
    cy.findByText('No results found.').should('exist');

    cy.findByRole('tab', { name: 'archive-tab' }).click();

    filterTable('today task 1');
  });
});
