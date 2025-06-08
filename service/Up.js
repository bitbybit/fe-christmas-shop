/**
 * @typedef {{
 *   cssClassNames: {
 *     visible: string
 *   }
 *   cssSelectors: {
 *     up: string
 *   },
 *   maxSize: string
 * }} UpConfig
 */

/**
 * @typedef {{
 *   up: HTMLElement | null
 * }} UpElements
 */

export class Up {
  /**
   * @type {UpConfig}
   */
  #config

  /**
   * @type {UpElements}
   */
  #elements

  /**
   * @type {number}
   */
  #offset = 300

  /**
   * @param {UpConfig} config
   */
  constructor ({
    cssClassNames,
    cssSelectors,
    maxSize
  }) {
    this.#config = {
      cssClassNames,
      cssSelectors,
      maxSize
    }

    this.#elements = {
      up: document.querySelector(cssSelectors.up)
    }

    this.#addScrollHandler()
  }

  #addScrollHandler() {
    if (this.#elements.up === null) {
      return
    }

    window.addEventListener('scroll', this.#scrollHandler.bind(this))
  }

  #scrollHandler() {
    const mediaQueryList = window.matchMedia(
      `(max-width: ${this.#config.maxSize})`
    )

    if (!mediaQueryList.matches) {
      return
    }

    if (document.documentElement.scrollTop >= this.#offset) {
      this.#elements.up.classList.add(this.#config.cssClassNames.visible)
    } else {
      this.#elements.up.classList.remove(this.#config.cssClassNames.visible)
    }
  }
}
