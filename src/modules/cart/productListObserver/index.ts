const watchProductList = () => {
  const targetNode = document?.querySelector('.full-cart .cart tbody')
  const config = { attributes: true, childList: true, subtree: true }

  const observer = new MutationObserver(processProductList)

  if (targetNode) {
    observer.observe(targetNode, config)
  }
}

let isProcessing = false
/**
 * The function processes the product list in the cart and executes functions for each product.
 * @returns Nothing is being returned explicitly in this code. The `processProductList` function is a
 * void function, meaning it does not return any value. However, it may execute some side effects, such
 * as modifying the DOM or logging errors to the console.
 */

const processProductList = () => {
  if (isProcessing) return

  isProcessing = true

  /* The `requestAnimationFrame` method is used to schedule a function to be executed before the next
 repaint of the browser. In this code, it is used to delay the execution of the code inside the
 function until the next repaint, which can improve performance and prevent unnecessary reflows. */
  requestAnimationFrame(() => {
    try {
      if (window.vtexjs?.checkout?.orderForm?.items) {
        const { items } = window.vtexjs?.checkout?.orderForm ?? { items: [] }

        if (items?.length) {
          const productItems = document.querySelectorAll('.full-cart .cart .product-item')

          productItems.forEach((_, _index) => {
            // TODO: In this loop, you can add functions that need to be executed for each product in the cart
            /*
             * Example:
             * renderPrices(items[index]) This function renders the prices for the product
             *
             */
          })
        }
      }
    } catch (error) {
      console.error("Error in 'processProductList' function: ", error)
    } finally {
      isProcessing = false
    }
  })
}

/**
 * This function watches for changes in the cart and processes the product list to execute functions
 * for each product in the cart.
 */

export default watchProductList
