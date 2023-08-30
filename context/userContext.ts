import { AuthTypes } from '@/types'
import { createDomain } from 'effector-next'

const user = createDomain()

export const setUser = user.createEvent<AuthTypes.IUser>()

export const $user = user
    .createStore<AuthTypes.IUser>({} as AuthTypes.IUser)
    .on(setUser, (_, user) => user)