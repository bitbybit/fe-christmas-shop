/**
 * @typedef {{
 *   name: string
 *   description: string
 *   category: string
 *   superpowers: {
 *     live: string
 *     create: string
 *     love: string
 *     dream: string
 *   }
 * }} Gift
 */

/**
 * @typedef {'all'|'work'|'health'|'harmony'} GiftCategoryAlias
 */

/**
 * @typedef {{
 *   name: string
 *   alias: GiftCategoryAlias
 *   picture: string
 * }} GiftCategory
 */

/**
 * @typedef {{
 *   bestAmount: number
 *   categories: {
 *     all: GiftCategory
 *     work: GiftCategory
 *     health: GiftCategory
 *     harmony: GiftCategory
 *   },
 *   cssClassNames: {
 *     menuItem: string
 *     menuItemActive: string
 *   },
 *   cssSelectors: {
 *     allGifts: string
 *     bestGifts: string
 *     menu: string
 *   }
 * }} GiftConfig
 */

/**
 * @typedef {{
 *   allGifts: HTMLElement | null
 *   bestGifts: HTMLElement | null
 *   menu: HTMLElement | null
 * }} GiftElements
 */

export class Gifts {
  /**
   * @type {Gift[]}
   */
  all = []

  /**
   * @type {GiftConfig}
   */
  #config

  /**
   * @type {GiftElements}
   */
  #elements

  /**
   * @param {GiftConfig} config
   */
  constructor ({
    bestAmount,
    categories,
    cssClassNames,
    cssSelectors,
  }) {
    this.#config = {
      bestAmount,
      categories,
      cssClassNames,
      cssSelectors
    }

    this.#elements = {
      allGifts: document.querySelector(cssSelectors.allGifts),
      bestGifts: document.querySelector(cssSelectors.bestGifts),
      menu: document.querySelector(cssSelectors.menu)
    }
  }

  async load() {
    const response = await fetch(`gifts.json`)
    this.all = await response.json()

    this.insertBest()
    this.insertAll()

    this.#addMenuClickHandler()
  }

  insertBest (isRandom = true) {
    if (this.#elements.bestGifts === null) {
      return
    }

    const gifts = (isRandom ? this.random : this.best)
      .slice(0, this.#config.bestAmount)

    this.#elements.bestGifts.innerHTML = this.#giftsToTemplate(gifts)
  }

  /**
   * @param {GiftCategoryAlias} category
   */
  insertAll (category = this.#config.categories.all.alias) {
    if (this.#elements.allGifts === null) {
      return
    }

    switch (category) {
      case this.#config.categories.all.alias:
        this.#elements.allGifts.innerHTML = this.#giftsToTemplate(this.all)
        break

      case this.#config.categories.work.alias:
        this.#elements.allGifts.innerHTML = this.#giftsToTemplate(this.work)
        break

      case this.#config.categories.health.alias:
        this.#elements.allGifts.innerHTML = this.#giftsToTemplate(this.health)
        break

      case this.#config.categories.harmony.alias:
        this.#elements.allGifts.innerHTML = this.#giftsToTemplate(this.harmony)
        break
    }
  }

  /**
   * @param {Gift} gift
   * @returns {string}
   */
  #giftToTemplate(gift) {
    const picture = this.#getPicture(gift)
    const styleModifier = this.#getStyleModifier(gift)

    return `
      <a class="card" data-category="${gift.category}" href="#">
        <img class="card__picture" src="${picture}" alt="${gift.category}">

        <div class="card__text">
          <h4 class="h4 card__header card__header--${styleModifier}">
            ${gift.category}
          </h4>

          <h3 class="h3">
            ${gift.name}
          </h3>
        </div>
      </a>
    `
  }

  /**
   * @param {Gift[]} gifts
   * @returns {string}
   */
  #giftsToTemplate(gifts) {
    return gifts.map(this.#giftToTemplate.bind(this)).join('')
  }

  /**
   * @param {Gift} gift
   * @returns {string}
   */
  #getPicture({ category }) {
    switch (category) {
      case this.#config.categories.work.name:
        return this.#config.categories.work.picture

      case this.#config.categories.harmony.name:
        return this.#config.categories.harmony.picture

      case this.#config.categories.health.name:
        return this.#config.categories.health.picture

      default:
        throw new Error(`Can not find a picture for a category ${category}`)
    }
  }

  /**
   * @param {Gift} gift
   * @returns {string}
   */
  #getStyleModifier({ category }) {
    switch (category) {
      case this.#config.categories.work.name:
        return this.#config.categories.work.alias

      case this.#config.categories.harmony.name:
        return this.#config.categories.harmony.alias

      case this.#config.categories.health.name:
        return this.#config.categories.health.alias

      default:
        throw new Error(`Can not find a style modifier for a category ${category}`)
    }
  }

  /**
   * @param {Gift} gift
   * @returns {number}
   */
  #getTotalSuperpowers(gift) {
    const values = Object.values(gift.superpowers)

    return values.reduce((total, value) => total + Number(value), 0)
  }

  #addMenuClickHandler() {
    if (this.#elements.menu === null) {
      return
    }

    this.#elements.menu.addEventListener('click', this.#menuClickHandler.bind(this))
  }

  /**
   * @param {Event} e
   */
  #menuClickHandler(e) {
    const tab = e.target.getAttribute('data-tab')

    if (tab === null) {
      return
    }

    e.preventDefault()

    this.#toggleActiveMenuItem(e.target)
    this.#switchActiveTab(tab)
  }

  /**
   * @param {HTMLElement} target
   */
  #toggleActiveMenuItem(target) {
    const items = this.#elements.menu.querySelectorAll(
      `.${this.#config.cssClassNames.menuItem}`
    )

    items.forEach((item) => {
      item.classList.remove(this.#config.cssClassNames.menuItemActive)
    })

    target.classList.add(this.#config.cssClassNames.menuItemActive)
  }

  /**
   * @param {GiftCategoryAlias} tab
   */
  #switchActiveTab(tab) {
    switch (tab) {
      case this.#config.categories.all.alias:
        this.insertAll()
        break

      case this.#config.categories.work.alias:
        this.insertAll(this.#config.categories.work.alias)
        break

      case this.#config.categories.health.alias:
        this.insertAll(this.#config.categories.health.alias)
        break

      case this.#config.categories.harmony.alias:
        this.insertAll(this.#config.categories.harmony.alias)
        break

      default:
        break
    }
  }

  /**
   * @returns {Gift[]}
   */
  get best () {
    return this.all.toSorted((a, b) =>
      this.#getTotalSuperpowers(b) - this.#getTotalSuperpowers(a)
    )
  }

  /**
   * @returns {Gift[]}
   */
  get random () {
    return this.all.toSorted(() =>
      Math.random() - 0.5
    )
  }

  /**
   * @returns {Gift[]}
   */
  get work () {
    return this.all.filter(
      ({ category }) => category === this.#config.categories.work.name
    )
  }

  /**
   * @returns {Gift[]}
   */
  get health () {
    return this.all.filter(
      ({ category }) => category === this.#config.categories.health.name
    )
  }

  /**
   * @returns {Gift[]}
   */
  get harmony () {
    return this.all.filter(
      ({ category }) => category === this.#config.categories.harmony.name
    )
  }
}
