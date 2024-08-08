'use strict'
import '@scss/app.scss'
import { bodyProperty, webLoaded, inputControls } from './vendors/webcontrols'

window.onunload = () => {
  window.scrollTo(0, 0)
}

webLoaded(function () {
  //  console.log('Loaded!')
  bodyProperty()
  // inputControls()
})
