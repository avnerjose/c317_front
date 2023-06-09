/// <reference types="cypress"/>

describe("Admin Path on the App", () => {
  it("Caso de teste: Fazer login como Admin", () => {
    signIn("admin", "admin");

    cy.url().should("include", "/dashboard");

    signOut();
  });

  it("Caso de teste: Cadastrar novo professor", () => {
    signIn("admin", "admin");
    cy.wait(2000);

    cy.fixture("professor").then((newProfessorData) => {
      cy.createProfessor(newProfessorData).then((professorId) => {
        cy.get('[data-test="professor-list-item"]').then((items) => {
          expect(items[items.length - 1])
            .to.contain(newProfessorData.name)
            .to.contain(newProfessorData.email)
            .to.contain(newProfessorData.departament);
        });

        cy.url().should("contain", "/professors/list");

        cy.deleteProfessor(professorId);
      });
    });

    signOut();
  });

  it("Caso de teste: Deletar professor cadastrado", () => {
    signIn("admin", "admin");
    cy.wait(2000);

    cy.fixture("professor").then((newProfessorData) => {
      cy.createProfessor(newProfessorData).then((professorId) => {
        cy.deleteProfessor(professorId);

        cy.contains("Lista de professores vazia").should("exist");
        cy.contains(
          "Você ainda não tem nenhum professor cadastrado em sua plataforma."
        ).should("exist");
      });
    });

    signOut();
  });

  it("Caso de teste: Cadastrar novo aluno", () => {
    signIn("admin", "admin");
    cy.wait(2000);

    cy.fixture("student").then((newStudentData) => {
      cy.createStudent(newStudentData).then((studentId) => {
        cy.get('[data-test="student-list-item"]').then((items) => {
          expect(items[items.length - 1])
            .to.contain(newStudentData.name)
            .to.contain(newStudentData.email)
            .to.contain(newStudentData.course);
        });

        cy.wait(1000);
        cy.url().should("contain", "/students/list");

        cy.deleteStudent(studentId);
      });
    });

    signOut();
  });

  it("Caso de teste: Deletar aluno cadastrado", () => {
    signIn("admin", "admin");
    cy.wait(2000);

    cy.fixture("student").then((newStudentData) => {
      cy.createStudent(newStudentData).then((studentId) => {
        cy.wait(3000);

        cy.deleteStudent(studentId);

        cy.contains("Lista de alunos vazia").should("exist");
        cy.contains(
          "Você ainda não tem nenhum aluno cadastrado em sua plataforma."
        ).should("exist");
      });
    });

    signOut();
  });

  it("Caso de teste: Criar nova disciplina", () => {
    signIn("admin", "admin");
    cy.wait(2000);

    cy.fixture("professor").then((newProfessorData) => {
      cy.fixture("student").then((newStudentData) => {
        cy.fixture("subject").then((newSubjectData) => {
          cy.createProfessor(newProfessorData).then((professorId) => {
            cy.wait(2000);
            cy.createStudent(newStudentData).then((studentId) => {
              cy.wait(2000);
              cy.createSubject(newSubjectData, professorId);
              cy.wait(1000);

              cy.url().should("contain", "/subjects/list");

              cy.get('[data-test="subject-list-item"]').then((items) => {
                expect(items[items.length - 1])
                  .to.contain(newSubjectData.id)
                  .to.contain(newSubjectData.name);
              });

              cy.deleteProfessor(professorId);
              cy.deleteStudent(studentId);
              cy.deleteSubject(newSubjectData.id);
            });
          });
        });
      });
    });

    signOut();
  });

  it("Caso de teste: Deletando disciplina cadastrada", () => {
    signIn("admin", "admin");
    cy.wait(2000);

    cy.fixture("professor").then((newProfessorData) => {
      cy.fixture("student").then((newStudentData) => {
        cy.fixture("subject").then((newSubjectData) => {
          cy.createProfessor(newProfessorData).then((professorId) => {
            cy.createStudent(newStudentData).then((studentId) => {
              cy.createSubject(newSubjectData, professorId);
              cy.wait(3000);

              cy.deleteProfessor(professorId);
              cy.deleteStudent(studentId);
              cy.deleteSubject(newSubjectData.id);

              cy.contains("Lista de disciplinas vazia").should("exist");
              cy.contains(
                "Você ainda não tem nenhuma disciplina cadastrada em sua plataforma."
              ).should("exist");
            });
          });
        });
      });
    });

    signOut();
  });
});

const signIn = (email: string, password: string) => {
  cy.visit("/login");

  cy.fillLoginForm(email, password);

  cy.get('[data-test="login-button"]').click();

  cy.wait(2000);
};

const signOut = () => {
  cy.wait(2000);

  cy.get('[data-test="sign-out-button"]').click();
};
