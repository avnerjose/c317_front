/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add("fillLoginForm", (email, password) => {
  cy.get('[data-test="email"]').type(email);
  cy.get('[data-test="password"]').type(password);
});

Cypress.Commands.add("createProfessor", (professor) => {
  cy.visit("/dashboard/professors/new");

  Object.keys(professor).forEach((key) => {
    cy.get(`[data-test=${key}]`).type(professor[key]);
  });

  cy.get('[data-test="save-button"]').click();

  cy.get('[data-test="professor-list-item"] > :nth-child(3)').invoke("text");
});

Cypress.Commands.add("deleteProfessor", (professorId) => {
  cy.visit("/dashboard/professors/list");

  cy.get('[data-test="professor-list-item"]')
    .contains(professorId)
    .parent()
    .find('[data-test="delete-button"]')
    .click();

  cy.get('[data-test="modal-delete-button"]').click();
});

Cypress.Commands.add("createStudent", (student) => {
  cy.visit("/dashboard/students/new");

  Object.keys(student).forEach((key) => {
    cy.get(`[data-test=${key}]`).type(student[key]);
  });

  cy.get('[data-test="save-button"]').click();

  cy.get('[data-test="student-list-item"] > :nth-child(3)').invoke("text");
});

Cypress.Commands.add("deleteStudent", (studentId) => {
  cy.visit("/dashboard/students/list");

  cy.get('[data-test="student-list-item"]')
    .contains(studentId)
    .parent()
    .find('[data-test="delete-button"]')
    .click();

  cy.get('[data-test="modal-delete-button"]').click();
});

Cypress.Commands.add("createSubject", (subject, professorId) => {
  cy.visit("/dashboard/subjects/new");

  Object.keys(subject).forEach((key) => {
    cy.get(`[data-test=${key}]`).type(subject[key]);
  });

  cy.get('[data-test="professor"]').select(professorId);

  cy.get('[data-test="new-class-button"').click();

  cy.get('[data-test="new-class-weekday"]').select("Terça-Feira");

  cy.get('[data-test="new-class-time"]').select("10:00");

  cy.get('[data-test="new-class-save"]').click();

  cy.get("#students")
    .get(".react-select__input")
    .eq(1)
    .click()
    .get(".react-select__menu")
    .find(".react-select__option")
    .first()
    .click();

  cy.get('[data-test="save-button"]').click();
});

Cypress.Commands.add("deleteSubject", (subjectId) => {
  cy.visit("/dashboard/subjects/list");

  cy.get('[data-test="subject-list-item"]')
    .contains(subjectId)
    .parent()
    .find('[data-test="delete-button"]')
    .click();

  cy.get('[data-test="modal-delete-button"]').click();
});

Cypress.on("uncaught:exception", (err) => {
  // we check if the error is
  if (
    err.message.includes("Hydration failed") ||
    err.message.includes("hydrating")
  ) {
    return false;
  }
});
