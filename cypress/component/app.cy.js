/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress


// pages/about.cy.js
import Home from '../../pages/index';

describe('<AboutPage />', () => {
  it('should render Home', () => {
    // Mount the React component for the About page
    cy.mount(<Home />);
  });
});