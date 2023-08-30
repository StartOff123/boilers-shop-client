import { ShoppingCartTypes } from '@/types'
import { createDomain } from 'effector-next'

const shoppingCart = createDomain()

export const setShoppingCart = shoppingCart.createEvent<ShoppingCartTypes.IShoppingCartItem[]>()

export const $shoppingCart = shoppingCart
    .createStore<ShoppingCartTypes.IShoppingCartItem[]>([])
    .on(setShoppingCart, (_, shoppingCart) => shoppingCart)