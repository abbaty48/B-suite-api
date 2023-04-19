import { buildSchema } from 'graphql';

const Enums = `#graphql
  "Sorting order in ascending or descending"
  enum Sort {
    Asc
    Desc
  }

   "Staff Roles previleges this includes Admin, Saller, Manager, Warehouse, Accountant"
   enum StaffRole {
      "Admin Role : Admin has every previlege to ADD,READ,DELETE,EDIT"
      Admin
      "Saller Role : A saller has only the previlege to ADD,READ,EDIT a Sale only."
      Saller
      "Manage Role : Manager has every previlege to ADD,READ,DELETE,EDIT except can not make a sale"
      Manager
      "Warehouse Role : A warehouse staff has every previlege to ADD,READ,DELETE,EDIT on Warehouse only."
      Warehouse
      "Accountant Role : Accountant staff has every previlege to ADD,READ,DELETE,EDIT except to delete a Admin/Manager staff."
      Accountant
   }
`;

const Commons = `#graphql
   "Timestamps of an action."
   type Timestamps {
      "An Iso created date of an action: YYYY:MM:DDTHH:MM:SS.MILISECONDS+00:00"
      createdAt: String!
      "An Iso updated date of an action: YYYY:MM:DDTHH:MM:SS.MILISECONDS+00:00"
      updatedAt: String!
      "A unix number representing date of an action"
      currentTime: Int
   }
   "Pagination inputs"
   input paginInput {
      "Limit: maximum number of data to return"
      limit: Int
      "Sort: sort the result in Asc (ascending) or Desc (descending) order"
      sort: Sort
      "PageIndex: page index "
      pageIndex: Int
   }
   type Pagins {
      sort: String
      totalPaginated: Int
      totalDocuments: Int
      nextPageIndex: Int
      currentPageIndex: Int
   }
`;

const Feature = `#graphql 
   type Feature {
      size: Int
      url: String
      fileName: String
      filePath: String
      extension: String
   }
   enum FeatureEditAction {
      ADD
      REMOVE
   }
   input editFeature {
      action: FeatureEditAction!
      addFeatureURI: [String!]
      removeFeatureByName: String
   }
`;

const Staff = `#graphql
type Staff {
  staffID: ID!
  firstName: String!
  lastName: String!
  otherName: String
  picture: Feature
  email: String
  phoneNumber: String
  role: StaffRole!
  address: String
  password: String!
  token: String!
  warehouse: Warehouse
}
type StaffPayload {
  error: String
  staff: Staff
}
type StaffsPayload {
  error: String
  staffs: [Staff!]!
  pagin: Pagins
}
type StaffAddPayload {
  error: String
  added: Boolean!
  newAdded: Staff
}
type StaffEditPayload {
  error: String
  edited: Boolean!
  newEdited: Staff
}
type StaffDeletePayload {
  error: String
  deleted: Boolean!
}
input staffAddInput {
  firstName: String!
  lastName: String!
  otherName: String
  featureURI: String
  email: String
  role: StaffRole!
  address: String
  phoneNumber: String!
  password: String!
  warehouseID: ID
}
input staffEditInput {
  staffID: ID!
  firstName: String
  lastName: String
  otherName: String
  email: String
  role: StaffRole
  address: String
  phoneNumber: String
  password: String
  warehouseID: ID
  editFeature: editFeature
}
input searchStaffInput {
  staffID: ID
  firstName: String
  lastName: String
  warehouseID: ID
}
`;

const Product = `#graphql
type Product {
  productID: ID!
  name: String!
  inStock: Boolean!
  expired: Boolean
  quantity: Int!
  category: Category!
  expirationDate: String
  wholesalePrice: Float!
  retailPrice: Float!
  features: [Feature]
  description: String
  warehouses: [Warehouse!]
}
type ProductPayload {
  error: String
  product: Product
}
type ProductsPayload {
  error: String
  pagins: Pagins
  products: [Product!]!
}
type ProductAddPayload {
  error: String
  added: Boolean
  newAdded: Product
}
type ProductEditPayload {
  error: String
  edited: Boolean!
  newEdited: Product
}
type ProductDeletePayload {
  error: String
  deleted: Boolean!
}
input productAddInput {
  name: String!
  quantity: Int!
  expirationDate: String
  warehouseIDs: [ID!]
  categoryID: ID!
  retailPrice: Float!
  wholesalePrice: Float!
  featuresURI: [String!]
  description: String
}

input productEditInput {
  productID: ID!
  name: String
  expirationDate: String
  warehouseIDs: [ID!]
  categoryID: ID
  retailPrice: Float
  wholesalePrice: Float
  description: String
  editFeatures: editFeature
}

input searchProductInput {
  productID: ID
  name: String
  quantity: Int
  expirationDate: String
  warehouseID: ID
  expired: Boolean
  inStock: Boolean
  categoryID: ID
  retailPrice: Float
  wholesalePrice: Float
}
`;

