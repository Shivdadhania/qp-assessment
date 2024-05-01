export enum Roles {
  Admin = 'ADMIN',
  User = 'USER',
}

export const PERMISSIONS = {
  GROCERY_VIEW: 'grocery.view',
  GROCERY_ADD: 'grocery.add',
  GROCERY_DELETE: 'grocery.delete',
  GROCERY_UPDATE: 'grocery.update',
  GROCERY_BOOK: 'grocery.book',
};

export const ROLE_PERMISSIONS: { [key: string]: string[] } = {
  [Roles.Admin]: [
    PERMISSIONS.GROCERY_VIEW,
    PERMISSIONS.GROCERY_ADD,
    PERMISSIONS.GROCERY_UPDATE,
    PERMISSIONS.GROCERY_DELETE,
  ],
  [Roles.User]: [PERMISSIONS.GROCERY_VIEW, PERMISSIONS.GROCERY_BOOK],
};
