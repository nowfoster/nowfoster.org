describe("empty spec", () => {
  it("passes", () => {
    cy.visit("/")

    cy.findByRole("heading")
  })
})
