import zod , {ZodError} from 'zod';
import { NextFunction } from 'express';
import createHttpError from 'http-errors';

const validator = (schema: zod.ZodObject<any, any> , body : object , next : NextFunction) => {
  try {
    const value  = schema.safeParse(body);
    if(value.success)
    {
      return next();
    }
        
    return next(createHttpError(400 ,"format incorrect", {details: value.error.errors}));
  } catch (error) {
    if(error instanceof ZodError)
    {
      return next(createHttpError(400 , "validation error", {details: error.errors}));
    }
    return next(createHttpError(500 , "internal server error"));
  }
}

export default validator;