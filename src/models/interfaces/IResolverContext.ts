import { IConfig } from 'config';
import { Models } from 'mongoose';
import { IStaff } from '@server-databases/mongodb/interfaces/IStaff';

export interface IResolverContext {
  config: IConfig;
  models: Models;
  privateKey: String;
  authenticatedStaff: IStaff
}
