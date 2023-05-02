/* Modulo Cart */
import {
  initialLoad as initialLoadCart,
  orderFormUpdate as orderFormUpdateCart,
  stepStart as stepStartCart,
} from './modules/cart'
/* Modulo Email */
import {
  initialLoad as initialLoadEmail,
  orderFormUpdate as orderFormUpdateEmail,
  stepStart as stepStartEmail,
} from './modules/email'
/* Modulo Profile */
import {
  initialLoad as initialLoadProfile,
  orderFormUpdate as orderFormUpdateProfile,
  stepStart as stepStartProfile,
} from './modules/profile'
/* Submodule Resume */
import {
  initialLoad as initialLoadResume,
  orderFormUpdate as orderFormUpdateResume,
  stepStart as stepStartResume,
} from './modules/minicart-resume'
/* Modulo Shipping */
import {
  initialLoad as initialLoadShipping,
  orderFormUpdate as orderFormUpdateShipping,
  stepStart as stepStartShipping,
} from './modules/shipping'
/* Modulo Payments */
import {
  initialLoad as initialLoadPayments,
  orderFormUpdate as orderFormUpdatePayments,
  stepStart as stepStartPayments,
} from './modules/payment'
import type { OrderForm } from './typings/orderForm'
import type { InitialLoad } from './typings/InitialLoad'

interface HashFunctionMap {
  [key: string]: (_: HashChangeEvent) => void
  '#/cart': (_e: HashChangeEvent) => void
  '#/email': (_e: HashChangeEvent) => void
  '#/profile': (e: HashChangeEvent) => void
  '#/shipping': (_e: HashChangeEvent) => void
  '#/payment': (_e: HashChangeEvent) => void
}

/* Funciones que se ejecutan al cargar la página */
const initialLoad = (e: InitialLoad) => {
  initialLoadCart(e)
  initialLoadEmail(e)
  initialLoadProfile(e)
  initialLoadShipping(e)
  initialLoadPayments(e)
  initialLoadResume(e)
}

/* Funciones que se ejecutan al actualizar el carrito */
const onOrderFormUpdated = (_: any, orderForm: OrderForm) => {
  orderFormUpdateCart(orderForm)
  orderFormUpdateEmail(orderForm)
  orderFormUpdateProfile(orderForm)
  orderFormUpdateShipping(orderForm)
  orderFormUpdatePayments(orderForm)
  orderFormUpdateResume(orderForm)
}

/* Funciones que se ejecutan al cambiar de hash */
const hashToFunctionMap: HashFunctionMap = {
  '#/cart': stepStartCart,
  '#/email': stepStartEmail,
  '#/profile': (e: HashChangeEvent) => {
    stepStartProfile(e)
    stepStartResume(e)
  },
  '#/shipping': stepStartShipping,
  '#/payment': stepStartPayments,
}

const onHashChange = (e?: HashChangeEvent) => {
  const { hash } = window.location
  const hashFunction = hashToFunctionMap[hash]

  if (hashFunction) {
    try {
      hashFunction(e as HashChangeEvent)
    } catch (error) {
      console.error(`Error ejecutando la función para el hash "${hash}":`, error)
    }
  }
}

$(document).ready(initialLoad)
$(window).on('orderFormUpdated.vtex', onOrderFormUpdated)
$(window).on('load hashchange', (e: JQuery.TriggeredEvent<Window, undefined, Window, Window>) => {
  const originalEvent = e.originalEvent as HashChangeEvent | undefined

  onHashChange(originalEvent)
})