const Category = `#graphql
type Category {
  name: String!
}
type CategoryAddPayload {
  error: String
  added: Boolean!
  newAdded: String
}
type CategoryEditPayload {
  error: String
  edited: Boolean!
  newValue: String
  oldValue: String!
}
type CategoryDeletePayload {
  error: String
  deleted: Boolean!
}
input categoryAddInput {
  name: String
}
input categoryEditInput {
  oldCategory: String!
  newCategory: String!
}
type categoryPayload {
  error: String
}
`;

const Warehouse = `#graphql
type Warehouse {
  warehouseID: ID!
  name: String
  address: String!
  staffIDs: [ID!]!
  productIDs: [ID!]!
  staffs: [Staff!]!
  products: [Product!]!
}
type WarehousePayload {
  error: String
  warehouse: Warehouse
}
type WarehousesPayload {
  error: String
  warehouses: [Warehouse!]!
}
type WarehouseAddPayload {
  error: String
  added: Boolean!
  newAdded: Warehouse
}
type WarehouseEditPayload {
  error: String
  edited: Boolean!
  newEdited: Warehouse
}
type WarehouseDeletePayload {
  error: String
  deleted: Boolean!
}
type AddWarehouseStaffPayload {
  error: String
  added: Boolean!
}

input warehouseAddInput {
  name: String!
  address: String!
  staffIDs: [ID!]
  productIDs: [ID!]
}
input warehouseEditInput {
  warehouseID: ID!
  name: String
  address: String
  staffIDs: [ID!]
  productIDs: [ID!]
}
input warehouseSearchInput {
  warehouseID: ID
  name: String
  address: String
}
`;

const Sale = `#graphql
type Sale {
  saleID: ID!
  staffID: ID!
  customerID: ID!
  warehouseID: ID
  date: String!
  time: String!
  kind: String!
  discount: Float
  profit: SaleProfit
  paid: Float!
  balance: Float!
  totalPrice: Float!
  totalQuantity: Int!
  staff: Staff!
  customer: Customer!
  warehouse: Warehouse
  products: [SaleProduct!]!
}
type SaleProduct {
  productID: ID!
  name: String!
  images: [String]
  inStock: Boolean!
  expired: Boolean
  quantity: Int!
  kind: String!
  subTotal: Float!
  category: Category!
  expirationDate: String
  wholesalePrice: Float!
  retailPrice: Float!
  description: String
  warehouse: Warehouse
}
type SaleProfit {
  percentage: Float!
  status: String!
}
type SalePayload {
  error: String
  sale: Sale
}
type SalesPayload {
  error: String
  sales: [Sale!]!
  pagins: Pagins
}
type SaleAddPayload {
  error: String
  added: Boolean
  newAdded: Sale
}
type SaleEditPayload {
  error: String
  edited: Boolean
  newEdited: Sale
}
type SaleDeletePayload {
  error: String
  deleted: Boolean!
}
input saleProductMetaInput {
  productID: ID!
  quantity: Int!
}
input addSaleProfitInput {
  percentage: Float!
  status: String!
}
input saleAddInput {
  date: String
  time: String
  paid: Float
  discount: Float
  balance: Float
  customerID: ID
  warehouseID: ID
  productMetas: [saleProductMetaInput!]!
  addCustomer: customerAddInput
}
input saleEditInput {
  saleID: ID!
  date: String
  time: String
  paid: Float
  balance: Float
  discount: Float
  customerID: ID!
  warehouseID: ID
  productMetas: [saleProductMetaInput!]
}
input searchSaleInput {
  saleID: ID
  date: String
  time: String
  staffID: ID
  productID: ID
  customerID: ID
  productName: String
  paidPrice: Float
}
`;

