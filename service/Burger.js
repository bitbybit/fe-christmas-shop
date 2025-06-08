/**
 * @typedef {{
 *   cssClassNames: {
 *     link: string
 *   }
 *   cssSelectors: {
 *     burger: string
 *     close: string
 *     menu: string
 *   }
 * }} BurgerConfig
 */

/**
 * @typedef {{
 *   burger: HTMLElement | null
 *   close: HTMLElement | null
 *   menu: HTMLElement | null
 * }} BurgerElements
 */

export class Burger {
  /**
   * @type {BurgerConfig}
   */
  #config

  /**
   * @type {BurgerElements}
   */
  #elements

  /**
   * @param {BurgerConfig} config
   */
  constructor({
    cssClassNames,
    cssSelectors
  }) {
    this.#config = {
      cssClassNames,
      cssSelectors
    }

    this.#elements = {
      burger: document.querySelector(cssSelectors.burger),
      close: document.querySelector(cssSelectors.close),
      menu: document.querySelector(cssSelectors.menu)
    }

    this.#addClickHandlers()
  }

  #addClickHandlers() {
    if (this.#elements.burger === null || this.#elements.close === null) {
      return
    }

    this.#elements.burger.addEventListener('click', this.#clickBurgerHandler.bind(this))
    this.#elements.close.addEventListener('click', this.#clickCloseHandler.bind(this))
    this.#elements.menu.addEventListener('click', this.#clickMenuHandler.bind(this))
  }

  /**
   * @param {Event} e
   */
  #clickBurgerHandler(e) {
    e.preventDefault()

    this.#show()
  }

  /**
   * @param {Event} e
   */
  #clickCloseHandler(e) {
    e.preventDefault()

    this.#hide()
  }

  /**
   * @param {Event} e
   */
  #clickMenuHandler(e) {
    const { link } = this.#config.cssClassNames

    const isLink = e.target.classList.contains(link)

    if (isLink) {
      this.#hide()
    }
  }

  #show() {
    document.body.classList.add('menu-burger-opened')
  }

  #hide() {
    document.body.classList.remove('menu-burger-opened')
  }
}
