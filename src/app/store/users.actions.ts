import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.model';

export class UsersRequestAttempt {
  static readonly type = '[User] Request Attempt';
  constructor() {}
}

export class UsersRequestSuccess {
  static readonly type = '[User] Request Success';
  constructor(public users: User[]) {}
}

export class UsersRequestFailure {
  static readonly type = '[User] Request Failure';
  constructor(public error: HttpErrorResponse) {}
}
