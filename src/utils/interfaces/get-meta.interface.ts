import { Request } from 'express';

export interface GetMeta {
  req: Request;
  options?: { pagination: boolean };
}
