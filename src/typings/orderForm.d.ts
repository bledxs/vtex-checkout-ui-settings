export interface OrderForm {
  allowManualPrice: boolean
  canEditData: boolean
  clientPreferencesData: ClientPreferenceData
  clientProfileData: ClientProfileData
  customData: CustomData
  giftRegistryData: GiftRegistryData
  ignoreProfileData: boolean
  isCheckedIn: boolean
  items: Item[]
  itemsOrdination: ItemOrdination[]
  loggedIn: boolean
  marketingData: MarketingData[]
  messages: []
  orderFormId: string
  paymentData: PaymentData[]
  ratesAndBenefitsData: RatesAndBenefitsData[]
  salesChannel: '1'
  selectableGifts: SelectableGift[]
  sellers: Seller[]
  shippingData: ShippingData
  storeId: StoreId[]
  storePreferencesData: StorePreferenceData[]
  totalizers: Totalizer[]
  userProfileId: string
  userType: string
  value: number
}

interface ClientPreferenceData {
  locale: string
  optinNewsLetter: boolean
}

interface ClientProfileData {
  email: string
  firstName: string
  lastName: string
  document: string
  documentType: string
  phone: string
  corporateName: string
  tradeName: string
  corporateDocument: string
  stateInscription: string
  corporatePhone: string
  isCorporate: boolean
}

interface CustomData {
  attachmentId: string
  customApps: CustomApp[]
}

interface CustomApp {
  fields: []
  id: string
  major: number
}

interface GiftRegistryData {
  giftRegistryId: string
  giftRegistryType: string
  giftRegistryTypeName: string
  addressId: string
  description: string
}

export interface Item {
  uniqueId: string
  id: string
  productId: string
  productRefId: string
  refId: string
  ean: string
  name: string
  skuName: string
  modalType: string
  parentItemIndex: number
  parentAssemblyBinding: string
  priceValidUntil: string
  tax: number
  price: number
  listPrice: number
  manualPrice: number
  manualPriceAppliedBy: string
  sellingPrice: number
  rewardValue: number
  isGift: boolean
  additionalInfo: AdditionalInfo
  dimension: string
  brandName: string
  brandId: string
  offeringInfo: string
  offeringType: string
  offeringTypeId: string
  preSaleDate: string
  productCategoryIds: string
  productCategories: string[]
  quantity: number
  seller: string
  sellerChain: string[]
  imageUrl: string
  detailUrl: string
  bundleItems: []
  type: string
  attachments: string[]
  attachmentOfferings: []
  offerings: []
  priceTags: PriceTag[]
  availability: string
  measurementUnit: string
  unitMultiplier: number
  manufacturerCode: string
  priceDefinition: PriceDefinition
}

interface AdditionalInfo {
  dimension: string
  brandName: string
  brandId: string
  offeringInfo: string
  offeringType: string
  offeringTypeId: string
}

interface PriceTag {
  name: string
  value: number
  rawValue: number
  isPercentual: boolean
  identifier: string
}

interface PriceDefinition {
  sellingPrice: SellingPrice[]
  total: number
}

interface SellingPrice {
  quantity: number
  value: number
}

interface ItemOrdination {
  criteria: string
  ascending: boolean
}

interface MarketingData {
  attachmentId: string
  coupon: string
  marketingTags: []
  utmCampaign: string
  utmMedium: string
  utmSource: string
  utmiCampaign: string
  utmiPart: string
  utmipage: string
}

interface PaymentData {
  giftCards: GiftCard[]
  giftCardMessages: []
  availableAccounts: AvailableAccount[]
  availableTokens: []
  installmentOptions: InstallmentOption[]
  paymentSystems: PaymentSystem[]
  payments: Payment[]
}

interface GiftCard {
  redemptionCode: string
  value: number
  balance: number
  name: string
  id: string
  inUse: boolean
  isSpecialCard: boolean
}

interface AvailableAccount {
  accountId: string
  paymentSystem: string
  paymentSystemName: string
  cardNumber: string
  availableAddresses: string[]
}

interface InstallmentOption {
  paymentSystem: string
  value: number
  installments: Installment[]
}

interface Installment {
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
}

interface PaymentSystem {
  id: number
  name: string
  groupName: string
  validator: Validator
  stringId: string
  template: string
  requiresDocument: boolean
  selected: boolean
  isCustom: boolean
  description: string
}

interface Validator {
  regex: string
  mask: string
  cardCodeRegex: string
  cardCodeMask: string
  weights: number[]
}

interface Payment {
  accountId: string
  bin: string
  installments: number
  paymentSystem: string
  referenceValue: number
  value: number
}

interface RatesAndBenefitsData {
  rateAndBenefitsIdentifiers: RateAndBenefitsIdentifier[]
  teaser: Teaser[]
}

interface RateAndBenefitsIdentifier {
  items: Item[]
}

interface Teaser {
  items: Item[]
}

interface SelectableGift {
  id: string
  availableQuantity: string
  availableGifts: AvailableGift[]
}

interface AvailableGift {
  items: Item[]
  isSelected: boolean
}

interface Seller {
  id: string
  name: string
  logo: string
}

export interface ShippingData {
  address: Address
  availableAddresses: Address[]
  logisticsInfo: LogisticsInfo[]
  selectedAddresses: Address[]
}

export interface Address {
  addressId: string
  addressType: string
  city: string
  complement: string
  country: string
  neighborhood: string
  number: string
  postalCode: string
  receiverName: string
  reference: string
  state: string
  street: string
}

interface LogisticsInfo {
  addressId: string
  itemIndex: number
  selectedDeliveryChannel: string
  selectedSla: string
  slas: Sla[]
}

interface Sla {
  availableDeliveryWindows: AvailableDeliveryWindow[]
  deliveryChannel: string
  deliveryIds: DeliveryId[]
  deliveryWindow: DeliveryWindow
  id: string
  lockTTL: string
  name: string
  price: number
  shippingEstimate: string
  shippingEstimateDate: string
  tax: number
}

interface AvailableDeliveryWindow {
  endDateUtc: string
  listprice: number
  startDateUtc: string
  tax: number
}

interface DeliveryId {
  courierId: string
  courierName: string
  dockId: string
  quantity: number
  warehouseId: string
}

interface DeliveryWindow {
  endDateUtc: string
  listprice: number
  startDateUtc: string
  tax: number
}

interface StoreId {
  storeId: string
}

interface StorePreferenceData {
  countryCode: string
  saveUserData: boolean
  templateOptions: TemplateOptions
  timeZone: string
  currencyCode: string
  currencyLocale: number
  currencySymbol: string
  currencyFormatInfo: CurrencyFormatInfo
}

interface TemplateOptions {
  toggleCorporate: boolean
}

interface CurrencyFormatInfo {
  currencyDecimalDigits: number
  currencyDecimalSeparator: string
  currencyGroupSeparator: string
  currencyGroupSize: number
  startsWithCurrencySymbol: boolean
}

interface Totalizer {
  id: string
  name: string
  value: number
}
