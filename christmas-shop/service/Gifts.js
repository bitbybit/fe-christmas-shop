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
 *   cssSelectors: {
 *     all: string
 *     best: string
 *   }
 * }} GiftConfig
 */

/**
 * @typedef {{
 *   all: HTMLElement | null
 *   best: HTMLElement | null
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
    cssSelectors,
  }) {
    this.#config = {
      bestAmount,
      categories,
      cssSelectors
    }

    this.#elements = {
      all: document.querySelector(cssSelectors.all),
      best: document.querySelector(cssSelectors.best)
    }
  }

  async load() {
    const response = await fetch(`gifts.json`)
    this.all = await response.json()

    this.insertBest()
    this.insertAll()
  }

  insertBest (isRandom = true) {
    if (this.#elements.best === null) {
      return
    }

    const gifts = (isRandom ? this.random : this.best)
      .slice(0, this.#config.bestAmount)

    this.#elements.best.innerHTML = this.#giftsToTemplate(gifts)
  }

  /**
   * @param {GiftCategoryAlias} category
   */
  insertAll (category = this.#config.categories.all.alias) {
    if (this.#elements.all === null) {
      return
    }

    switch (category) {
      case this.#config.categories.all.alias:
        this.#elements.all.innerHTML = this.#giftsToTemplate(this.all)
        break

      case this.#config.categories.work.alias:
        this.#elements.all.innerHTML = this.#giftsToTemplate(this.work)
        break

      case this.#config.categories.health.alias:
        this.#elements.all.innerHTML = this.#giftsToTemplate(this.health)
        break

      case this.#config.categories.harmony.alias:
        this.#elements.all.innerHTML = this.#giftsToTemplate(this.harmony)
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
