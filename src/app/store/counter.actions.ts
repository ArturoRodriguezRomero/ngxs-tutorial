export class Increment {
  static readonly type = '[Counter] Increment';
  constructor() {}
}

export class Decrement {
  static readonly type = '[Counter] Decrement';
  constructor() {}
}

export class SetTotal {
  static readonly type = '[Counter] Set Total';
  constructor(public value: number) {}
}
