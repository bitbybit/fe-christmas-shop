/**
 * @typedef {{
 *   cssClassNames: {
 *     item: string
 *     active: string
 *   }
 *   cssSelectors: {
 *     menu: string
 *   }
 *   onSwitchTab: (tab: string) => {}
 * }} TabConfig
 */

/**
 * @typedef {{
 *   menu: HTMLElement | null
 * }} TabElements
 */

export class Tabs {
  /**
   * @type {TabConfig}
   */
  #config

  /**
   * @type {TabElements}
   */
  #elements

  /**
   * @param {TabConfig} config
   */
  constructor ({
    cssClassNames,
    cssSelectors,
    onSwitchTab
  }) {
    this.#config = {
      cssClassNames,
      cssSelectors,
      onSwitchTab
    }

    this.#elements = {
      menu: document.querySelector(cssSelectors.menu)
    }

    this.#addClickHandler()
  }

  #addClickHandler() {
    if (this.#elements.menu === null) {
      return
    }

    this.#elements.menu.addEventListener('click', this.#clickHandler.bind(this))
  }

  /**
   * @param {Event} e
   */
  #clickHandler(e) {
    const tab = e.target.getAttribute('data-tab')

    if (tab !== null) {
      e.preventDefault()

      this.#toggleActiveItem(e.target)
      this.#switchActiveTab(tab)
    }
  }

  /**
   * @param {HTMLElement} target
   */
  #toggleActiveItem(target) {
    const { item, active } = this.#config.cssClassNames

    const elements = this.#elements.menu.querySelectorAll(`.${item}`)

    elements.forEach((element) => element.classList.remove(active))
    target.classList.add(active)
  }

  /**
   * @param {string} tab
   */
  #switchActiveTab(tab) {
    this.#config.onSwitchTab(tab)
  }
}
