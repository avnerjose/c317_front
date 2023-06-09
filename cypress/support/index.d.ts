/// <reference types="cypress" />

interface Professor {
  name: string;
  email: string;
  phone_number: string;
  departament: string;
}

interface Student {
  name: string;
  email: string;
  course: string;
  password: string;
}

interface Subject {
  id: string;
  name: string;
}

declare namespace Cypress {
  interface Chainable {
    fillLoginForm(email: string, password: string): Chainable<void>;
    createProfessor(professor: Professor): Chainable<string>;
    deleteProfessor(professorId: string): Chainable<void>;
    createStudent(student: Student): Chainable<string>;
    deleteStudent(studentId: string): Chainable<void>;
    createSubject(subject: Subject, professorId: string): Chainable<void>;
    deleteSubject(subjectId: string): Chainable<void>;
  }
}
