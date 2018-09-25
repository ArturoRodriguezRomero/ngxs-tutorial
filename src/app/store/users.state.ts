import { User } from '../models/user.model';
import { State, Store, Action, StateContext } from '@ngxs/store';
import {
  UsersRequestAttempt,
  UsersRequestSuccess,
  UsersRequestFailure
} from './users.actions';
import { UsersService } from '../services/users.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface UsersStateModel {
  users: User[];
}

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    users: []
  }
})
export class UsersState {
  constructor(private store: Store, private usersService: UsersService) {}

  @Action(UsersRequestAttempt)
  async UsersRequestAttempt() {
    this.usersService.getUsers().subscribe(
      data => {
        this.store.dispatch(new UsersRequestSuccess(data));
      },
      error => {
        this.store.dispatch(new UsersRequestFailure(error));
      }
    );
  }

  @Action(UsersRequestSuccess)
  UsersRequestSuccess(
    stateContext: StateContext<UsersStateModel>,
    action: UsersRequestSuccess
  ) {
    stateContext.patchState({ users: action.users });
  }

  @Action(UsersRequestFailure)
  UsersRequestFailure(
    stateContext: StateContext<UsersStateModel>,
    action: UsersRequestFailure
  ) {
    console.error('Failed to get Users. Try again later', action.error);
  }
}
