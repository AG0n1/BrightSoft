import {create} from 'zustand';
import {parseJwt} from '@common/utils/jwt';
import {getStars, getUserInfo} from '@common/utils/globalActions';
import {isNil} from 'lodash';
import {IAccessToken} from "../types/commonTypes";

const userRoles = ['administrator', 'user', 'support'] as const;
export type IUserRoles = (typeof userRoles)[number];

const userStatuses = ['active', 'non_active', 'blocked', 'deleted'] as const;
export type UserStatusesType = (typeof userStatuses)[number]

interface IUser {
  user: string | null;
  role: IUserRoles;
  stars: number | string;
  userData: IAccessToken | null,
}

export interface IUserStore extends IUser {
  setUser: (id: string) => void;
  logoutUser: () => void;
  setStars: (amount: number | null) => void;
}

export const useUserStore = create<IUserStore>((set) => {
  const savedToken = localStorage.getItem('access_token');
  const starSetter = async (amount: number | null) => {
    if (!isNil(amount)) {
      return set(() => ({
        stars: amount,
      }));
    }
    if (isNil(savedToken)) {
      return;
    }
    const { data } = await getStars(parseJwt(savedToken).id);

    set(() => ({
      stars: data ?? 'Упс',
    }));
  };
  starSetter(null);
  return {
    user: savedToken ? parseJwt(savedToken).id : null,
    role: savedToken ? parseJwt(savedToken).role : 'user',
    stars: 'Не известно',
    setUser: (access_token: string) => getUserInfo(access_token, set),
    setStars: starSetter,
    userData: savedToken ? parseJwt(savedToken) : null,
    logoutUser: (): void => {
      localStorage.removeItem('access_token');
      set(() => ({ user: null, role: 'user' }));
    },
  };
});
