export class NavigateTo {
  navigateTo(menu) {
    cy.get("[data-v-6475d26d]").contains("span", menu).click();
  }
}

export const navigateTo = new NavigateTo();
