import watchProductList from './productListObserver'

import type { InitialLoad } from '@/typings/InitialLoad'
import type { OrderForm } from '@/typings/orderForm'

/**
 * This function is called when the document is ready.
 *
 */
export const initialLoad = (_e: InitialLoad) => {
  // ...
  watchProductList()
}

/**
 * This function is called every time the orderForm is updated.
 *
 */
export const orderFormUpdate = (_orderForm: OrderForm) => {
  // ...
}

/**
 * This function is called when the hash in the URL matches this module.
 *
 */
export const stepStart = (_e: HashChangeEvent) => {
  // ...
}
