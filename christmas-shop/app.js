import { Gifts } from 'service/Gifts.js'
import { Tabs } from 'service/Tabs.js'
import { Modal } from 'service/Modal.js'
import { Slider } from 'service/Slider.js'
import { Burger } from 'service/Burger.js'
import { Countdown } from 'service/Countdown.js'
import { Up } from 'service/Up.js'

const init = async function () {
  const modal = new Modal({
    cssClassNames: {
      close: 'modal__close'
    },

    cssSelectors: {
      modal: '.modal',
      picture: '.modal .card__picture',
      text: '.modal .card__text'
    },
  })

  const gifts = new Gifts({
    bestAmount: 4,

    categories: {
      all: {
        name: 'All',
        alias: 'all',
        picture: ''
      },
      work: {
        name: 'For Work',
        alias: 'work',
        picture: 'assets/common/gifts/gift-for-work.png'
      },
      health: {
        name: 'For Health',
        alias: 'health',
        picture: 'assets/common/gifts/gift-for-health.png'
      },
      harmony: {
        name: 'For Harmony',
        alias: 'harmony',
        picture: 'assets/common/gifts/gift-for-harmony.png'
      }
    },

    cssSelectors: {
      all: '.all-gifts .cards',
      best: '#best-gifts .cards'
    },

    onClickGift(meta) {
      modal.show(meta)
    }
  })

  await gifts.load()

  new Tabs({
    cssClassNames: {
      item: 'menu__link',
      active: 'menu__link--active'
    },

    cssSelectors: {
      menu: '.all-gifts__menu'
    },

    onSwitchTab(tab) {
      gifts.insertAll(tab)
    }
  })

  new Slider({
    clicks: {
      amount: 3,
      amountMobile: 6,
      maxSize: '768px'
    },

    cssClassNames: {
      disabled: 'button--disabled'
    },

    cssSelectors: {
      slider: '.slider',
      items: '.slider__items',
      left: '.slider__control--left',
      right: '.slider__control--right',
    }
  })

  new Burger({
    cssClassNames: {
      link: 'menu-burger__link'
    },

    cssSelectors: {
      burger: '.header__menu-burger',
      close: '.header__menu-close',
      menu: '.menu-burger'
    }
  })

  new Countdown({
    cssSelectors: {
      days: '.countdown__days',
      hours: '.countdown__hours',
      minutes: '.countdown__minutes',
      seconds: '.countdown__seconds'
    },

    date: new Date('2025-01-01')
  })

  new Up({
    cssClassNames: {
      visible: 'up--visible'
    },

    cssSelectors: {
      up: '.up',
    },

    maxSize: '768px'
  })
}

document.addEventListener('DOMContentLoaded', init)
