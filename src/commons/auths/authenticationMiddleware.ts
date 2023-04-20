import Jwt from 'jsonwebtoken';
import { Request } from 'express';
import { GraphQLError } from 'graphql';
import { decodeRSAKey } from '@/src/commons/commons.helpers';
import { staffModel } from '@server-databases/mongodb/schema_staff';
import { IStaff } from '@server-databases/mongodb/interfaces/IStaff';

export const authenticationToken = async (
  request: Request,
  privateKey: string
): Promise<IStaff> => {
  // check the Authorization key existence
  const bearer = request.headers.authorization;

  if (!bearer) {
    throw new GraphQLError(
      'Authorization bearer not found, authentication is required, provide your token.',
      {
        extensions: {
          code: 'BAD_REQUEST',
          http: { status: 400 },
        },
      }
    );
  }

  // check the token validity
  const token = bearer.split(' ')[1];
  if (!token) {
    throw new GraphQLError('Token is missing in the authorization bearer.', {
      extensions: {
        code: 'BAD_REQUEST',
        http: { status: 400 },
      },
    });
  }
  // sign the token
  // let verifyToken: any;
  try {
    Jwt.verify(token, decodeRSAKey(privateKey), {
      algorithms: ['HS512'],
    });
  } catch (error: any) {
    throw new GraphQLError(`Unable to verify token, REASON: ${error.message}`, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
        http: { status: 500 },
      },
    });
  } // end catch
  // get staff info
  const staff = await staffModel.findOne<IStaff>({ token });
  // if staff is not found
  if (!staff) {
    throw new GraphQLError('Staff not found with the provided token.', {
      extensions: {
        code: 'USER_NOT_FOUND',
        http: { status: 401 },
      },
    });
  }
  return Promise.resolve(staff);
};
