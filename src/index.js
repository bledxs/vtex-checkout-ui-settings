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
} from './modules/shipping/shipping'
/* Modulo Payments */
import {
  initialLoad as initialLoadPayments,
  orderFormUpdate as orderFormUpdatePayments,
  stepStart as stepStartPayments,
} from './modules/payment'

/* Funciones que se ejecutan al cargar la página */
const initialLoad = (e) => {
  initialLoadCart(e)
  initialLoadEmail(e)
  initialLoadProfile(e)
  initialLoadShipping(e)
  initialLoadPayments(e)
  initialLoadResume(e)
}

/* Funciones que se ejecutan al actualizar el carrito */
const onOrderFormUpdated = (_, orderForm) => {
  orderFormUpdateCart(orderForm)
  orderFormUpdateEmail(orderForm)
  orderFormUpdateProfile(orderForm)
  orderFormUpdateShipping(orderForm)
  orderFormUpdatePayments(orderForm)
  orderFormUpdateResume(orderForm)
}

/* Funciones que se ejecutan al cambiar de hash */
const hashToFunctionMap = {
  '#/cart': stepStartCart,
  '#/email': stepStartEmail,
  '#/profile': (e) => {
    stepStartProfile(e)
    stepStartResume(e)
  },
  '#/shipping': stepStartShipping,
  '#/payment': stepStartPayments,
}

const onHashChange = () => {
  const { hash } = window.location
  const hashFunction = hashToFunctionMap[hash]

  if (hashFunction) {
    try {
      hashFunction()
    } catch (error) {
      console.error(
        `Error ejecutando la función para el hash "${hash}":`,
        error
      )
    }
  }
}

$(document).ready(initialLoad)
$(window).on('orderFormUpdated.vtex', onOrderFormUpdated)
$(window).on('load hashchange', onHashChange)
