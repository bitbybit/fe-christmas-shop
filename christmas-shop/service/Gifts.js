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

export class Gifts {
  /**
   * @type {Gift[]}
   */
  all = []

  #categoryWork = 'For Work'
  #categoryHealth = 'For Health'
  #categoryHarmony = 'For Harmony'

  #selectorBestGifts = '#best-gifts .cards'
  #selectorAllGifts = '.all-gifts .cards'

  #pictureWork = 'assets/common/gifts/gift-for-work.png'
  #pictureHealth = 'assets/common/gifts/gift-for-health.png'
  #pictureHarmony = 'assets/common/gifts/gift-for-harmony.png'

  #styleModifierWork = 'work'
  #styleModifierHealth = 'health'
  #styleModifierHarmony = 'harmony'

  #bestAmount = 4

  async load() {
    const response = await fetch(`assets/gifts.json`)
    this.all = await response.json()

    this.insertBest()
    this.insertAll()
  }

  insertBest () {
    const element = document.querySelector(this.#selectorBestGifts)

    if (element === null) {
      return
    }

    element.innerHTML = this.#giftsToTemplate(this.best)
  }

  /**
   * @param {'all'|'work'|'health'|'harmony'} category
   */
  insertAll (category = 'all') {
    const element = document.querySelector(this.#selectorAllGifts)

    if (element === null) {
      return
    }

    switch (category) {
      case 'all':
        element.innerHTML = this.#giftsToTemplate(this.all)
        break

      case 'work':
        element.innerHTML = this.#giftsToTemplate(this.work)
        break

      case 'health':
        element.innerHTML = this.#giftsToTemplate(this.health)
        break

      case 'harmony':
        element.innerHTML = this.#giftsToTemplate(this.harmony)
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
      <a class="card" href="#">
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
      case this.#categoryWork:
        return this.#pictureWork

      case this.#categoryHarmony:
        return this.#pictureHarmony

      case this.#categoryHealth:
        return this.#pictureHealth

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
      case this.#categoryWork:
        return this.#styleModifierWork

      case this.#categoryHarmony:
        return this.#styleModifierHarmony

      case this.#categoryHealth:
        return this.#styleModifierHealth

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
    ).slice(0, this.#bestAmount)
  }

  /**
   * @returns {Gift[]}
   */
  get work () {
    return this.all.filter(({ category }) => category === this.#categoryWork)
  }

  /**
   * @returns {Gift[]}
   */
  get health () {
    return this.all.filter(({ category }) => category === this.#categoryHealth)
  }

  /**
   * @returns {Gift[]}
   */
  get harmony () {
    return this.all.filter(({ category }) => category === this.#categoryHarmony)
  }
}