const Customer = `#graphql
type Customer {
  customerID: ID!
  warehouseID: ID
  name: String!
  email: String
  address: String
  phoneNumber: String
  beneficiary: Boolean
  supplys: [Sale!]!
  warehouse: Warehouse
  metas: CustomerMetaData
}
type CustomerSocialMedia {
  facebook: String
  twitter: String
  instagram: String
}
type CustomerMetaData {
  avatarURL: String
  dateOfBirth: String
  socialMedia: CustomerSocialMedia
}
type CustomerAddPayload {
  error: String
  added: Boolean
  newAdded: Customer
}
type CustomerEditPayload {
  error: String
  edited: Boolean
  newEdited: Customer
}
type CustomerDeletePayload {
  error: String
  deleted: Boolean!
}
type CustomerPayload {
  error: String
  customer: Customer
}
type CustomersPayload {
  error: String
  customers: [Customer!]!
  pagins: Pagins
}
input searchCustomerInput {
  name: String
  customerID: ID
  email: String
  address: String
  dateOfBirth: String
  beneficiaries: Boolean
}
input customerSocialMediaInput {
  facebook: String
  twitter: String
  instagram: String
}
input customerMetasInput {
  avatarURL: String
  dateOfBirth: String
  socialMedia: customerSocialMediaInput
}
input customerAddInput {
  name: String!
  email: String
  address: String
  phoneNumber: String
  beneficiary: Boolean
  saleIDs: [ID!]!
  metas: customerMetasInput
  warehouseID: ID
}
input customerEditInput {
  customerID: ID!
  warehouseID: ID
  name: String
  email: String
  address: String
  phoneNumber: String
  dateOfBirth: String
  beneficiary: Boolean
  saleIDs: [ID!]
  metas: customerMetasInput
}
`;

const Supply = `#graphql
type Supply {
  supplyID: ID!
  staffID: ID!
  staff: Staff
  productIDs: [ID!]
  products: [Product!]!
  totalQuantity: Int!
  totalPrice: Float!
  date: String
  timestamps: Timestamps
}
type SupplyAddPayload {
  error: String
  added: Boolean!
  newAdded: Supply
}
type SupplyEditPayload {
  error: String
  edited: Boolean!
  newEdited: Supply
}
type SupplyDeletePayload {
  error: String
  deleted: Boolean!
}
type SupplyPayload {
  error: String
  supply: Supply
}
type SupplysPayload {
  error: String
  supplies: [Supply!]
  pagins: Pagins
}
input supplyAddInput {
  productID: ID!
  quantity: Int!
  retailPrice: Float!
  wholesalePrice: Float!
}
input supplyEditInput {
  productID: ID!
  quantity: Int
  retailPrice: Float
  wholesalePrice: Float
  warehouseID: ID
}
input searchSupplyInput {
  supplyID: ID
  date: String
  time: String
  staffID: ID
  warehouseID: ID
}
`;

const Store = `#graphql
type StorePayload {
  error: String
  result: Int!
}

type Store {
  totalSales: StorePayload
  totalStaffs: StorePayload
  totalProducts: StorePayload
  totalCustomers: StorePayload
  totalWarehouses: StorePayload
  totalExpiredProducts: StorePayload
  enterPrise: enterprisePayload
  _sysInitialized: Boolean!
  _enterpriseInitialized: Boolean!
}
`;

const Enterprice = `#graphql
   type EnterpriseSocialAccounts {
  facebook: String
  twitter: String
  youtube: String
  instagram: String
}
type EnterpriseOwner {
  name: String!
  email: String
  about: String
  picture: String
  phoneNumber: String
  website: String
  socialAccounts: EnterpriseSocialAccounts
}
type Enterprise {
  name: String!
  slogan: String
  title: String
  address: String
  about: String
  contacts: [String!]!
  website: String
  email: String
  staffs: [Staff!]!
  products: [Product!]!
  customers: [Customer!]!
  warehouses: [Warehouse!]!
  owners: [EnterpriseOwner!]!
  socialAccounts: EnterpriseSocialAccounts
}

input addSocialAccountInput {
  facebook: String
  twitter: String
  youtube: String
  instagram: String
}

input addOwnerInput {
  name: String!
  email: String!
  about: String
  picture: String
  phoneNumber: String!
  website: String
  socialAccounts: addSocialAccountInput
}
input editOwnerInput {
  name: String
  email: String
  about: String
  picture: String
  phoneNumber: String
  website: String
  socialAccounts: addSocialAccountInput
}

input enterpriseAddInput {
  name: String!
  slogan: String
  title: String
  address: String!
  about: String
  contacts: [String!]!
  website: String
  email: String
  owners: [addOwnerInput!]!
  socialAccounts: addSocialAccountInput
}

input enterpriseEditInput {
  name: String
  title: String
  slogan: String
  about: String
  email: String
  address: String
  website: String
  contacts: [String!]
  owners: [editOwnerInput!]
  socialAccounts: addSocialAccountInput
}
type enterprisePayload {
  error: String
  result: Enterprise
}
type EnterpriseAddPayload {
  error: String
  added: Boolean!
  newAdded: Enterprise
}
type EnterpriseEditPayload {
  error: String
  edited: Boolean!
  newEdited: Enterprise
}
type initPayload {
  error: String
  _initialized: Boolean!
}
`;

