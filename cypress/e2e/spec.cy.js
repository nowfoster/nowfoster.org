describe("Apply to foster", () => {
  it("passes", () => {
    cy.visit("/")

    cy.findByRole("button", { name: "Could you foster?" })
  })
})
