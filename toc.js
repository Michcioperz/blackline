class BlacklineElement {
  constructor (element) {
    if (element.getAttribute('data-blackline') === null) {
      throw new Error('Trying to create Blackline element that shouldn\'t: ' + element)
    }
    if (element.getAttribute('for') !== null) {
      this.checkElement = document.querySelector(element.getAttribute('for'))
    } else {
      this.checkElement = element
    }
    this.listElement = document.createElement('li')
    this.listAnchor = document.createElement('a')
    this.listAnchor.textContent = (element.getAttribute('data-blackline') === '' ? element.textContent : element.getAttribute('data-blackline'))
    this.listElement.appendChild(this.listAnchor)
    this.isOnScreen = undefined
    this.refresh()
  }
  refresh () {
    let isOnScreen = isElementOnScreen(this.checkElement)
    if (isOnScreen !== this.isOnScreen) {
      if (isOnScreen) {
        this.isVisibleNow()
      } else {
        this.isHiddenNow()
      }
      this.isOnScreen = isOnScreen
    }
  }
  isVisibleNow () {
    this.listAnchor.style.fontSize = 'large'
  }
  isHiddenNow () {
    this.listAnchor.style.fontSize = 'small'
  }
}

class BlacklineTOC {
  constructor (options) {
    this.searchRoot = (options.searchRoot === undefined ? document.body : options.searchRoot)

    this.headers = document.querySelectorAll('[data-blackline]')

    this.tableRoot = document.createElement('nav')
    this.tableRoot.style.position = 'fixed'
    this.tableRoot.style.right = '1em'
    this.tableRoot.style.top = '1em'
    this.tableRoot.style.display = 'block'
    document.body.appendChild(this.tableRoot)
    this.tableTitle = document.createElement('strong')
    this.tableTitle.textContent = 'Table of contents'
    this.tableRoot.appendChild(this.tableTitle)
    this.headersList = document.createElement('ol')
    this.tableRoot.appendChild(this.headersList)
    this.elements = []
    for (let header of this.headers) {
      let newElem = new BlacklineElement(header)
      this.elements.push(newElem)
      this.headersList.appendChild(newElem.listElement)
    }
    window.addEventListener('scroll', this.refresh.bind(this))
  }
  refresh () {
    for (let elem of this.elements) {
      elem.refresh()
    }
  }
}

const blackline = new BlacklineTOC({})
