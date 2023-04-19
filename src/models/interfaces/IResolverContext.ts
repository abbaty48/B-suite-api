import { IConfig } from 'config';
import { Models } from 'mongoose';

export interface IResolverContext {
  config: IConfig;
  models: Models;
}
