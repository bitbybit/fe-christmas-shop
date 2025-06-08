/**
 * @typedef {{
 *   cssClassNames: {
 *     close: string
 *   }
 *   cssSelectors: {
 *     modal: string
 *     picture: string
 *     text: string
 *   }
 * }} ModalConfig
 */

/**
 * @typedef {{
 *   modal: HTMLElement | null
 *   picture: HTMLElement | null
 *   text: HTMLElement | null
 * }} ModalElements
 */

export class Modal {
  /**
   * @type {ModalConfig}
   */
  #config

  /**
   * @type {ModalElements}
   */
  #elements

  /**
   * @param {ModalConfig} config
   */
  constructor ({
    cssClassNames,
    cssSelectors
  }) {
    this.#config = {
      cssClassNames,
      cssSelectors
    }

    this.#elements = {
      modal: document.querySelector(cssSelectors.modal),
      picture: document.querySelector(cssSelectors.picture),
      text: document.querySelector(cssSelectors.text)
    }

    this.#addClickHandler()
  }

  #addClickHandler() {
    if (this.#elements.modal === null) {
      return
    }

    this.#elements.modal.addEventListener('click', this.#clickHandler.bind(this))
  }

  /**
   * @param {Event} e
   */
  #clickHandler(e) {
    const isClickedBackdrop = e.target === this.#elements.modal

    const isClickedClose =
      e.target.classList.contains(this.#config.cssClassNames.close) ||
      e.target.parentElement.classList.contains(this.#config.cssClassNames.close)

    if (isClickedBackdrop || isClickedClose) {
      e.preventDefault()

      this.hide()
    }
  }

  /**
   * @param {GiftMeta} meta
   */
  show(meta) {
    if (
      this.#elements.picture === null ||
      this.#elements.text === null
    ) {
      return
    }

    this.#elements.picture.src = meta.picture
    this.#elements.text.innerHTML = this.#metaToTemplate(meta)

    document.body.classList.add('modal-opened')
  }

  hide() {
    document.body.classList.remove('modal-opened')
  }

  /**
   * @param {GiftMeta} meta
   */
  #metaToTemplate (meta) {
    const superpowers = this.#superpowersToTemplate(meta.superpowers)

    return `
      <h4 class="h4 card__header card__header--${meta.styleModifier}">
        ${meta.category}
      </h4>

      <h3 class="h3">
        ${meta.name}
      </h3>

      <p class="card__description">
        ${meta.description}
      </p>

      <div class="card__info">
        <h4 class="h4">Adds superpowers to:</h4>

        <div class="card__superpowers">
          ${superpowers}
        </div>
      </div>
    `
  }

  /**
   * @param {GiftMeta['superpowers']} superpowers
   */
  #superpowersToTemplate (superpowers) {
    const entries = Object.entries(superpowers)

    let template = ''

    entries.forEach((entry) => {
      template += this.#superpowerToTemplate(entry)
    })

    return template
  }

  /**
   * @param {string[]} entry
   */
  #superpowerToTemplate ([superpower, rating]) {
    const stars = this.#ratingToTemplate(rating)

    return `
      <div class="card__superpower">
        <div>${superpower}</div>

        <div class="card__rating">
          <span>${rating}</span>

          <div class="card__stars">
            ${stars}
          </div>
        </div>
      </div>
    `
  }

  /**
   * @param {string} rating
   */
  #ratingToTemplate (rating) {
    const amount = Number(rating) / 100

    let template = ''

    for (let i = 0; i < 5; i++) {
      const isDisabled = i + 1 > amount
      const cssClasses = isDisabled ? 'card__star card__star--disabled' : 'card__star'

      template += `
        <img class="${cssClasses}" src="assets/common/modal/snowflake.svg" alt="Star">
      `
    }

    return template
  }
}
