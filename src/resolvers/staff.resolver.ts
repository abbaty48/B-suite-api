import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import { StaffRole } from '@server-databases/mongodb/enums/Role';
import { staffModel } from '@server-databases/mongodb/schema_staff';
import staffRoleAuthorization from '@server-commons/auths/authorizationMiddleware';
import {
  decodeRSAKey,
  genRandom,
  stringToID,
  escapeRegExp,
} from '@server-commons/helpers';
import {
  IStaffPayload,
  IStaffsPayload,
  IStaffAddPayload,
  IStaffEditPayload,
  IStaffDeletePayload,
  IStaffSearchFilter,
} from '@server-databases/mongodb/interfaces/IStaff';
import { IPagin, Pagin } from '@/src/databases/mongodb/interfaces/IPagin';
import { RolePrevileges } from '@server-databases/mongodb/enums/RolePrevilage';
import { IResolverContext } from '@server-commons/models/interfaces/IResolverContext';

export const StaffResolver = {
  staff: async (
    searchFilter: IStaffSearchFilter,
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<IStaffPayload>(async (resolve) => {
      try {
        //
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.READ_STAFF
        );
        // SEARCH A STAFF BY EITHER (staffID, firstName, lastName, warehouse)
        //AND POPULATE THE STAFF WITH WAREHOUSE
        const { staffID, firstName, lastName, warehouseID } = searchFilter;
        const staff = await staffModel.findOne(
          {
            $or: [
              { staffID: { $regex: escapeRegExp(staffID), $options: 'si' } },
              {
                firstName: { $regex: escapeRegExp(firstName), $options: 'si' },
              },
              { lastName: { $regex: escapeRegExp(lastName), $options: 'si' } },
              warehouseID
                ? {
                    warehouse: {
                      warehouseID: { $eq: stringToID(warehouseID) },
                    },
                  }
                : {},
            ],
          },
          {},
          { populate: 'warehouse' }
        );
        resolve({
          error: null,
          staff,
        });
      } catch (error) {
        resolve({
          error: error.message,
          staff: null,
        });
      }
    });
  },
  staffs: async (
    searchFilter: IStaffSearchFilter,
    pagin: IPagin,
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<IStaffsPayload>(async (resolve) => {
      try {
        // AUTHENTICATED
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.READ_STAFF
        );
        // SEARCH FILTER
        const { staffID, firstName, lastName, warehouseID } =
          searchFilter ?? {};
        // PAGINATE THE STAFFS
        const sort = pagin.sort ?? Pagin.sort,
          limit = pagin.limit ?? Pagin.limit,
          pageIndex = pagin.pageIndex ?? Pagin.pageIndex;
        //
        const staffs = await staffModel.find(
          {
            $or: [
              staffID
                ? {
                    staffID: {
                      $regex: escapeRegExp(staffID),
                      $options: 'si',
                    },
                  }
                : {},
              firstName
                ? {
                    firstName: {
                      $regex: escapeRegExp(firstName),
                      $options: 'si',
                    },
                  }
                : {},
              lastName
                ? {
                    lastName: {
                      $regex: escapeRegExp(lastName),
                      $options: 'si',
                    },
                  }
                : {},
              warehouseID
                ? {
                    warehouse: {
                      warehouseID: { $eq: stringToID(warehouseID) },
                    },
                  }
                : {},
            ],
          },
          {},
          {
            sort: { firstName: sort },
            skip: limit * pageIndex,
            limit,
            populate: 'warehouse',
          }
        );
        // POPULATE THE STAFF WITH WAREHOUSE
        resolve({
          error: null,
          staffs,
          pagins: {
            sort,
            nextPageIndex: pageIndex + 1,
            currentPageIndex: pageIndex,
            totalPaginated: staffs.length,
            totalDocuments: await staffModel.count(),
          },
        });
      } catch (error) {
        resolve({
          error: error.message,
          staffs: [],
        });
      }
    });
  },
  addStaff: async (
    addStaffInput: any,
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<IStaffAddPayload>(async (resolve) => {
      try {
        // AUTHORIZE ONLY A MANAGER/ACCOUTANT/ADMIN
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.ADD_STAFF
        );

        const { firstName, lastName, email, password, role } = addStaffInput;

        // CHECK USER VALIDATION
        if (role === StaffRole.Manager || role === StaffRole.Admin) {
          // check for already manager
          if (
            await staffModel.exists({
              $or: [
                role == StaffRole.Manager ? { role: StaffRole.Manager } : {},
                role == StaffRole.Admin ? { role: StaffRole.Admin } : {},
              ],
            })
          ) {
            return resolve({
              added: false,
              newAdded: null,
              error: `[VALIDATION ERROR]: A staff with a "${role}" role already exist, only one manager/admin is allowed, please provide a different role.`,
            });
          }
        }
        //   GENERATE STAFF UNIQUE ID
        const staffID = `ID${genRandom().slice(0, 5).toUpperCase()}`;
        //   BCRYPT STAFF PASSWORD
        const passwordHash = await bcrypt.hash(
          password,
          await bcrypt.genSalt()
        );
        //   GENERATE TOKEN
        const token = JWT.sign(
          {
            staffID,
            firstName,
            lastName,
            email,
            role,
          },
          decodeRSAKey(config.get('jwt.private')),
          { algorithm: 'HS512' }
        );

        const newStaff = await staffModel.create({
          ...addStaffInput,
          staffID,
          token,
          password: passwordHash,
        });

        resolve({
          error: null,
          added: true,
          newAdded: newStaff,
        });
      } catch (error) {
        resolve({
          error: error.message,
          added: false,
          newAdded: null,
        });
      }
    }); // end Promise
  }, // end addStaff
  editStaff: async (
    editStaffInput: any,
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<IStaffEditPayload>(async (resolve) => {
      try {
        // AUTHORIZE ONLY A MANAGER/ACCOUTANT/ADMIN
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.UPDATE_STAFF
        );
        // TARGET STAFF
        const { staffID, firstName, lastName, email, role } =
          await staffModel.findOne({ staffID: editStaffInput.staffID });
        // CHECK USER VALIDATION
        if (editStaffInput.role) {
          if (
            editStaffInput.role === StaffRole.Manager ||
            editStaffInput.role === StaffRole.Admin
          ) {
            // check for already manager
            if (
              await staffModel.exists({
                $or: [{ role: StaffRole.Manager }, { role: StaffRole.Admin }],
              })
            ) {
              return resolve({
                edited: false,
                newEdited: null,
                error: `[VALIDATION ERROR]: A staff with a "${editStaffInput.role}" role already exist, only one manager/admin is allowed, please provide a different role.`,
              });
            }
          }
        } // end if input.role
        // IF TO UPDATE THE PASSWORD
        let passwordHash, token: string;
        if (editStaffInput.password) {
          //   BCRYPT STAFF PASSWORD
          passwordHash = await bcrypt.hash(
            editStaffInput.password,
            await bcrypt.genSalt()
          );

          //   GENERATE TOKEN
          token = JWT.sign(
            {
              staffID,
              firstName,
              lastName,
              email,
              role,
            },
            decodeRSAKey(config.get('jwt.private')),
            { algorithm: 'HS512' }
          );

          // UPDATE WITH PASSWORD
          const newEdited = await staffModel.findOneAndUpdate(
            { staffID: editStaffInput.staffID },
            { ...editStaffInput, password: passwordHash, token }
          );

          return resolve({
            edited: true,
            error: null,
            newEdited,
          });
        } // end editStaffInput.password
        // EDIT STAFF
        const newEdited = await staffModel.findOneAndUpdate(
          { staffID: editStaffInput.staffID },
          { ...editStaffInput }
        );
        // RESOLVE
        resolve({
          edited: true,
          error: null,
          newEdited,
        });
      } catch (error) {
        resolve({
          edited: false,
          newEdited: null,
          error: `[EXCEPTION]: ${error.message}`,
        });
      }
    }); // end
  }, // end editStaff
  deleteStaff: async (
    staffID: string,
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<IStaffDeletePayload>(async (resolve) => {
      try {
        // AUTHORIZE ONLY A MANAGER/ACCOUTANT/ADMIN
        const authStaff = await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.DELETE_STAFF
        );
        // TARGET STAFF
        const { role } = await staffModel.findOne({ staffID });
        if (role === StaffRole.Manager || role === StaffRole.Admin) {
          // ONLY ADMIN/MANAGER COULD DELETE A MANAGER/ADMIN
          switch (authStaff.role) {
            case StaffRole.Saller:
            case StaffRole.Warehouse:
            case StaffRole.Accountant:
              return resolve({
                deleted: false,
                error:
                  '[UNAUTHORIZED ACTION]: Only a admin/manager could delete an admin/manager account.',
              });
          } // end switch
        } // end if role
        // DELETE THE TARGET
        await staffModel.findOneAndRemove({ staffID });
        // RESOLVE
        resolve({
          deleted: true,
          error: null,
        });
      } catch (error) {
        // RESOLVE
        resolve({
          deleted: false,
          error: `[EXCEPTION]: ${error.message}`,
        });
      }
    }); // end promise
  }, // end deleteStaff
}; // end StaffResolver
