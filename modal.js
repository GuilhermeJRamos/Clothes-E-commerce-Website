import { addClassInElement, removeClassInElement } from './classManager'

export const containerModalCart = document.querySelector('#containerModalCart')

export const openModalCartAndRemoveScroll = () => {
  addClassInElement(containerModalCart, 'show')
  addClassInElement(document.body, 'noScroll')
}
export const closeModalCartAndAddScroll = () => {
  removeClassInElement(containerModalCart, 'show')
  removeClassInElement(document.body, 'noScroll')
}

export const isCartEmpty = () => {
  const ulCart = document.querySelector('.productsCartList')
  return ulCart.children.length > 0
}
