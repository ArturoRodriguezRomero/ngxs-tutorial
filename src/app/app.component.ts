import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Increment, Decrement, SetTotal } from './store/counter.actions';
import { Observable } from 'rxjs';
import { CounterStateModel, CounterState } from './store/counter.state';
import { UsersRequestAttempt } from './store/users.actions';
import { UsersStateModel } from './store/users.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Seleccionamos el 'slice' counter del estado global.
  @Select(state => state.counter)
  counter$: Observable<CounterStateModel>;

  @Select(state => state.users)
  users$: Observable<UsersStateModel>;

  // Injectamos la store global en el componente.
  constructor(private store: Store) {}

  // Invocamos a las acciones del store.
  increment() {
    this.store.dispatch(new Increment());
  }

  decrement() {
    this.store.dispatch(new Decrement());
  }

  reset() {
    this.store.dispatch(new SetTotal(0));
  }

  ngOnInit(): void {
    this.store.dispatch(new UsersRequestAttempt());
  }
}
