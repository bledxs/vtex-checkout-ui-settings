/* Cart Module */
import {
  initialLoad as initialLoadCart,
  orderFormUpdate as orderFormUpdateCart,
  stepStart as stepStartCart,
} from './modules/cart'
/*  Email Module */
import {
  initialLoad as initialLoadEmail,
  orderFormUpdate as orderFormUpdateEmail,
  stepStart as stepStartEmail,
} from './modules/email'
/* Resume Submodule */
import {
  initialLoad as initialLoadResume,
  orderFormUpdate as orderFormUpdateResume,
  stepStart as stepStartResume,
} from './modules/minicart-resume'
/* Payment Module */
import {
  initialLoad as initialLoadPayments,
  orderFormUpdate as orderFormUpdatePayments,
  stepStart as stepStartPayments,
} from './modules/payment'
/* Profile Module */
import {
  initialLoad as initialLoadProfile,
  orderFormUpdate as orderFormUpdateProfile,
  stepStart as stepStartProfile,
} from './modules/profile'
/* Shipping Module */
import {
  initialLoad as initialLoadShipping,
  orderFormUpdate as orderFormUpdateShipping,
  stepStart as stepStartShipping,
} from './modules/shipping'

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

/**
 * The function "initialLoad" calls several other functions to load various aspects of a user's
 * profile.
 * @param {InitialLoad} e - The parameter "e" is of type "InitialLoad", which is likely an interface or
 * type defined elsewhere in the codebase. It is being passed as an argument to the function
 * "initialLoad", which then calls several other functions and passes "e" as an argument to each of
 * them.
 */

const initialLoad = (e: InitialLoad) => {
  initialLoadCart(e)
  initialLoadEmail(e)
  initialLoadProfile(e)
  initialLoadShipping(e)
  initialLoadPayments(e)
  initialLoadResume(e)
}

/**
 * The function updates various sections of an order form based on the input orderForm object.
 * @param {unknown} _ - The underscore (_) is a placeholder for a parameter that is not being used in
 * the function. It is a convention to use underscore as a parameter name when the value is not needed
 * in the function.
 * @param {OrderForm} orderForm - `orderForm` is an object that represents the current state of an
 * order form. It contains various properties such as the customer's personal information, shipping and
 * payment details, and the items in the cart. The `onOrderFormUpdated` function is a callback function
 * that is triggered whenever the order form
 */
const onOrderFormUpdated = (_: unknown, orderForm: OrderForm) => {
  orderFormUpdateCart(orderForm)
  orderFormUpdateEmail(orderForm)
  orderFormUpdateProfile(orderForm)
  orderFormUpdateShipping(orderForm)
  orderFormUpdatePayments(orderForm)
  orderFormUpdateResume(orderForm)
}

/* `hashToFunctionMap` is a constant object that maps specific hash values to corresponding functions.
Each key in the object represents a hash value, and each value is a function that should be executed
when the hash value matches the current URL hash. The functions are imported from various modules
and are responsible for updating different sections of an order form. The `HashFunctionMap`
interface defines the structure of this object, ensuring that each key is a string and each value is
a function that takes a `HashChangeEvent` as an argument. */
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

/**
 * This function listens for changes in the URL hash and executes the corresponding function if it
 * exists in a hash-to-function map.
 * @param {HashChangeEvent} [e] - The parameter "e" is an optional parameter of type HashChangeEvent.
 * It represents the event object that is passed to the onHashChange function when the hash in the URL
 * changes. If the hash change event is triggered, this parameter will contain information about the
 * event, such as the old and new hash
 */
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
