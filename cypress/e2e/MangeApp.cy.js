describe('App create, rename and delete', () => {
  beforeEach(() => {
    cy.visit('https://v3-lts-cetestsystem.tooljet.com/cy-qa')
    cy.wait(3000)
    cy.get('input[id="email"]').type('dheeraj@example.com')
    cy.get('input[id="password"]').type('password')
    cy.get('.tj-base-btn').click();
    cy.get('[data-cy="dashboard-section-header"]').should("have.text", "Applications");
  })

  const appName = "Dheeraj QA App"
  let renamedApp = "Dheeraj Application";

  it("create an new app", () => {
    cy.get('[data-cy="create-new-app-button"]').click();
    cy.get('[data-cy="app-name-input"]').type(appName);
    cy.get('[data-cy="+-create-app"]').click();
    cy.wait(5000);
    cy.get('.driver-close-btn').click();
    cy.get('[data-cy="editor-page-logo"]').click()
    cy.get('[data-cy="back-to-app-option"] > span').click();
    cy.get('[data-cy="home-page-search-bar"]').type(appName);
    cy.contains('[data-cy$="-title"]', appName).should('exist');
    cy.get('div[data-cy="settings-icon"]').click()
    cy.get('a[data-testid="logoutBtn"]').click()
  });

  it("rename the app", () => {
    cy.contains('[data-cy$="-title"]', appName)
      .closest('.homepage-app-card')
      .within(() => {
        cy.get('.app-icon-main').trigger('mouseover');
        cy.wait(3000);
        cy.get('[data-cy="app-card-menu-icon"]').scrollIntoView().click({force : true});
      });
    cy.get('[data-cy="card-options"] > :nth-child(1)').click();
    cy.get('[data-cy="app-name-input"]').clear().type(renamedApp);
    cy.get('[data-cy="rename-app"]').click();
    cy.get('[data-cy="home-page-search-bar"]').should('be.visible').clear().type(renamedApp);
    cy.contains('[data-cy$="-title"]', renamedApp).should('exist');
    cy.get('div[data-cy="settings-icon"]').click()
    cy.get('a[data-testid="logoutBtn"]').click()
  });

  it("delete app", () => {
    cy.contains('[data-cy$="-title"]', renamedApp)
      .closest('.homepage-app-card')
      .within(() => {
        cy.get('.app-icon-main').trigger('mouseover');
        cy.wait(3000);
        cy.get('[data-cy="app-card-menu-icon"]').scrollIntoView().click({force : true});
      });
    cy.get('span[data-cy="delete-app-card-option"]').click();
    cy.get('button[data-cy="yes-button"]').click()
    cy.get('[data-cy="home-page-search-bar"]').should('be.visible').clear().type(renamedApp);
    cy.contains('[data-cy$="-title"]', renamedApp).should('not.exist');
    cy.get('div[data-cy="settings-icon"]').click()
    cy.get('a[data-testid="logoutBtn"]').click()
  })
  
  after(() => {
    cy.log("Create, rename and delete functionality is competed.")
  })
  
})