const Query = `#graphql

  type Query {
  ################################## STAFF ##########################################
    staff(searchFilter: searchStaffInput!): StaffPayload!
    staffs(searchFilter: searchStaffInput, pagin: paginInput): StaffsPayload!

    ################################## PRODUCT #########################################
    product(searchFilter: searchProductInput!): ProductPayload!
    products(
      searchFilter: searchProductInput
      pagin: paginInput
    ): ProductsPayload!

    ################################## CATEGORY ########################################
    categories: [Category!]!

    ################################## WAREHOUSE #######################################
    warehouse(searchFilter: warehouseSearchInput!): WarehousePayload!
    warehouses(
      searchFilter: warehouseSearchInput
      pagin: paginInput
    ): WarehousesPayload!

    ################################## SALE ############################################
    sale(searchFilter: searchSaleInput!): SalePayload!
    sales(searchFilter: searchSaleInput, pagin: paginInput): SalesPayload!

    ################################## CUSTOMER ########################################
    customer(searchFilter: searchCustomerInput!): CustomerPayload!
    customers(
      searchFilter: searchCustomerInput
      pagin: paginInput
    ): CustomersPayload!

    ################################## PURCHASE ########################################
    supply(searchFilter: searchSupplyInput!): SupplyPayload!
    supplies(searchFilter: searchSupplyInput, pagin: paginInput): SupplysPayload!

    ################################## STORE ###########################################
    store: Store!
  }
`;

const Mutation = `#graphql
  type Mutation {
      ################################## STAFF ###########################################
      staffDelete(staffID: ID!): StaffDeletePayload!
      staffAdd(staffAddInput: staffAddInput!): StaffAddPayload!
      staffEdit(staffEditInput: staffEditInput!): StaffEditPayload!

      ################################## PRODUCT ########################################
      productAdd(productAddInput: productAddInput!): ProductAddPayload!
      productEdit(productEditInput: productEditInput!): ProductEditPayload!
      productDelete(productID: ID!, warehouseID: ID): ProductDeletePayload!

      ################################## CATEGORY ########################################
      categoryDelete(category: String!): CategoryDeletePayload!
      categoryAdd(categoryAddInput: categoryAddInput!): CategoryAddPayload!
      categoryEdit(categoryEditInput: categoryEditInput!): CategoryAddPayload!

      ################################## WAREHOUSE #######################################
      warehouseDelete(warehouseID: ID!): WarehouseDeletePayload!
      warehouseAdd(warehouseAddInput: warehouseAddInput!): WarehouseAddPayload!
      warehouseEdit(warehouseEditInput: warehouseEditInput!): WarehouseEditPayload!

      ################################## SALE ############################################
      saleAdd(saleAddInput: saleAddInput!): SaleAddPayload!
      saleDelete(saleID: ID!, warehouseID: ID): SaleDeletePayload!
      saleEdit(saleEditInput: saleEditInput!): SaleEditPayload!

      ################################## CUSTOMER #########################################
      customerAdd(customerAddInput: customerAddInput!): CustomerAddPayload!
      customerEdit(customerEditInput: customerEditInput!): CustomerEditPayload!
      customerDelete(customerID: ID!, warehouseID: ID): CustomerDeletePayload!

      ################################# PURCHASE ##########################################
      makeSupply(
        supplyAddInput: [supplyAddInput!]!
        warehouseID: ID
      ): SupplyAddPayload!
      supplyEdit(
        supplyID: ID!
        supplyEditInput: [supplyEditInput!]!
        warehouseID: ID
      ): SupplyEditPayload!
      supplyDelete(supplyID: ID!, warehouseID: ID): SupplyDeletePayload!

      ################################# ENTERPRISE ########################################
      enterpriseAdd(enterpriseAddInput: enterpriseAddInput!): EnterpriseAddPayload!
      enterpriseEdit(
        enterpriseEditInput: enterpriseEditInput!
      ): EnterpriseEditPayload!
      _initializeSys(_init: Boolean!): initPayload!
  }
`;

const schemas = `
  ${Sale}
  ${Enums}
  ${Staff}
  ${Store}
  ${Supply}
  ${Feature}
  ${Product}
  ${Commons}
  ${Category}
  ${Customer}
  ${Warehouse}
  ${Enterprice}
  ${Mutation}
  ${Query}
`;

export const typeDefs = buildSchema(schemas);
