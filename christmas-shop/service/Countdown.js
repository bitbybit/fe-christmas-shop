/**
 * @typedef {{
 *   cssSelectors: {
 *     days: string
 *     hours: string
 *     minutes: string
 *     seconds: string
 *   }
 *   date: Date
 * }} CountdownConfig
 */

/**
 * @typedef {{
 *   days: HTMLElement | null
 *   hours: HTMLElement | null
 *   minutes: HTMLElement | null
 *   seconds: HTMLElement | null
 * }} CountdownElements
 */

export class Countdown {
  /**
   * @type {CountdownConfig}
   */
  #config

  /**
   * @type {CountdownElements}
   */
  #elements

  /**
   * @type {number}
   */
  #interval

  /**
   * @type {number}
   */
  #seconds = 0

  /**
   * @param {CountdownConfig} config
   */
  constructor ({ cssSelectors, date }) {
    this.#config = {
      cssSelectors,
      date
    }

    this.#elements = {
      days: document.querySelector(cssSelectors.days),
      hours: document.querySelector(cssSelectors.hours),
      minutes: document.querySelector(cssSelectors.minutes),
      seconds: document.querySelector(cssSelectors.seconds),
    }

    this.#start()
  }

  #start() {
    if (
      this.#elements.days === null ||
      this.#elements.hours === null ||
      this.#elements.minutes === null ||
      this.#elements.seconds === null) {
      return
    }

    const diff = this.#config.date.getTime() - (new Date()).getTime()

    this.#seconds = Math.floor(diff / 1000)
    this.#interval = setInterval(this.#update.bind(this), 1000)
  }

  #update() {
    if (this.#seconds < 0) {
      clearInterval(this.#interval);
    }

    const days = Math.floor(this.#seconds / (3600 * 24))
    const hours = Math.floor((this.#seconds % (3600 * 24)) / 3600)
    const minutes = Math.floor((this.#seconds % 3600) / 60)
    const seconds = Math.floor(this.#seconds % 60)

    this.#elements.days.innerText = String(days)
    this.#elements.hours.innerText = String(hours)
    this.#elements.minutes.innerText = String(minutes)
    this.#elements.seconds.innerText = String(seconds)

    this.#seconds -= 1
  }
}
