"use strict";

const { Sortable, html2canvas } = window

const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'

const uncategorized = document.querySelector('#uncategorized')
    , overlay = document.querySelector('#overlay')
    , save = document.querySelector('#save')
    , main = document.querySelector('#main')

save.addEventListener('click', () => {
  html2canvas(main).then(canvas => {
    const link = document.createElement('a')

    document.body.appendChild(link)
    link.download = 'categories.png';
    link.href = canvas.toDataURL('image/png')
    link.target = '_blank';
    link.click()
    document.body.removeChild(link)
  })
})

fetch('./config.json')
  .then(resp => resp.json())
  .then(({ items, numCategories }) => {
    if (items.length > keys.length) {
      const msg = 'Too many items added. Maximum number of items is ' + keys.length
      alert(msg)
      throw new Error(msg)
    }

    for (let i = 0; i < numCategories; i++) {
      const categoryEl = document.createElement('div')
      categoryEl.classList.add('category')

      categoryEl.innerHTML = `
      <h1>Category ${i + 1}</h1>
      <input type="text" placeholder="description of category..." />
      <ul id="col${i + 1}"></ul>
      `

      main.insertBefore(categoryEl, uncategorized)
    }

    main.style.gridTemplateColumns = `repeat(${numCategories}, ${100 / numCategories}%)`
    uncategorized.style.gridColumn = `span ${numCategories}`


    items.forEach((filename, i) => {
      const el = document.createElement('li')
          , img = document.createElement('img')

      el.classList.add('item')

      img.src = filename
      el.dataset.name = keys[i]

      el.appendChild(img)
      uncategorized.appendChild(el)

      el.addEventListener('dblclick', () => {
        overlay.classList.add('show')

        const imgCopy = img.cloneNode()

        overlay.appendChild(imgCopy)
      })
    })

    initializeSortable()
  })

overlay.addEventListener('click', () => {
  overlay.classList.remove('show')
  overlay.innerHTML = ''
})

function initializeSortable() {
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
}
