describe("Apply to foster", () => {
  it("passes", () => {
    cy.visit("/")

    cy.findByRole("button", { name: "Explore more" })
  })
})
