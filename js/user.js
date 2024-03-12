//creamos una nueva entidad para gestionar objetos de tipo usuario

import {
  BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException,
} from "./exceptions.js";

class User {
  // Campos privados
  #username;
  #preferences;

  constructor(username) {
    if (!new.target) throw new InvalidAccessConstructorException();

    if (!username) throw new EmptyValueException("username");
    this.#username = username;

    Object.defineProperty(this, "username", {
      enumerable: true,
      get() {
        return this.#username;
      },
    });

    Object.defineProperty(this, "preferences", {
      enumerable: true,
      get() {
        return this.#preferences;
      },
      set(value) {
        if (!value) throw new EmptyValueException("preferences");
        this.#preferences = value;
      },
    });
  }
}

export { User };
