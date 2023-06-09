import { Document } from 'mongoose';
import { StaffRole } from '@server-databases/mongodb/enums/Role';
import { IFeature } from '@server-databases/mongodb/interfaces/IFeature';
import { IWarehouse } from '@server-databases/mongodb/interfaces/IWarehouse';

export interface IStaffPayload {
  error: string | null;
  staff: IStaff | null;
}

export interface IStaffsPayload {
  error: string | null;
  staffs: IStaff[];
  pagins?: {
    sort: string;
    totalDocuments: number;
    totalPaginated: number;
    nextPageIndex: number;
    currentPageIndex: number;
  };
}

export interface IStaffAddPayload {
  error: string | null;
  added: boolean;
  newAdded: IStaff | null;
}

export interface IStaffEditPayload {
  error: string | null;
  edited: boolean;
  newEdited: IStaff | null;
}

export interface IStaffDeletePayload {
  error: string | null;
  deleted: boolean;
}

export interface IStaffSearchFilter {
  staffID?: string;
  firstName?: string;
  lastName?: string;
  warehouseID?: string;
}

export interface IStaff extends Document {
  staffID: string;
  firstName: string;
  lastName: string;
  otherName?: string;
  phoneNumber?: string;
  email?: string;
  picture?: IFeature;
  role: StaffRole;
  address?: string;
  password: string;
  token: string;
  customerID: string;
  warehouseID: string;
  warehouse: IWarehouse;
  _doc: IStaff;
}
