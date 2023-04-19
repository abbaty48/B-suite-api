import { GraphQLResolveInfo } from 'graphql';
import { IResolverContext } from '../../models/interfaces/IResolverContext';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddCategoryPayload = {
  __typename?: 'AddCategoryPayload';
  added: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  newAdded?: Maybe<Scalars['String']>;
};

export type AddCustomerPayload = {
  __typename?: 'AddCustomerPayload';
  added?: Maybe<Scalars['Boolean']>;
  error?: Maybe<Scalars['String']>;
  newAdded?: Maybe<Customer>;
};

export type AddProductPayload = {
  __typename?: 'AddProductPayload';
  added?: Maybe<Scalars['Boolean']>;
  error?: Maybe<Scalars['String']>;
  newAdded?: Maybe<Product>;
};

export type AddSalePayload = {
  __typename?: 'AddSalePayload';
  added?: Maybe<Scalars['Boolean']>;
  error?: Maybe<Scalars['String']>;
  newAdded?: Maybe<Sale>;
};

export type AddStaffPayload = {
  __typename?: 'AddStaffPayload';
  added: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  newAdded?: Maybe<Staff>;
};

export type AddSupplyPayload = {
  __typename?: 'AddSupplyPayload';
  added: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  newAdded?: Maybe<Supply>;
};

export type AddWarehousePayload = {
  __typename?: 'AddWarehousePayload';
  added: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  newAdded?: Maybe<Warehouse>;
};

