describe("Counter Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("should increment count when clicked", () => {
    cy.get("[data-testid='count']").should("contain", "Count: 0");
    cy.get("[data-testid='increment']").click();
    cy.get("[data-testid='count']").should("contain", "Count: 1");
  });
});
