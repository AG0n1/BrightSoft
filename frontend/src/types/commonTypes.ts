import {IUserRoles, UserStatusesType} from '../store/userStore';
import { IField } from './filterTypes';

const userStatuses = ['active', 'blocked', 'deleted', 'non_confirmed'] as const;
export type UserStatuses = (typeof userStatuses)[number];

export interface IOptions {
  label: string;
  value: string;
}

export interface IRegisterDTO {
  name: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  passwordRepeat: FormDataEntryValue | null;
}

export interface IAuthorizationFields {
  label: string;
  name: string;
}

export interface ILoginDTO {
  email: string;
  password: string;
}

export interface IActionsFormat<T> {
  data: T | null;
  ok: boolean;
}

export interface IUserData {
  id: string;
  email: string;
  password: string;
  role: IUserRoles;
  userName: string;
  picture?: string;
  status: UserStatusesType;
  method: 'credantials' | 'google' | 'yandex';
  energy: number;

  firstName: string;
  secondName: string;
  fatherName: string;

  isVerified: boolean;
  isTwoFactorEnabled: boolean;

  createdAt: string; // ISO string, можно заменить на `Date`, если парсится
  updatedAt: string;
}

export interface IAllUsersMapped {
  id: string;
  userName: string;
  role: IUserRoles;
  status: UserStatuses;
  email?: string;
  created_at: string;
  key?: string;
}

export interface IUserInfo {
  user: IUserData;
}

export interface ISuccessLoginDTO {
  access_token: string;
}

export interface INestErrorMessage {
  message?: string[];
  statusCode: number;
}

export interface IAccessToken {
  id: string,
  email: string,
  role: IUserRoles,
  energy: number,
  userName: string,
  firstName: string,
  secondName: string,
  fatherName: string,
}

export interface IRoutesGenerator {
  path: string;
  element?: JSX.Element;
  child?: IRoutesGenerator[];
}

export interface IUserInfoGenerator {
  label: string;
  value?: string;
  activeElement?: Partial<IField>;
}
