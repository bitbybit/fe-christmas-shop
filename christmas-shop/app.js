import { Gifts } from 'service/Gifts.js'
import { Tabs } from 'service/Tabs.js'

const init = async function () {
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
}

document.addEventListener('DOMContentLoaded', init)