export type AddWarehouseStaffPayload = {
  __typename?: 'AddWarehouseStaffPayload';
  added: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type Category = {
  __typename?: 'Category';
  name: Scalars['String'];
};

export type Customer = {
  __typename?: 'Customer';
  address?: Maybe<Scalars['String']>;
  beneficiary?: Maybe<Scalars['Boolean']>;
  customerID: Scalars['ID'];
  email?: Maybe<Scalars['String']>;
  metas?: Maybe<CustomerMetaData>;
  name: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  supplys: Array<Sale>;
  warehouse?: Maybe<Warehouse>;
  warehouseID?: Maybe<Scalars['ID']>;
};

export type CustomerMetaData = {
  __typename?: 'CustomerMetaData';
  avatarURL?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['String']>;
  socialMedia?: Maybe<CustomerSocialMedia>;
};

export type CustomerPayload = {
  __typename?: 'CustomerPayload';
  customer?: Maybe<Customer>;
  error?: Maybe<Scalars['String']>;
};

export type CustomerSocialMedia = {
  __typename?: 'CustomerSocialMedia';
  facebook?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
};

export type CustomersPayload = {
  __typename?: 'CustomersPayload';
  customers: Array<Customer>;
  error?: Maybe<Scalars['String']>;
  pagins?: Maybe<Pagins>;
};

export type DeleteCategoryPayload = {
  __typename?: 'DeleteCategoryPayload';
  deleted: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type DeleteCustomerPayload = {
  __typename?: 'DeleteCustomerPayload';
  deleted: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type DeleteProductPayload = {
  __typename?: 'DeleteProductPayload';
  deleted: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type DeleteSalePayload = {
  __typename?: 'DeleteSalePayload';
  deleted: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type DeleteStaffPayload = {
  __typename?: 'DeleteStaffPayload';
  deleted: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type DeleteSupplyPayload = {
  __typename?: 'DeleteSupplyPayload';
  deleted: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type DeleteWarehousePayload = {
  __typename?: 'DeleteWarehousePayload';
  deleted: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type EditCategoryPayload = {
  __typename?: 'EditCategoryPayload';
  edited: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  newValue?: Maybe<Scalars['String']>;
  oldValue: Scalars['String'];
};

export type EditCustomerPayload = {
  __typename?: 'EditCustomerPayload';
  edited?: Maybe<Scalars['Boolean']>;
  error?: Maybe<Scalars['String']>;
  newEdited?: Maybe<Customer>;
};

export type EditProductPayload = {
  __typename?: 'EditProductPayload';
  edited: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  newEdited?: Maybe<Product>;
};

export type EditSalePayload = {
  __typename?: 'EditSalePayload';
  edited?: Maybe<Scalars['Boolean']>;
  error?: Maybe<Scalars['String']>;
  newEdited?: Maybe<Sale>;
};

export type EditStaffPayload = {
  __typename?: 'EditStaffPayload';
  edited: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  newEdited?: Maybe<Staff>;
};

export type EditSupplyPayload = {
  __typename?: 'EditSupplyPayload';
  edited: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  newEdited?: Maybe<Supply>;
};

export type EditWarehousePayload = {
  __typename?: 'EditWarehousePayload';
  edited: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  newEdited?: Maybe<Warehouse>;
};

export type Enterprise = {
  __typename?: 'Enterprise';
  about?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  contacts: Array<Scalars['String']>;
  customers: Array<Customer>;
  email?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  owners: Array<EnterpriseOwner>;
  products: Array<Product>;
  slogan?: Maybe<Scalars['String']>;
  socialAccounts?: Maybe<EnterpriseSocialAccounts>;
  staffs: Array<Staff>;
  title?: Maybe<Scalars['String']>;
  warehouses: Array<Warehouse>;
  website?: Maybe<Scalars['String']>;
};

export type EnterpriseOwner = {
  __typename?: 'EnterpriseOwner';
  about?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  socialAccounts?: Maybe<EnterpriseSocialAccounts>;
  website?: Maybe<Scalars['String']>;
};

export type EnterpriseSocialAccounts = {
  __typename?: 'EnterpriseSocialAccounts';
  facebook?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  youtube?: Maybe<Scalars['String']>;
};

export type Feature = {
  __typename?: 'Feature';
  extension?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
  filePath?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
};

export enum FeatureEditAction {
  Add = 'ADD',
  Remove = 'REMOVE'
}

export type Mutation = {
  __typename?: 'Mutation';
  _initializeSys: InitPayload;
  addCategory: AddCategoryPayload;
  addCustomer: AddCustomerPayload;
  addEnterprise: AddEnterprisePayload;
  addProduct: AddProductPayload;
  addSale: AddSalePayload;
  addStaff: AddStaffPayload;
  addWarehouse: AddWarehousePayload;
  deleteCategory: DeleteCategoryPayload;
  deleteCustomer: DeleteCustomerPayload;
  deleteProduct: DeleteProductPayload;
  deleteSale: DeleteSalePayload;
  deleteStaff: DeleteStaffPayload;
  deleteSupply: DeleteSupplyPayload;
  deleteWarehouse: DeleteWarehousePayload;
  editCategory: EditCategoryPayload;
  editCustomer: EditCustomerPayload;
  editEnterprise: EditEnterprisePayload;
  editProduct: EditProductPayload;
  editSale: EditSalePayload;
  editStaff: EditStaffPayload;
  editSupply: EditSupplyPayload;
  editWarehouse: EditWarehousePayload;
  makeSupply: AddSupplyPayload;
};


export type Mutation_InitializeSysArgs = {
  _init: Scalars['Boolean'];
};


export type MutationAddCategoryArgs = {
  addCategoryInput: AddCategoryInput;
};


export type MutationAddCustomerArgs = {
  addCustomerInput: AddCustomerInput;
};


export type MutationAddEnterpriseArgs = {
  addEnterpriseInput: AddEnterpriseInput;
};


export type MutationAddProductArgs = {
  addProductInput: AddProductInput;
};


export type MutationAddSaleArgs = {
  addSaleInput: AddSaleInput;
};


export type MutationAddStaffArgs = {
  addStaffInput: AddStaffInput;
};


export type MutationAddWarehouseArgs = {
  addWarehouseInput: AddWarehouseInput;
};


export type MutationDeleteCategoryArgs = {
  category: Scalars['String'];
};


export type MutationDeleteCustomerArgs = {
  customerID: Scalars['ID'];
  warehouseID?: InputMaybe<Scalars['ID']>;
};


export type MutationDeleteProductArgs = {
  productID: Scalars['ID'];
  warehouseID?: InputMaybe<Scalars['ID']>;
};


export type MutationDeleteSaleArgs = {
  saleID: Scalars['ID'];
  warehouseID?: InputMaybe<Scalars['ID']>;
};


export type MutationDeleteStaffArgs = {
  staffID: Scalars['ID'];
};


export type MutationDeleteSupplyArgs = {
  supplyID: Scalars['ID'];
  warehouseID?: InputMaybe<Scalars['ID']>;
};


export type MutationDeleteWarehouseArgs = {
  warehouseID: Scalars['ID'];
};


export type MutationEditCategoryArgs = {
  editCategoryInput: EditCategoryInput;
};


export type MutationEditCustomerArgs = {
  editCustomerInput: EditCustomerInput;
};


export type MutationEditEnterpriseArgs = {
  editEnterpriseInput: EditEnterpriseInput;
};


export type MutationEditProductArgs = {
  editProductInput: EditProductInput;
};


export type MutationEditSaleArgs = {
  editSaleInput: EditSaleInput;
};


export type MutationEditStaffArgs = {
  editStaffInput: EditStaffInput;
};


export type MutationEditSupplyArgs = {
  editSupplyInput: Array<EditSupplyInput>;
  supplyID: Scalars['ID'];
  warehouseID?: InputMaybe<Scalars['ID']>;
};


export type MutationEditWarehouseArgs = {
  editWarehouseInput: EditWarehouseInput;
};


export type MutationMakeSupplyArgs = {
  addSupplyInput: Array<AddSupplyInput>;
  warehouseID?: InputMaybe<Scalars['ID']>;
};

export type Pagins = {
  __typename?: 'Pagins';
  currentPageIndex?: Maybe<Scalars['Int']>;
  nextPageIndex?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  totalDocuments?: Maybe<Scalars['Int']>;
  totalPaginated?: Maybe<Scalars['Int']>;
};

export type Product = {
  __typename?: 'Product';
  category: Category;
  description?: Maybe<Scalars['String']>;
  expirationDate?: Maybe<Scalars['String']>;
  expired?: Maybe<Scalars['Boolean']>;
  features?: Maybe<Array<Maybe<Feature>>>;
  inStock: Scalars['Boolean'];
  name: Scalars['String'];
  productID: Scalars['ID'];
  quantity: Scalars['Int'];
  retailPrice: Scalars['Float'];
  warehouses?: Maybe<Array<Warehouse>>;
  wholesalePrice: Scalars['Float'];
};

export type ProductPayload = {
  __typename?: 'ProductPayload';
  error?: Maybe<Scalars['String']>;
  product?: Maybe<Product>;
};

export type ProductsPayload = {
  __typename?: 'ProductsPayload';
  error?: Maybe<Scalars['String']>;
  pagins?: Maybe<Pagins>;
  products: Array<Product>;
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  customer: CustomerPayload;
  customers: CustomersPayload;
  product: ProductPayload;
  products: ProductsPayload;
  sale: SalePayload;
  sales: SalesPayload;
  staff: StaffPayload;
  staffs: StaffsPayload;
  store: Store;
  supplies: SupplysPayload;
  supply: SupplyPayload;
  warehouse: WarehousePayload;
  warehouses: WarehousesPayload;
};


export type QueryCustomerArgs = {
  searchFilter: SearchCustomerInput;
};


export type QueryCustomersArgs = {
  pagin?: InputMaybe<PaginInput>;
  searchFilter?: InputMaybe<SearchCustomerInput>;
};


export type QueryProductArgs = {
  searchFilter: SearchProductInput;
};


export type QueryProductsArgs = {
  pagin?: InputMaybe<PaginInput>;
  searchFilter?: InputMaybe<SearchProductInput>;
};


export type QuerySaleArgs = {
  searchFilter: SearchSaleInput;
};


export type QuerySalesArgs = {
  pagin?: InputMaybe<PaginInput>;
  searchFilter?: InputMaybe<SearchSaleInput>;
};


export type QueryStaffArgs = {
  searchFilter: SearchStaffInput;
};


export type QueryStaffsArgs = {
  pagin?: InputMaybe<PaginInput>;
  searchFilter?: InputMaybe<SearchStaffInput>;
};


export type QuerySuppliesArgs = {
  pagin?: InputMaybe<PaginInput>;
  searchFilter?: InputMaybe<SearchSupplyInput>;
};


export type QuerySupplyArgs = {
  searchFilter: SearchSupplyInput;
};


export type QueryWarehouseArgs = {
  searchFilter: WarehouseSearchInput;
};


export type QueryWarehousesArgs = {
  pagin?: InputMaybe<PaginInput>;
  searchFilter?: InputMaybe<WarehouseSearchInput>;
};

export type Sale = {
  __typename?: 'Sale';
  balance: Scalars['Float'];
  customer: Customer;
  customerID: Scalars['ID'];
  date: Scalars['String'];
  discount?: Maybe<Scalars['Float']>;
  kind: Scalars['String'];
  paid: Scalars['Float'];
  products: Array<SaleProduct>;
  profit?: Maybe<SaleProfit>;
  saleID: Scalars['ID'];
  staff: Staff;
  staffID: Scalars['ID'];
  time: Scalars['String'];
  totalPrice: Scalars['Float'];
  totalQuantity: Scalars['Int'];
  warehouse?: Maybe<Warehouse>;
  warehouseID?: Maybe<Scalars['ID']>;
};

export type SalePayload = {
  __typename?: 'SalePayload';
  error?: Maybe<Scalars['String']>;
  sale?: Maybe<Sale>;
};

export type SaleProduct = {
  __typename?: 'SaleProduct';
  category: Category;
  description?: Maybe<Scalars['String']>;
  expirationDate?: Maybe<Scalars['String']>;
  expired?: Maybe<Scalars['Boolean']>;
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  inStock: Scalars['Boolean'];
  kind: Scalars['String'];
  name: Scalars['String'];
  productID: Scalars['ID'];
  quantity: Scalars['Int'];
  retailPrice: Scalars['Float'];
  subTotal: Scalars['Float'];
  warehouse?: Maybe<Warehouse>;
  wholesalePrice: Scalars['Float'];
};

export type SaleProfit = {
  __typename?: 'SaleProfit';
  percentage: Scalars['Float'];
  status: Scalars['String'];
};

export type SalesPayload = {
  __typename?: 'SalesPayload';
  error?: Maybe<Scalars['String']>;
  pagins?: Maybe<Pagins>;
  sales: Array<Sale>;
};

export type Staff = {
  __typename?: 'Staff';
  address?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  otherName?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  picture?: Maybe<Feature>;
  role: StaffRole;
  staffID: Scalars['ID'];
  token: Scalars['String'];
  warehouse?: Maybe<Warehouse>;
};

export type StaffPayload = {
  __typename?: 'StaffPayload';
  error?: Maybe<Scalars['String']>;
  staff?: Maybe<Staff>;
};

export enum StaffRole {
  Accountant = 'Accountant',
  Admin = 'Admin',
  Manager = 'Manager',
  Saller = 'Saller',
  Warehouse = 'Warehouse'
}

export type StaffsPayload = {
  __typename?: 'StaffsPayload';
  error?: Maybe<Scalars['String']>;
  pagin?: Maybe<Pagins>;
  staffs: Array<Staff>;
};

export type Store = {
  __typename?: 'Store';
  _enterpriseInitialized: Scalars['Boolean'];
  _sysInitialized: Scalars['Boolean'];
  enterPrise?: Maybe<EnterPrisePayload>;
  totalCustomers?: Maybe<StorePayload>;
  totalExpiredProducts?: Maybe<StorePayload>;
  totalProducts?: Maybe<StorePayload>;
  totalSales?: Maybe<StorePayload>;
  totalStaffs?: Maybe<StorePayload>;
  totalWarehouses?: Maybe<StorePayload>;
};

export type StorePayload = {
  __typename?: 'StorePayload';
  error?: Maybe<Scalars['String']>;
  result: Scalars['Int'];
};

export type Supply = {
  __typename?: 'Supply';
  date?: Maybe<Scalars['String']>;
  productIDs?: Maybe<Array<Scalars['ID']>>;
  products: Array<Product>;
  staff?: Maybe<Staff>;
  staffID: Scalars['ID'];
  supplyID: Scalars['ID'];
  timestamps?: Maybe<Timestamps>;
  totalPrice: Scalars['Float'];
  totalQuantity: Scalars['Int'];
};

export type SupplyPayload = {
  __typename?: 'SupplyPayload';
  error?: Maybe<Scalars['String']>;
  supply?: Maybe<Supply>;
};

export type SupplysPayload = {
  __typename?: 'SupplysPayload';
  error?: Maybe<Scalars['String']>;
  pagins?: Maybe<Pagins>;
  supplies?: Maybe<Array<Supply>>;
};

export type Timestamps = {
  __typename?: 'Timestamps';
  createdAt: Scalars['String'];
  currentTime?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['String'];
};

export type Warehouse = {
  __typename?: 'Warehouse';
  address: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  productIDs: Array<Scalars['ID']>;
  products: Array<Product>;
  staffIDs: Array<Scalars['ID']>;
  staffs: Array<Staff>;
  warehouseID: Scalars['ID'];
};

export type WarehousePayload = {
  __typename?: 'WarehousePayload';
  error?: Maybe<Scalars['String']>;
  warehouse?: Maybe<Warehouse>;
};

export type WarehousesPayload = {
  __typename?: 'WarehousesPayload';
  error?: Maybe<Scalars['String']>;
  warehouses: Array<Warehouse>;
};

export type AddCategoryInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type AddCustomerInput = {
  address?: InputMaybe<Scalars['String']>;
  beneficiary?: InputMaybe<Scalars['Boolean']>;
  email?: InputMaybe<Scalars['String']>;
  metas?: InputMaybe<CustomerMetasInput>;
  name: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
  saleIDs: Array<Scalars['ID']>;
  warehouseID?: InputMaybe<Scalars['ID']>;
};

export type AddEnterpriseInput = {
  about?: InputMaybe<Scalars['String']>;
  address: Scalars['String'];
  contacts: Array<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  owners: Array<AddOwnerInput>;
  slogan?: InputMaybe<Scalars['String']>;
  socialAccounts?: InputMaybe<AddSocialAccountInput>;
  title?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

export type AddEnterprisePayload = {
  __typename?: 'addEnterprisePayload';
  added: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  newAdded?: Maybe<Enterprise>;
};

export type AddOwnerInput = {
  about?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
  picture?: InputMaybe<Scalars['String']>;
  socialAccounts?: InputMaybe<AddSocialAccountInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type AddProductInput = {
  categoryID: Scalars['ID'];
  description?: InputMaybe<Scalars['String']>;
  expirationDate?: InputMaybe<Scalars['String']>;
  featuresURI?: InputMaybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  quantity: Scalars['Int'];
  retailPrice: Scalars['Float'];
  warehouseIDs?: InputMaybe<Array<Scalars['ID']>>;
  wholesalePrice: Scalars['Float'];
};

export type AddSaleInput = {
  addCustomer?: InputMaybe<AddCustomerInput>;
  balance?: InputMaybe<Scalars['Float']>;
  customerID?: InputMaybe<Scalars['ID']>;
  date?: InputMaybe<Scalars['String']>;
  discount?: InputMaybe<Scalars['Float']>;
  paid?: InputMaybe<Scalars['Float']>;
  productMetas: Array<SaleProductMetaInput>;
  time?: InputMaybe<Scalars['String']>;
  warehouseID?: InputMaybe<Scalars['ID']>;
};

export type AddSaleProfitInput = {
  percentage: Scalars['Float'];
  status: Scalars['String'];
};

export type AddSocialAccountInput = {
  facebook?: InputMaybe<Scalars['String']>;
  instagram?: InputMaybe<Scalars['String']>;
  twitter?: InputMaybe<Scalars['String']>;
  youtube?: InputMaybe<Scalars['String']>;
};

export type AddStaffInput = {
  address?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  featureURI?: InputMaybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  otherName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
  role: StaffRole;
  warehouseID?: InputMaybe<Scalars['ID']>;
};

export type AddSupplyInput = {
  productID: Scalars['ID'];
  quantity: Scalars['Int'];
  retailPrice: Scalars['Float'];
  wholesalePrice: Scalars['Float'];
};

export type AddWarehouseInput = {
  address: Scalars['String'];
  name: Scalars['String'];
  productIDs?: InputMaybe<Array<Scalars['ID']>>;
  staffIDs?: InputMaybe<Array<Scalars['ID']>>;
};

export type CategoryPayload = {
  __typename?: 'categoryPayload';
  error?: Maybe<Scalars['String']>;
};

export type CustomerMetasInput = {
  avatarURL?: InputMaybe<Scalars['String']>;
  dateOfBirth?: InputMaybe<Scalars['String']>;
  socialMedia?: InputMaybe<CustomerSocialMediaInput>;
};

export type CustomerSocialMediaInput = {
  facebook?: InputMaybe<Scalars['String']>;
  instagram?: InputMaybe<Scalars['String']>;
  twitter?: InputMaybe<Scalars['String']>;
};

export type EditCategoryInput = {
  newCategory: Scalars['String'];
  oldCategory: Scalars['String'];
};

export type EditCustomerInput = {
  address?: InputMaybe<Scalars['String']>;
  beneficiary?: InputMaybe<Scalars['Boolean']>;
  customerID: Scalars['ID'];
  dateOfBirth?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  metas?: InputMaybe<CustomerMetasInput>;
  name?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  saleIDs?: InputMaybe<Array<Scalars['ID']>>;
  warehouseID?: InputMaybe<Scalars['ID']>;
};

export type EditEnterpriseInput = {
  about?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<Scalars['String']>;
  contacts?: InputMaybe<Array<Scalars['String']>>;
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  owners?: InputMaybe<Array<EditOwnerInput>>;
  slogan?: InputMaybe<Scalars['String']>;
  socialAccounts?: InputMaybe<AddSocialAccountInput>;
  title?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

export type EditEnterprisePayload = {
  __typename?: 'editEnterprisePayload';
  edited: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  newEdited?: Maybe<Enterprise>;
};

export type EditFeature = {
  action: FeatureEditAction;
  addFeatureURI?: InputMaybe<Array<Scalars['String']>>;
  removeFeatureByName?: InputMaybe<Scalars['String']>;
};

export type EditOwnerInput = {
  about?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
  socialAccounts?: InputMaybe<AddSocialAccountInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type EditProductInput = {
  categoryID?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  editFeatures?: InputMaybe<EditFeature>;
  expirationDate?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  productID: Scalars['ID'];
  retailPrice?: InputMaybe<Scalars['Float']>;
  warehouseIDs?: InputMaybe<Array<Scalars['ID']>>;
  wholesalePrice?: InputMaybe<Scalars['Float']>;
};

export type EditSaleInput = {
  balance?: InputMaybe<Scalars['Float']>;
  customerID: Scalars['ID'];
  date?: InputMaybe<Scalars['String']>;
  discount?: InputMaybe<Scalars['Float']>;
  paid?: InputMaybe<Scalars['Float']>;
  productMetas?: InputMaybe<Array<SaleProductMetaInput>>;
  saleID: Scalars['ID'];
  time?: InputMaybe<Scalars['String']>;
  warehouseID?: InputMaybe<Scalars['ID']>;
};

export type EditStaffInput = {
  address?: InputMaybe<Scalars['String']>;
  editFeature?: InputMaybe<EditFeature>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  otherName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<StaffRole>;
  staffID: Scalars['ID'];
  warehouseID?: InputMaybe<Scalars['ID']>;
};

export type EditSupplyInput = {
  productID: Scalars['ID'];
  quantity?: InputMaybe<Scalars['Int']>;
  retailPrice?: InputMaybe<Scalars['Float']>;
  warehouseID?: InputMaybe<Scalars['ID']>;
  wholesalePrice?: InputMaybe<Scalars['Float']>;
};

export type EditWarehouseInput = {
  address?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  productIDs?: InputMaybe<Array<Scalars['ID']>>;
  staffIDs?: InputMaybe<Array<Scalars['ID']>>;
  warehouseID: Scalars['ID'];
};

export type EnterPrisePayload = {
  __typename?: 'enterPrisePayload';
  error?: Maybe<Scalars['String']>;
  result?: Maybe<Enterprise>;
};

export type InitPayload = {
  __typename?: 'initPayload';
  _initialized: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type PaginInput = {
  limit?: InputMaybe<Scalars['Int']>;
  pageIndex?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
};

export type SaleProductMetaInput = {
  productID: Scalars['ID'];
  quantity: Scalars['Int'];
};

export type SearchCustomerInput = {
  address?: InputMaybe<Scalars['String']>;
  beneficiaries?: InputMaybe<Scalars['Boolean']>;
  customerID?: InputMaybe<Scalars['ID']>;
  dateOfBirth?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type SearchProductInput = {
  categoryID?: InputMaybe<Scalars['ID']>;
  expirationDate?: InputMaybe<Scalars['String']>;
  expired?: InputMaybe<Scalars['Boolean']>;
  inStock?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  productID?: InputMaybe<Scalars['ID']>;
  quantity?: InputMaybe<Scalars['Int']>;
  retailPrice?: InputMaybe<Scalars['Float']>;
  warehouseID?: InputMaybe<Scalars['ID']>;
  wholesalePrice?: InputMaybe<Scalars['Float']>;
};

export type SearchSaleInput = {
  customerID?: InputMaybe<Scalars['ID']>;
  date?: InputMaybe<Scalars['String']>;
  paidPrice?: InputMaybe<Scalars['Float']>;
  productID?: InputMaybe<Scalars['ID']>;
  productName?: InputMaybe<Scalars['String']>;
  saleID?: InputMaybe<Scalars['ID']>;
  staffID?: InputMaybe<Scalars['ID']>;
  time?: InputMaybe<Scalars['String']>;
};

export type SearchStaffInput = {
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  staffID?: InputMaybe<Scalars['ID']>;
  warehouseID?: InputMaybe<Scalars['ID']>;
};

export type SearchSupplyInput = {
  date?: InputMaybe<Scalars['String']>;
  staffID?: InputMaybe<Scalars['ID']>;
  supplyID?: InputMaybe<Scalars['ID']>;
  time?: InputMaybe<Scalars['String']>;
  warehouseID?: InputMaybe<Scalars['ID']>;
};

export type WarehouseSearchInput = {
  address?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  warehouseID?: InputMaybe<Scalars['ID']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AddCategoryPayload: ResolverTypeWrapper<AddCategoryPayload>;
  AddCustomerPayload: ResolverTypeWrapper<AddCustomerPayload>;
  AddProductPayload: ResolverTypeWrapper<AddProductPayload>;
  AddSalePayload: ResolverTypeWrapper<AddSalePayload>;
  AddStaffPayload: ResolverTypeWrapper<AddStaffPayload>;
  AddSupplyPayload: ResolverTypeWrapper<AddSupplyPayload>;
  AddWarehousePayload: ResolverTypeWrapper<AddWarehousePayload>;
  AddWarehouseStaffPayload: ResolverTypeWrapper<AddWarehouseStaffPayload>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Category: ResolverTypeWrapper<Category>;
  Customer: ResolverTypeWrapper<Customer>;
  CustomerMetaData: ResolverTypeWrapper<CustomerMetaData>;
  CustomerPayload: ResolverTypeWrapper<CustomerPayload>;
  CustomerSocialMedia: ResolverTypeWrapper<CustomerSocialMedia>;
  CustomersPayload: ResolverTypeWrapper<CustomersPayload>;
  DeleteCategoryPayload: ResolverTypeWrapper<DeleteCategoryPayload>;
  DeleteCustomerPayload: ResolverTypeWrapper<DeleteCustomerPayload>;
  DeleteProductPayload: ResolverTypeWrapper<DeleteProductPayload>;
  DeleteSalePayload: ResolverTypeWrapper<DeleteSalePayload>;
  DeleteStaffPayload: ResolverTypeWrapper<DeleteStaffPayload>;
  DeleteSupplyPayload: ResolverTypeWrapper<DeleteSupplyPayload>;
  DeleteWarehousePayload: ResolverTypeWrapper<DeleteWarehousePayload>;
  EditCategoryPayload: ResolverTypeWrapper<EditCategoryPayload>;
  EditCustomerPayload: ResolverTypeWrapper<EditCustomerPayload>;
  EditProductPayload: ResolverTypeWrapper<EditProductPayload>;
  EditSalePayload: ResolverTypeWrapper<EditSalePayload>;
  EditStaffPayload: ResolverTypeWrapper<EditStaffPayload>;
  EditSupplyPayload: ResolverTypeWrapper<EditSupplyPayload>;
  EditWarehousePayload: ResolverTypeWrapper<EditWarehousePayload>;
  Enterprise: ResolverTypeWrapper<Enterprise>;
  EnterpriseOwner: ResolverTypeWrapper<EnterpriseOwner>;
  EnterpriseSocialAccounts: ResolverTypeWrapper<EnterpriseSocialAccounts>;
  Feature: ResolverTypeWrapper<Feature>;
  FeatureEditAction: FeatureEditAction;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Pagins: ResolverTypeWrapper<Pagins>;
  Product: ResolverTypeWrapper<Product>;
  ProductPayload: ResolverTypeWrapper<ProductPayload>;
  ProductsPayload: ResolverTypeWrapper<ProductsPayload>;
  Query: ResolverTypeWrapper<{}>;
  Sale: ResolverTypeWrapper<Sale>;
  SalePayload: ResolverTypeWrapper<SalePayload>;
  SaleProduct: ResolverTypeWrapper<SaleProduct>;
  SaleProfit: ResolverTypeWrapper<SaleProfit>;
  SalesPayload: ResolverTypeWrapper<SalesPayload>;
  Staff: ResolverTypeWrapper<Staff>;
  StaffPayload: ResolverTypeWrapper<StaffPayload>;
  StaffRole: StaffRole;
  StaffsPayload: ResolverTypeWrapper<StaffsPayload>;
  Store: ResolverTypeWrapper<Store>;
  StorePayload: ResolverTypeWrapper<StorePayload>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Supply: ResolverTypeWrapper<Supply>;
  SupplyPayload: ResolverTypeWrapper<SupplyPayload>;
  SupplysPayload: ResolverTypeWrapper<SupplysPayload>;
  Timestamps: ResolverTypeWrapper<Timestamps>;
  Warehouse: ResolverTypeWrapper<Warehouse>;
  WarehousePayload: ResolverTypeWrapper<WarehousePayload>;
  WarehousesPayload: ResolverTypeWrapper<WarehousesPayload>;
  addCategoryInput: AddCategoryInput;
  addCustomerInput: AddCustomerInput;
  addEnterpriseInput: AddEnterpriseInput;
  addEnterprisePayload: ResolverTypeWrapper<AddEnterprisePayload>;
  addOwnerInput: AddOwnerInput;
  addProductInput: AddProductInput;
  addSaleInput: AddSaleInput;
  addSaleProfitInput: AddSaleProfitInput;
  addSocialAccountInput: AddSocialAccountInput;
  addStaffInput: AddStaffInput;
  addSupplyInput: AddSupplyInput;
  addWarehouseInput: AddWarehouseInput;
  categoryPayload: ResolverTypeWrapper<CategoryPayload>;
  customerMetasInput: CustomerMetasInput;
  customerSocialMediaInput: CustomerSocialMediaInput;
  editCategoryInput: EditCategoryInput;
  editCustomerInput: EditCustomerInput;
  editEnterpriseInput: EditEnterpriseInput;
  editEnterprisePayload: ResolverTypeWrapper<EditEnterprisePayload>;
  editFeature: EditFeature;
  editOwnerInput: EditOwnerInput;
  editProductInput: EditProductInput;
  editSaleInput: EditSaleInput;
  editStaffInput: EditStaffInput;
  editSupplyInput: EditSupplyInput;
  editWarehouseInput: EditWarehouseInput;
  enterPrisePayload: ResolverTypeWrapper<EnterPrisePayload>;
  initPayload: ResolverTypeWrapper<InitPayload>;
  paginInput: PaginInput;
  saleProductMetaInput: SaleProductMetaInput;
  searchCustomerInput: SearchCustomerInput;
  searchProductInput: SearchProductInput;
  searchSaleInput: SearchSaleInput;
  searchStaffInput: SearchStaffInput;
  searchSupplyInput: SearchSupplyInput;
  warehouseSearchInput: WarehouseSearchInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AddCategoryPayload: AddCategoryPayload;
  AddCustomerPayload: AddCustomerPayload;
  AddProductPayload: AddProductPayload;
  AddSalePayload: AddSalePayload;
  AddStaffPayload: AddStaffPayload;
  AddSupplyPayload: AddSupplyPayload;
  AddWarehousePayload: AddWarehousePayload;
  AddWarehouseStaffPayload: AddWarehouseStaffPayload;
  Boolean: Scalars['Boolean'];
  Category: Category;
  Customer: Customer;
  CustomerMetaData: CustomerMetaData;
  CustomerPayload: CustomerPayload;
  CustomerSocialMedia: CustomerSocialMedia;
  CustomersPayload: CustomersPayload;
  DeleteCategoryPayload: DeleteCategoryPayload;
  DeleteCustomerPayload: DeleteCustomerPayload;
  DeleteProductPayload: DeleteProductPayload;
  DeleteSalePayload: DeleteSalePayload;
  DeleteStaffPayload: DeleteStaffPayload;
  DeleteSupplyPayload: DeleteSupplyPayload;
  DeleteWarehousePayload: DeleteWarehousePayload;
  EditCategoryPayload: EditCategoryPayload;
  EditCustomerPayload: EditCustomerPayload;
  EditProductPayload: EditProductPayload;
  EditSalePayload: EditSalePayload;
  EditStaffPayload: EditStaffPayload;
  EditSupplyPayload: EditSupplyPayload;
  EditWarehousePayload: EditWarehousePayload;
  Enterprise: Enterprise;
  EnterpriseOwner: EnterpriseOwner;
  EnterpriseSocialAccounts: EnterpriseSocialAccounts;
  Feature: Feature;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  Pagins: Pagins;
  Product: Product;
  ProductPayload: ProductPayload;
  ProductsPayload: ProductsPayload;
  Query: {};
  Sale: Sale;
  SalePayload: SalePayload;
  SaleProduct: SaleProduct;
  SaleProfit: SaleProfit;
  SalesPayload: SalesPayload;
  Staff: Staff;
  StaffPayload: StaffPayload;
  StaffsPayload: StaffsPayload;
  Store: Store;
  StorePayload: StorePayload;
  String: Scalars['String'];
  Supply: Supply;
  SupplyPayload: SupplyPayload;
  SupplysPayload: SupplysPayload;
  Timestamps: Timestamps;
  Warehouse: Warehouse;
  WarehousePayload: WarehousePayload;
  WarehousesPayload: WarehousesPayload;
  addCategoryInput: AddCategoryInput;
  addCustomerInput: AddCustomerInput;
  addEnterpriseInput: AddEnterpriseInput;
  addEnterprisePayload: AddEnterprisePayload;
  addOwnerInput: AddOwnerInput;
  addProductInput: AddProductInput;
  addSaleInput: AddSaleInput;
  addSaleProfitInput: AddSaleProfitInput;
  addSocialAccountInput: AddSocialAccountInput;
  addStaffInput: AddStaffInput;
  addSupplyInput: AddSupplyInput;
  addWarehouseInput: AddWarehouseInput;
  categoryPayload: CategoryPayload;
  customerMetasInput: CustomerMetasInput;
  customerSocialMediaInput: CustomerSocialMediaInput;
  editCategoryInput: EditCategoryInput;
  editCustomerInput: EditCustomerInput;
  editEnterpriseInput: EditEnterpriseInput;
  editEnterprisePayload: EditEnterprisePayload;
  editFeature: EditFeature;
  editOwnerInput: EditOwnerInput;
  editProductInput: EditProductInput;
  editSaleInput: EditSaleInput;
  editStaffInput: EditStaffInput;
  editSupplyInput: EditSupplyInput;
  editWarehouseInput: EditWarehouseInput;
  enterPrisePayload: EnterPrisePayload;
  initPayload: InitPayload;
  paginInput: PaginInput;
  saleProductMetaInput: SaleProductMetaInput;
  searchCustomerInput: SearchCustomerInput;
  searchProductInput: SearchProductInput;
  searchSaleInput: SearchSaleInput;
  searchStaffInput: SearchStaffInput;
  searchSupplyInput: SearchSupplyInput;
  warehouseSearchInput: WarehouseSearchInput;
}>;

export type AddCategoryPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['AddCategoryPayload'] = ResolversParentTypes['AddCategoryPayload']> = ResolversObject<{
  added?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newAdded?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AddCustomerPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['AddCustomerPayload'] = ResolversParentTypes['AddCustomerPayload']> = ResolversObject<{
  added?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newAdded?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AddProductPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['AddProductPayload'] = ResolversParentTypes['AddProductPayload']> = ResolversObject<{
  added?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newAdded?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AddSalePayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['AddSalePayload'] = ResolversParentTypes['AddSalePayload']> = ResolversObject<{
  added?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newAdded?: Resolver<Maybe<ResolversTypes['Sale']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AddStaffPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['AddStaffPayload'] = ResolversParentTypes['AddStaffPayload']> = ResolversObject<{
  added?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newAdded?: Resolver<Maybe<ResolversTypes['Staff']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AddSupplyPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['AddSupplyPayload'] = ResolversParentTypes['AddSupplyPayload']> = ResolversObject<{
  added?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newAdded?: Resolver<Maybe<ResolversTypes['Supply']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AddWarehousePayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['AddWarehousePayload'] = ResolversParentTypes['AddWarehousePayload']> = ResolversObject<{
  added?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newAdded?: Resolver<Maybe<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AddWarehouseStaffPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['AddWarehouseStaffPayload'] = ResolversParentTypes['AddWarehouseStaffPayload']> = ResolversObject<{
  added?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = ResolversObject<{
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomerResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['Customer'] = ResolversParentTypes['Customer']> = ResolversObject<{
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  beneficiary?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  customerID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  metas?: Resolver<Maybe<ResolversTypes['CustomerMetaData']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  supplys?: Resolver<Array<ResolversTypes['Sale']>, ParentType, ContextType>;
  warehouse?: Resolver<Maybe<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  warehouseID?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomerMetaDataResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['CustomerMetaData'] = ResolversParentTypes['CustomerMetaData']> = ResolversObject<{
  avatarURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dateOfBirth?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  socialMedia?: Resolver<Maybe<ResolversTypes['CustomerSocialMedia']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomerPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['CustomerPayload'] = ResolversParentTypes['CustomerPayload']> = ResolversObject<{
  customer?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomerSocialMediaResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['CustomerSocialMedia'] = ResolversParentTypes['CustomerSocialMedia']> = ResolversObject<{
  facebook?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  instagram?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twitter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomersPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['CustomersPayload'] = ResolversParentTypes['CustomersPayload']> = ResolversObject<{
  customers?: Resolver<Array<ResolversTypes['Customer']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pagins?: Resolver<Maybe<ResolversTypes['Pagins']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DeleteCategoryPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['DeleteCategoryPayload'] = ResolversParentTypes['DeleteCategoryPayload']> = ResolversObject<{
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DeleteCustomerPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['DeleteCustomerPayload'] = ResolversParentTypes['DeleteCustomerPayload']> = ResolversObject<{
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DeleteProductPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['DeleteProductPayload'] = ResolversParentTypes['DeleteProductPayload']> = ResolversObject<{
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DeleteSalePayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['DeleteSalePayload'] = ResolversParentTypes['DeleteSalePayload']> = ResolversObject<{
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DeleteStaffPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['DeleteStaffPayload'] = ResolversParentTypes['DeleteStaffPayload']> = ResolversObject<{
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DeleteSupplyPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['DeleteSupplyPayload'] = ResolversParentTypes['DeleteSupplyPayload']> = ResolversObject<{
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DeleteWarehousePayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['DeleteWarehousePayload'] = ResolversParentTypes['DeleteWarehousePayload']> = ResolversObject<{
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EditCategoryPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['EditCategoryPayload'] = ResolversParentTypes['EditCategoryPayload']> = ResolversObject<{
  edited?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newValue?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  oldValue?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EditCustomerPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['EditCustomerPayload'] = ResolversParentTypes['EditCustomerPayload']> = ResolversObject<{
  edited?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newEdited?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EditProductPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['EditProductPayload'] = ResolversParentTypes['EditProductPayload']> = ResolversObject<{
  edited?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newEdited?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EditSalePayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['EditSalePayload'] = ResolversParentTypes['EditSalePayload']> = ResolversObject<{
  edited?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newEdited?: Resolver<Maybe<ResolversTypes['Sale']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EditStaffPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['EditStaffPayload'] = ResolversParentTypes['EditStaffPayload']> = ResolversObject<{
  edited?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newEdited?: Resolver<Maybe<ResolversTypes['Staff']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EditSupplyPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['EditSupplyPayload'] = ResolversParentTypes['EditSupplyPayload']> = ResolversObject<{
  edited?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newEdited?: Resolver<Maybe<ResolversTypes['Supply']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EditWarehousePayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['EditWarehousePayload'] = ResolversParentTypes['EditWarehousePayload']> = ResolversObject<{
  edited?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newEdited?: Resolver<Maybe<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EnterpriseResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['Enterprise'] = ResolversParentTypes['Enterprise']> = ResolversObject<{
  about?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contacts?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  customers?: Resolver<Array<ResolversTypes['Customer']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owners?: Resolver<Array<ResolversTypes['EnterpriseOwner']>, ParentType, ContextType>;
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
  slogan?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  socialAccounts?: Resolver<Maybe<ResolversTypes['EnterpriseSocialAccounts']>, ParentType, ContextType>;
  staffs?: Resolver<Array<ResolversTypes['Staff']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  warehouses?: Resolver<Array<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EnterpriseOwnerResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['EnterpriseOwner'] = ResolversParentTypes['EnterpriseOwner']> = ResolversObject<{
  about?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  socialAccounts?: Resolver<Maybe<ResolversTypes['EnterpriseSocialAccounts']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EnterpriseSocialAccountsResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['EnterpriseSocialAccounts'] = ResolversParentTypes['EnterpriseSocialAccounts']> = ResolversObject<{
  facebook?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  instagram?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twitter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  youtube?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FeatureResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['Feature'] = ResolversParentTypes['Feature']> = ResolversObject<{
  extension?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fileName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  filePath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  _initializeSys?: Resolver<ResolversTypes['initPayload'], ParentType, ContextType, RequireFields<Mutation_InitializeSysArgs, '_init'>>;
  addCategory?: Resolver<ResolversTypes['AddCategoryPayload'], ParentType, ContextType, RequireFields<MutationAddCategoryArgs, 'addCategoryInput'>>;
  addCustomer?: Resolver<ResolversTypes['AddCustomerPayload'], ParentType, ContextType, RequireFields<MutationAddCustomerArgs, 'addCustomerInput'>>;
  addEnterprise?: Resolver<ResolversTypes['addEnterprisePayload'], ParentType, ContextType, RequireFields<MutationAddEnterpriseArgs, 'addEnterpriseInput'>>;
  addProduct?: Resolver<ResolversTypes['AddProductPayload'], ParentType, ContextType, RequireFields<MutationAddProductArgs, 'addProductInput'>>;
  addSale?: Resolver<ResolversTypes['AddSalePayload'], ParentType, ContextType, RequireFields<MutationAddSaleArgs, 'addSaleInput'>>;
  addStaff?: Resolver<ResolversTypes['AddStaffPayload'], ParentType, ContextType, RequireFields<MutationAddStaffArgs, 'addStaffInput'>>;
  addWarehouse?: Resolver<ResolversTypes['AddWarehousePayload'], ParentType, ContextType, RequireFields<MutationAddWarehouseArgs, 'addWarehouseInput'>>;
  deleteCategory?: Resolver<ResolversTypes['DeleteCategoryPayload'], ParentType, ContextType, RequireFields<MutationDeleteCategoryArgs, 'category'>>;
  deleteCustomer?: Resolver<ResolversTypes['DeleteCustomerPayload'], ParentType, ContextType, RequireFields<MutationDeleteCustomerArgs, 'customerID'>>;
  deleteProduct?: Resolver<ResolversTypes['DeleteProductPayload'], ParentType, ContextType, RequireFields<MutationDeleteProductArgs, 'productID'>>;
  deleteSale?: Resolver<ResolversTypes['DeleteSalePayload'], ParentType, ContextType, RequireFields<MutationDeleteSaleArgs, 'saleID'>>;
  deleteStaff?: Resolver<ResolversTypes['DeleteStaffPayload'], ParentType, ContextType, RequireFields<MutationDeleteStaffArgs, 'staffID'>>;
  deleteSupply?: Resolver<ResolversTypes['DeleteSupplyPayload'], ParentType, ContextType, RequireFields<MutationDeleteSupplyArgs, 'supplyID'>>;
  deleteWarehouse?: Resolver<ResolversTypes['DeleteWarehousePayload'], ParentType, ContextType, RequireFields<MutationDeleteWarehouseArgs, 'warehouseID'>>;
  editCategory?: Resolver<ResolversTypes['EditCategoryPayload'], ParentType, ContextType, RequireFields<MutationEditCategoryArgs, 'editCategoryInput'>>;
  editCustomer?: Resolver<ResolversTypes['EditCustomerPayload'], ParentType, ContextType, RequireFields<MutationEditCustomerArgs, 'editCustomerInput'>>;
  editEnterprise?: Resolver<ResolversTypes['editEnterprisePayload'], ParentType, ContextType, RequireFields<MutationEditEnterpriseArgs, 'editEnterpriseInput'>>;
  editProduct?: Resolver<ResolversTypes['EditProductPayload'], ParentType, ContextType, RequireFields<MutationEditProductArgs, 'editProductInput'>>;
  editSale?: Resolver<ResolversTypes['EditSalePayload'], ParentType, ContextType, RequireFields<MutationEditSaleArgs, 'editSaleInput'>>;
  editStaff?: Resolver<ResolversTypes['EditStaffPayload'], ParentType, ContextType, RequireFields<MutationEditStaffArgs, 'editStaffInput'>>;
  editSupply?: Resolver<ResolversTypes['EditSupplyPayload'], ParentType, ContextType, RequireFields<MutationEditSupplyArgs, 'editSupplyInput' | 'supplyID'>>;
  editWarehouse?: Resolver<ResolversTypes['EditWarehousePayload'], ParentType, ContextType, RequireFields<MutationEditWarehouseArgs, 'editWarehouseInput'>>;
  makeSupply?: Resolver<ResolversTypes['AddSupplyPayload'], ParentType, ContextType, RequireFields<MutationMakeSupplyArgs, 'addSupplyInput'>>;
}>;

export type PaginsResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['Pagins'] = ResolversParentTypes['Pagins']> = ResolversObject<{
  currentPageIndex?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  nextPageIndex?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sort?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalDocuments?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalPaginated?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = ResolversObject<{
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expirationDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expired?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  features?: Resolver<Maybe<Array<Maybe<ResolversTypes['Feature']>>>, ParentType, ContextType>;
  inStock?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  retailPrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  warehouses?: Resolver<Maybe<Array<ResolversTypes['Warehouse']>>, ParentType, ContextType>;
  wholesalePrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['ProductPayload'] = ResolversParentTypes['ProductPayload']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductsPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['ProductsPayload'] = ResolversParentTypes['ProductsPayload']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pagins?: Resolver<Maybe<ResolversTypes['Pagins']>, ParentType, ContextType>;
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  customer?: Resolver<ResolversTypes['CustomerPayload'], ParentType, ContextType, RequireFields<QueryCustomerArgs, 'searchFilter'>>;
  customers?: Resolver<ResolversTypes['CustomersPayload'], ParentType, ContextType, Partial<QueryCustomersArgs>>;
  product?: Resolver<ResolversTypes['ProductPayload'], ParentType, ContextType, RequireFields<QueryProductArgs, 'searchFilter'>>;
  products?: Resolver<ResolversTypes['ProductsPayload'], ParentType, ContextType, Partial<QueryProductsArgs>>;
  sale?: Resolver<ResolversTypes['SalePayload'], ParentType, ContextType, RequireFields<QuerySaleArgs, 'searchFilter'>>;
  sales?: Resolver<ResolversTypes['SalesPayload'], ParentType, ContextType, Partial<QuerySalesArgs>>;
  staff?: Resolver<ResolversTypes['StaffPayload'], ParentType, ContextType, RequireFields<QueryStaffArgs, 'searchFilter'>>;
  staffs?: Resolver<ResolversTypes['StaffsPayload'], ParentType, ContextType, Partial<QueryStaffsArgs>>;
  store?: Resolver<ResolversTypes['Store'], ParentType, ContextType>;
  supplies?: Resolver<ResolversTypes['SupplysPayload'], ParentType, ContextType, Partial<QuerySuppliesArgs>>;
  supply?: Resolver<ResolversTypes['SupplyPayload'], ParentType, ContextType, RequireFields<QuerySupplyArgs, 'searchFilter'>>;
  warehouse?: Resolver<ResolversTypes['WarehousePayload'], ParentType, ContextType, RequireFields<QueryWarehouseArgs, 'searchFilter'>>;
  warehouses?: Resolver<ResolversTypes['WarehousesPayload'], ParentType, ContextType, Partial<QueryWarehousesArgs>>;
}>;

export type SaleResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['Sale'] = ResolversParentTypes['Sale']> = ResolversObject<{
  balance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  customer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType>;
  customerID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  discount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  kind?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  paid?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  products?: Resolver<Array<ResolversTypes['SaleProduct']>, ParentType, ContextType>;
  profit?: Resolver<Maybe<ResolversTypes['SaleProfit']>, ParentType, ContextType>;
  saleID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  staff?: Resolver<ResolversTypes['Staff'], ParentType, ContextType>;
  staffID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  totalPrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalQuantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  warehouse?: Resolver<Maybe<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  warehouseID?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SalePayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['SalePayload'] = ResolversParentTypes['SalePayload']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sale?: Resolver<Maybe<ResolversTypes['Sale']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SaleProductResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['SaleProduct'] = ResolversParentTypes['SaleProduct']> = ResolversObject<{
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expirationDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expired?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  images?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  inStock?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  kind?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  retailPrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  subTotal?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  warehouse?: Resolver<Maybe<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  wholesalePrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SaleProfitResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['SaleProfit'] = ResolversParentTypes['SaleProfit']> = ResolversObject<{
  percentage?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SalesPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['SalesPayload'] = ResolversParentTypes['SalesPayload']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pagins?: Resolver<Maybe<ResolversTypes['Pagins']>, ParentType, ContextType>;
  sales?: Resolver<Array<ResolversTypes['Sale']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StaffResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['Staff'] = ResolversParentTypes['Staff']> = ResolversObject<{
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  otherName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes['Feature']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['StaffRole'], ParentType, ContextType>;
  staffID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  warehouse?: Resolver<Maybe<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StaffPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['StaffPayload'] = ResolversParentTypes['StaffPayload']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  staff?: Resolver<Maybe<ResolversTypes['Staff']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StaffsPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['StaffsPayload'] = ResolversParentTypes['StaffsPayload']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pagin?: Resolver<Maybe<ResolversTypes['Pagins']>, ParentType, ContextType>;
  staffs?: Resolver<Array<ResolversTypes['Staff']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StoreResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['Store'] = ResolversParentTypes['Store']> = ResolversObject<{
  _enterpriseInitialized?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  _sysInitialized?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  enterPrise?: Resolver<Maybe<ResolversTypes['enterPrisePayload']>, ParentType, ContextType>;
  totalCustomers?: Resolver<Maybe<ResolversTypes['StorePayload']>, ParentType, ContextType>;
  totalExpiredProducts?: Resolver<Maybe<ResolversTypes['StorePayload']>, ParentType, ContextType>;
  totalProducts?: Resolver<Maybe<ResolversTypes['StorePayload']>, ParentType, ContextType>;
  totalSales?: Resolver<Maybe<ResolversTypes['StorePayload']>, ParentType, ContextType>;
  totalStaffs?: Resolver<Maybe<ResolversTypes['StorePayload']>, ParentType, ContextType>;
  totalWarehouses?: Resolver<Maybe<ResolversTypes['StorePayload']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StorePayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['StorePayload'] = ResolversParentTypes['StorePayload']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SupplyResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['Supply'] = ResolversParentTypes['Supply']> = ResolversObject<{
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productIDs?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
  staff?: Resolver<Maybe<ResolversTypes['Staff']>, ParentType, ContextType>;
  staffID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  supplyID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamps?: Resolver<Maybe<ResolversTypes['Timestamps']>, ParentType, ContextType>;
  totalPrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalQuantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SupplyPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['SupplyPayload'] = ResolversParentTypes['SupplyPayload']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  supply?: Resolver<Maybe<ResolversTypes['Supply']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SupplysPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['SupplysPayload'] = ResolversParentTypes['SupplysPayload']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pagins?: Resolver<Maybe<ResolversTypes['Pagins']>, ParentType, ContextType>;
  supplies?: Resolver<Maybe<Array<ResolversTypes['Supply']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TimestampsResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['Timestamps'] = ResolversParentTypes['Timestamps']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  currentTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WarehouseResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['Warehouse'] = ResolversParentTypes['Warehouse']> = ResolversObject<{
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productIDs?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
  staffIDs?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  staffs?: Resolver<Array<ResolversTypes['Staff']>, ParentType, ContextType>;
  warehouseID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WarehousePayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['WarehousePayload'] = ResolversParentTypes['WarehousePayload']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  warehouse?: Resolver<Maybe<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WarehousesPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['WarehousesPayload'] = ResolversParentTypes['WarehousesPayload']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  warehouses?: Resolver<Array<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AddEnterprisePayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['addEnterprisePayload'] = ResolversParentTypes['addEnterprisePayload']> = ResolversObject<{
  added?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newAdded?: Resolver<Maybe<ResolversTypes['Enterprise']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['categoryPayload'] = ResolversParentTypes['categoryPayload']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EditEnterprisePayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['editEnterprisePayload'] = ResolversParentTypes['editEnterprisePayload']> = ResolversObject<{
  edited?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newEdited?: Resolver<Maybe<ResolversTypes['Enterprise']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EnterPrisePayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['enterPrisePayload'] = ResolversParentTypes['enterPrisePayload']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  result?: Resolver<Maybe<ResolversTypes['Enterprise']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InitPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['initPayload'] = ResolversParentTypes['initPayload']> = ResolversObject<{
  _initialized?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = IResolverContext> = ResolversObject<{
  AddCategoryPayload?: AddCategoryPayloadResolvers<ContextType>;
  AddCustomerPayload?: AddCustomerPayloadResolvers<ContextType>;
  AddProductPayload?: AddProductPayloadResolvers<ContextType>;
  AddSalePayload?: AddSalePayloadResolvers<ContextType>;
  AddStaffPayload?: AddStaffPayloadResolvers<ContextType>;
  AddSupplyPayload?: AddSupplyPayloadResolvers<ContextType>;
  AddWarehousePayload?: AddWarehousePayloadResolvers<ContextType>;
  AddWarehouseStaffPayload?: AddWarehouseStaffPayloadResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  Customer?: CustomerResolvers<ContextType>;
  CustomerMetaData?: CustomerMetaDataResolvers<ContextType>;
  CustomerPayload?: CustomerPayloadResolvers<ContextType>;
  CustomerSocialMedia?: CustomerSocialMediaResolvers<ContextType>;
  CustomersPayload?: CustomersPayloadResolvers<ContextType>;
  DeleteCategoryPayload?: DeleteCategoryPayloadResolvers<ContextType>;
  DeleteCustomerPayload?: DeleteCustomerPayloadResolvers<ContextType>;
  DeleteProductPayload?: DeleteProductPayloadResolvers<ContextType>;
  DeleteSalePayload?: DeleteSalePayloadResolvers<ContextType>;
  DeleteStaffPayload?: DeleteStaffPayloadResolvers<ContextType>;
  DeleteSupplyPayload?: DeleteSupplyPayloadResolvers<ContextType>;
  DeleteWarehousePayload?: DeleteWarehousePayloadResolvers<ContextType>;
  EditCategoryPayload?: EditCategoryPayloadResolvers<ContextType>;
  EditCustomerPayload?: EditCustomerPayloadResolvers<ContextType>;
  EditProductPayload?: EditProductPayloadResolvers<ContextType>;
  EditSalePayload?: EditSalePayloadResolvers<ContextType>;
  EditStaffPayload?: EditStaffPayloadResolvers<ContextType>;
  EditSupplyPayload?: EditSupplyPayloadResolvers<ContextType>;
  EditWarehousePayload?: EditWarehousePayloadResolvers<ContextType>;
  Enterprise?: EnterpriseResolvers<ContextType>;
  EnterpriseOwner?: EnterpriseOwnerResolvers<ContextType>;
  EnterpriseSocialAccounts?: EnterpriseSocialAccountsResolvers<ContextType>;
  Feature?: FeatureResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Pagins?: PaginsResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductPayload?: ProductPayloadResolvers<ContextType>;
  ProductsPayload?: ProductsPayloadResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Sale?: SaleResolvers<ContextType>;
  SalePayload?: SalePayloadResolvers<ContextType>;
  SaleProduct?: SaleProductResolvers<ContextType>;
  SaleProfit?: SaleProfitResolvers<ContextType>;
  SalesPayload?: SalesPayloadResolvers<ContextType>;
  Staff?: StaffResolvers<ContextType>;
  StaffPayload?: StaffPayloadResolvers<ContextType>;
  StaffsPayload?: StaffsPayloadResolvers<ContextType>;
  Store?: StoreResolvers<ContextType>;
  StorePayload?: StorePayloadResolvers<ContextType>;
  Supply?: SupplyResolvers<ContextType>;
  SupplyPayload?: SupplyPayloadResolvers<ContextType>;
  SupplysPayload?: SupplysPayloadResolvers<ContextType>;
  Timestamps?: TimestampsResolvers<ContextType>;
  Warehouse?: WarehouseResolvers<ContextType>;
  WarehousePayload?: WarehousePayloadResolvers<ContextType>;
  WarehousesPayload?: WarehousesPayloadResolvers<ContextType>;
  addEnterprisePayload?: AddEnterprisePayloadResolvers<ContextType>;
  categoryPayload?: CategoryPayloadResolvers<ContextType>;
  editEnterprisePayload?: EditEnterprisePayloadResolvers<ContextType>;
  enterPrisePayload?: EnterPrisePayloadResolvers<ContextType>;
  initPayload?: InitPayloadResolvers<ContextType>;
}>;

