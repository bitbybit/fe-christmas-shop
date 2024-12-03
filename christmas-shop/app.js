import { Gifts } from 'service/Gifts.js'

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
    cssClassNames: {
      menuItem: 'menu__link',
      menuItemActive: 'menu__link--active'
    },
    cssSelectors: {
      bestGifts: '#best-gifts .cards',
      allGifts: '.all-gifts .cards',
      menu: '.all-gifts__menu'
    }
  })

  await gifts.load()
}

document.addEventListener('DOMContentLoaded', init)
