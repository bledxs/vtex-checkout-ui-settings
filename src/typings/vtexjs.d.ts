import 'global'

import type { Address, Item, OrderForm, ShippingData } from './orderForm'
declare global {
  interface Window {
    vtexjs: {
      checkout: {
        orderForm: OrderForm
        sendAttachment: (
          attachmentId: string,
          attachment: string,
          expectedOrderFormSections: string[]
        ) => Promise<OrderForm>
        addToCart: (items: Item[], expectedOrderFormSections: string[], salesChannel: string) => Promise<OrderForm>
        updateItems: (items: Item[], expectedOrderFormSections: string[]) => Promise<OrderForm>
        removeItems: (items: Item[], expectedOrderFormSections: string[]) => Promise<OrderForm>
        removeAllItems: (expectedOrderFormSections: string[]) => Promise<OrderForm>
        calculateShipping: (address: Address) => Promise<OrderForm>
        simulateShipping: (
          shippingData: ShippingData,
          orderFormId: string,
          country: string,
          salesChannel: string
        ) => Promise<OrderForm>
        getAddressInformation: (address: Address) => Promise<OrderForm>
        getProfileByEmail: (email: string, salesChannel: string) => Promise<OrderForm>
        removeAccountId: (accountId: string, expectedOrderFormSections: string[]) => Promise<OrderForm>
        addDiscountCoupon: (couponCode: string, expectedOrderFormSections: string[]) => Promise<OrderForm>
        removeDiscountCoupon: (expectedOrderFormSections: string[]) => Promise<OrderForm>
        removeGiftRegistry: (expectedOrderFormSections: string[]) => Promise<OrderForm>
        addOffering: (offeringId: string, itemIndex: number, expectedOrderFormSections: string[]) => Promise<OrderForm>
        removeOffering: (
          offeringId: string,
          itemIndex: number,
          expectedOrderFormSections: string[]
        ) => Promise<OrderForm>
        addItemAttachment: (
          itemIndex: number,
          attachmentName: string,
          content: string,
          expectedOrderFormSections: string[],
          splitItem: boolean
        ) => Promise<OrderForm>
        removeItemAttachment: (
          itemIndex: number,
          attachmentName: string,
          content: string,
          expectedOrderFormSections: string[]
        ) => Promise<OrderForm>
        addBundleItemAttachment: (
          itemIndex: number,
          bundleItemId: string,
          attachmentName: string,
          content: string,
          expectedOrderFormSections: string[]
        ) => Promise<OrderForm>
        removeBundleItemAttachment: (
          itemIndex: number,
          bundleItemId: string,
          attachmentName: string,
          content: string,
          expectedOrderFormSections: string[]
        ) => Promise<OrderForm>
        sendLocale: (locale: string) => Promise<OrderForm>
        clearMessages: (expectedOrderFormSections: string[]) => Promise<OrderForm>
        getLogoutURL: () => Promise<string>
        getOrders: (orderGroupId: string) => Promise<OrderForm>
        changeItemsOrdination: (
          criteria: string,
          ascending: boolean,
          expectedOrderFormSections: string[]
        ) => Promise<OrderForm>
        replaceSKU: (items: Item[], expectedOrderFormSections: string[], splitItem: boolean) => Promise<OrderForm>
        finishTransaction: (orderGroupId: string, expectedOrderFormSections: string[]) => Promise<OrderForm>
      }
    }
  }
}

export const { vtexjs } = globalThis.window
