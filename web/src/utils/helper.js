import { UserEnum } from '../types/user-type'

export const findUserTypePath = (path) => {
  switch (path) {
    case 'loja':
      return UserEnum.Store
    case 'admin':
      return UserEnum.Admin
    case 'colaborador':
      return UserEnum.Employee
    default:
      return UserEnum.Customer
  }
}
