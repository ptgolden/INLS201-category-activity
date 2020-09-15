"use strict";

const { Sortable } = window

const images = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  '1', '2', '3', '4',
]

const uncategorized = document.querySelector('#uncategorized')
    , overlay = document.querySelector('#overlay')

images.forEach(name => {
  const el = document.createElement('li')
      , img = document.createElement('img')

  el.classList.add('item')

  img.src = `images/${name}.png`
  el.dataset.name = name;

  el.appendChild(img)
  uncategorized.appendChild(el)

  el.addEventListener('dblclick', e => {
    overlay.classList.add('show')

    const imgCopy = img.cloneNode()

    overlay.appendChild(imgCopy)
  })
})

overlay.addEventListener('click', () => {
  overlay.classList.remove('show')
  overlay.innerHTML = ''
})

Sortable.create(uncategorized, {
  group: {
    name: 'items',
    push: true,
    pull: true,
  },
})


Array.from(document.querySelectorAll('.category ul')).forEach(el => {
  Sortable.create(el, {
    group: {
      name: 'items',
      push: true,
      pull: true,
    },
  })
})
