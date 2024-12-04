/**
 * @typedef {{
 *   cssClassNames: {
 *     disabled: string
 *   }
 *   cssSelectors: {
 *     slider: string
 *     items: string
 *     left: string
 *     right: string
 *   }
 *   clicks: {
 *     amount: number
 *     amountMobile: number
 *     maxSize: string
 *   }
 * }} SliderConfig
 */

/**
 * @typedef {{
 *   slider: HTMLElement | null
 *   items: HTMLElement | null
 *   left: HTMLElement | null
 *   right: HTMLElement | null
 * }} SliderElements
 */

export class Slider {
  /**
   * @type {SliderConfig}
   */
  #config

  /**
   * @type {SliderElements}
   */
  #elements

  /**
   * @param {SliderConfig} config
   */
  constructor ({
    clicks,
    cssClassNames,
    cssSelectors
  }) {
    this.#config = {
      clicks,
      cssClassNames,
      cssSelectors
    }

    this.#elements = {
      slider: document.querySelector(cssSelectors.slider),
      items: document.querySelector(cssSelectors.items),
      left: document.querySelector(cssSelectors.left),
      right: document.querySelector(cssSelectors.right)
    }

    this.#addClickHandlers()
    this.#addControlStateHandler()
    this.#addResizeHandler()
  }

  #addClickHandlers() {
    if (this.#elements.left === null || this.#elements.right === null) {
      return
    }

    this.#elements.left.addEventListener('click', this.#clickHandlerLeft.bind(this))
    this.#elements.right.addEventListener('click', this.#clickHandlerRight.bind(this))
  }

  #addControlStateHandler() {
    if (this.#elements.items === null) {
      return
    }

    this.#elements.items.addEventListener(
      'transitionend',
      this.#controlStateHandler.bind(this)
    );
  }

  #addResizeHandler() {
    window.addEventListener('resize', this.#resizeHandler.bind(this))
  }

  /**
   * @param {Event} e
   */
  #clickHandlerLeft(e) {
    e.preventDefault()

    this.#disableControls()
    this.#scrollToLeft()
  }

  /**
   * @param {Event} e
   */
  #clickHandlerRight(e) {
    e.preventDefault()

    this.#disableControls()
    this.#scrollToRight()
  }

  #controlStateHandler() {
    if (this.#elements.left === null || this.#elements.right === null) {
      return
    }

    if (this.#isScrolledToLeft) {
      this.#elements.left.classList.add(this.#config.cssClassNames.disabled)
    } else {
      this.#elements.left.classList.remove(this.#config.cssClassNames.disabled)
    }

    if (this.#isScrolledToRight) {
      this.#elements.right.classList.add(this.#config.cssClassNames.disabled)
    } else {
      this.#elements.right.classList.remove(this.#config.cssClassNames.disabled)
    }
  }

  #resizeHandler() {
    this.#scrollReset()
  }

  #disableControls() {
    this.#elements.left.classList.add(this.#config.cssClassNames.disabled)
    this.#elements.right.classList.add(this.#config.cssClassNames.disabled)
  }

  #scrollToLeft() {
    this.#itemsScrollLeft += this.#scrollPadding
  }

  #scrollToRight() {
    this.#itemsScrollLeft -= this.#scrollPadding
  }

  #scrollReset() {
    this.#itemsScrollLeft = 0
  }

  /**
   * @returns {CSSStyleDeclaration}
   */
  get #sliderComputedStyle () {
    if (this.#elements.slider === null) {
      throw new Error('Can not find config.cssSelectors.slider element')
    }

    return getComputedStyle(this.#elements.slider)
  }

  /**
   * @returns {number}
   */
  get #sliderPaddingLeft () {
    return parseFloat(this.#sliderComputedStyle.getPropertyValue('padding-left'))
  }

  /**
   * @returns {number}
   */
  get #sliderPaddingRight () {
    return parseFloat(this.#sliderComputedStyle.getPropertyValue('padding-right'))
  }

  /**
   * @returns {number}
   */
  get #sliderOffsetWidth () {
    if (this.#elements.slider === null) {
      return 0
    }

    return this.#elements.slider.offsetWidth
  }

  /**
   * @returns {number}
   */
  get #scrollWidth () {
    if (this.#elements.items === null) {
      return 0
    }

    return this.#elements.items.scrollWidth +
      this.#sliderPaddingLeft +
      this.#sliderPaddingRight
  }

  /**
   * @returns {number}
   */
  get #itemsScrollLeft () {
    if (this.#elements.items === null) {
      return 0
    }

    return this.#elements.items.offsetLeft - this.#sliderPaddingLeft
  }

  /**
   * @param {number} value
   */
  set #itemsScrollLeft (value) {
    if (this.#elements.items === null) {
      return
    }

    return this.#elements.items.style.left = `${value}px`
  }

  /**
   * @returns {number}
   */
  get #scrollOverflow () {
    return this.#scrollWidth - this.#sliderOffsetWidth
  }

  /**
   * @returns {number}
   */
  get #amountOfClicks () {
    const mediaQueryList = window.matchMedia(
      `(max-width: ${this.#config.clicks.maxSize})`
    )

    return mediaQueryList.matches ?
      this.#config.clicks.amountMobile :
      this.#config.clicks.amount
  }

  /**
   * @returns {number}
   */
  get #scrollPadding () {
    return Math.ceil(this.#scrollOverflow / this.#amountOfClicks)
  }

  /**
   * @returns {boolean}
   */
  get #isScrolledToLeft () {
    return this.#itemsScrollLeft === 0
  }

  /**
   * @returns {boolean}
   */
  get #isScrolledToRight () {
    return Math.abs(this.#itemsScrollLeft) >= Math.abs(this.#scrollOverflow)
  }
}
