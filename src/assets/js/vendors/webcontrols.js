//import { animate, inView } from 'motion'

import inView from 'in-view'
import Lenis from '@studio-freight/lenis'
export const BODY = document.body
export const HTML = document.querySelector('html')

export const webLoaded = (callback) => {
  window.addEventListener('DOMContentLoaded', (event) => {
    //Burger menu
    burggerMenu()

    //body scroll event
    srollDirection()

    //viewport checker
    viewPortChecker()

    // header logo
    //headerLogo()

    //smooth scroll
    smoothScroll()

    //Signature
    console.log(
      '%c Developed by PGS (http://pgsuae.com/)',
      'background: #45d98e; color: #fff;'
    )

    return callback()
  })
}

export const smoothScroll = () => {
  const lenis = new Lenis()

  // lenis.on('scroll', (e) => {
  //   console.log(e)
  // })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
}
export const tab = (callback) => {
  let tabGroup = document.querySelectorAll('[data-tab-group]'),
    tabContentGroup = document.querySelectorAll('[data-tab-content-group]'),
    tagGroupNames = []

  tabGroup.forEach((tab) => {
    let dataSet = tab.dataset.tabGroup,
      target_ = tab.dataset.tabClick,
      groupEl = document.querySelectorAll('[data-tab-group="' + dataSet + '"]'),
      groupActiveEl = document.querySelector(
        '[data-tab-group="' + dataSet + '"].active'
      ),
      selectedContent = ''

    tab.addEventListener('click', (el) => {
      el.preventDefault()

      if (tab != groupActiveEl) {
        // menu active
        groupEl.forEach((tabBtn) => {
          tabBtn.classList.remove('active')
        })
        tab.classList.add('active')

        //hide the other content
        tabContentGroup.forEach((tcontent) => {
          let targetID = tcontent.dataset.tabContent,
            targetGroup = tcontent.dataset.tabContentGroup

          if (targetGroup == dataSet) {
            if (targetID != target_) {
              tcontent.style.display = 'none'
              tcontent.classList.remove('active')
            } else {
              tcontent.style.display = 'block'
              tcontent.classList.add('active')

              selectedContent = targetID
            }
          }
        })
        document.querySelector('[data-tab-group="' + dataSet + '"].active')
      }

      return callback(selectedContent)
    })

    //group name list pushing
    if (!tagGroupNames.includes(dataSet)) tagGroupNames.push(dataSet)
  })

  tagGroupNames.forEach((tabeName) => {
    let firstTabLink = document.querySelectorAll(
      '[data-tab-group="' + tabeName + '"]'
    )[0]
    firstTabLink.click()
  })
}
export const viewPortChecker = () => {
  inView('[data-inView]')
    .on('enter', (el) => {
      el.classList.add('inView')
    })
    .on('exit', (el) => {
      //  el.classList.remove('inView')
    })
}
export const burggerMenu = () => {
  let burgerButto = document.querySelector('[data-burger-menu]')
  if (burgerButto) {
    burgerButto.addEventListener('click', () => {
      // let target_ = burgerButto.dataset.burgerMenu

      if (BODY.classList.contains('menuActive')) {
        BODY.classList.remove('menuActive')
        burgerButto.classList.remove('active')
      } else {
        BODY.classList.add('menuActive')
        burgerButto.classList.add('active')
      }
    })
  }
}

export const srollDirection = () => {
  let tempScrollPos = 0
  document.addEventListener('scroll', () => {
    let currentScrollY = window.scrollY

    currentScrollY > 10
      ? BODY.classList.add('scrolled')
      : BODY.classList.remove('scrolled')
    currentScrollY < tempScrollPos
      ? BODY.classList.add('scrolling_top')
      : BODY.classList.remove('scrolling_top')

    tempScrollPos = currentScrollY
  })
}

export const inputControls = () => {
  var fields = document.querySelectorAll(
    'input:-webkit-autofill,input:not([type]),input[type=text]:not(.browser-default),input[type=password]:not(.browser-default),input[type=email]:not(.browser-default),input[type=url]:not(.browser-default),input[type=time]:not(.browser-default), input[type=date]:not(.browser-default), input[type=datetime]:not(.browser-default), input[type=datetime-local]:not(.browser-default), input[type=tel]:not(.browser-default), input[type=number]:not(.browser-default), input[type=search]:not(.browser-default), textarea'
  )

  if (!fields) return

  fields.forEach(function (el) {
    if (el.value.length) {
      el.parentElement.classList.add('active')
    }

    el.addEventListener('focus', function () {
      el.parentElement.classList.add('active')
    })

    el.addEventListener('blur', function () {
      if (el.value.length) {
        el.parentElement.classList.add('active')
      } else {
        el.parentElement.classList.remove('active')
      }
    })
  })
}

export const bodyVariables = () => {
  // body varibales
  setTimeout(() => {
    let fel = document.querySelector('footer'),
      footerH = fel ? fel.clientHeight : 0,
      hel = document.querySelector('header'),
      headerH = hel ? hel.clientHeight : 90

    let r = document.querySelector('body')
    r.style.setProperty('--footerH', footerH + 'px')
    r.style.setProperty('--headerH', headerH + 'px')
  }, 500)
}

export const bodyProperty = () => {
  bodyVariables()
  addEventListener('resize', (event) => {
    bodyVariables()
  })

  const loaderTemp = document.querySelector('[data-loader]')
  setTimeout(() => BODY.classList.add('dom-loaded'), 400)

  if (loaderTemp) {
    setTimeout(() => loaderTemp.remove(), 1300)
  }
}

export const deviceList = () => {
  const responsiveWidth = window.innerWidth
  if (responsiveWidth < 767) {
    return 'sm'
  } else if (responsiveWidth > 767 && responsiveWidth < 1200) {
    return 'md'
  } else {
    return 'lg'
  }
}

export const headerLogo = () => {
  if (deviceList() == 'sm') {
    const head = document.querySelector('header')

    setInterval(() => {
      head.classList.toggle('logoSwap')
    }, 5000)
  }
}
