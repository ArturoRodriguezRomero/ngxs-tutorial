import { State, Store, StateContext, Action } from '@ngxs/store';

import { Increment, Decrement, SetTotal } from './counter.actions';

// Creamos un tipo para nuestro estado.
export interface CounterStateModel {
  total: number;
}

// Creamos nuestro estado con la anotación @State
// Le damos el tipo al estado.
// Le damos nombre al 'slice' o partición del estado.
// Damos valor por defecto al estado.
@State<CounterStateModel>({
  name: 'counter',
  defaults: {
    total: 0
  }
})
export class CounterState {
  // Injectamos la store global en nuestro estado.
  constructor(private store: Store) {}

  // Relacionamos la acción con su implementación con la anotación @Action(nombre_de_acción).
  // Injectamos a la función el estado actual con 'store: StateContext<CounterStateModel>'.
  // Injectamos la función 'patchState', que actualizará el estado sin sobreescribirlo entero.
  @Action(Increment)
  Increment(stateContext: StateContext<CounterStateModel>) {
    // Recogemos el valor actual del total con 'store.getState().nombre_propiedad'.
    const currentTotal = stateContext.getState().total;
    // Actualizamos el estado con pathState({nombre_propiedad: valor}).
    stateContext.patchState({ total: currentTotal + 1 });
  }

  @Action(Decrement)
  Decrement(stateContext: StateContext<CounterStateModel>) {
    const currentTotal = stateContext.getState().total;
    stateContext.patchState({ total: currentTotal - 1 });
  }

  // Injectamos el valor de la acción y recuperamos el valor pasado por parámetro.
  @Action(SetTotal)
  SetTotal(stateContext: StateContext<CounterStateModel>, action: SetTotal) {
    stateContext.patchState({ total: action.value });
  }
}
