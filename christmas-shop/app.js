import { Gifts } from 'service/Gifts.js'

const init = async function () {
  const gifts = new Gifts()

  await gifts.load()
}

document.addEventListener('DOMContentLoaded', init)
