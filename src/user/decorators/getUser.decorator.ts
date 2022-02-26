import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { IUser } from "../user.interface";

export const getUser = createParamDecorator((data: string, ctx: ExecutionContext): IUser => {
  const request = ctx.switchToHttp().getRequest<Request>();
  const user = request.user

  return data ? user?.[data] : user
})