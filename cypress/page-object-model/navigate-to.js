import { commonPageLocator } from "../utils/selectors/common-page";
export class NavigateTo {
  /**
   * Navigates to the given menu item in the sidebar navigation.
   * @param {string} menu - the menu item to navigate to
   */
  navigateTo(menu) {
    cy.get(commonPageLocator.sidebarNav).contains("span", menu).click();
  }
}

export const navigateTo = new NavigateTo();
