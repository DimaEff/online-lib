export const EXCEPTIONS_MESSAGES = {
  BOOK_OCCUPIED: 'This book is already occupied by another user',
  BOOKS_COUNT_OVERFLOWING: 'The assigned count of user`s books is overflowing',
  NOT_SUBSCRIPTION: 'The user does not have a subscription',
  ALREADY_SUBSCRIBE: 'The user already subscribe',
  ALREADY_UNSUBSCRIBE: 'The user already unsubscribe',
  BOOK_ALREADY_ADDED: 'The book already add for this user',
  BOOK_NOT_ADDED: 'The book has not been added to this user',
  SHOULD_BE_UNIQUE: (field: string) => `The ${field} field should be unique`,
  ALREADY_EXISTS: (entityName: string) => `The ${entityName} already exists`,
  NOT_EXISTS: (entityName: string) => `The ${entityName} does not exist`,
};
