"use strict";
import {
  BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException,
} from "./exceptions.js";

import {
  Dish,
  Category,
  Allergen,
  Menu,
  Restaurant,
  Coordinate,
} from "./listadoObjetos.js";

//Declaramos las clases específicas como clases
class RestaurantsManagerException extends BaseException {
  constructor(
    message = "Error: RestaurantManager Generic Exception.",
    fileName,
    lineNumber
  ) {
    super(message, fileName, lineNumber);
    this.name = "RestaurantManager";
  }
}

class DishException extends RestaurantsManagerException {
  constructor(fileName, lineNumber) {
    super("Error: The method needs a Dish parameter.", fileName, lineNumber);
    this.name = "DishException";
  }
}

class CategoryException extends RestaurantsManagerException {
  constructor(fileName, lineNumber) {
    super(
      "Error: The method needs a Category parameter.",
      fileName,
      lineNumber
    );
    this.name = "CategoryException";
  }
}
class MenuException extends RestaurantsManagerException {
  constructor(fileName, lineNumber) {
    super("Error: The method needs a Menu parameter.", fileName, lineNumber);
    this.name = "MenuException";
  }
}

class AllergenException extends RestaurantsManagerException {
  constructor(fileName, lineNumber) {
    super(
      "Error: The method needs a Allergen parameter.",
      fileName,
      lineNumber
    );
    this.name = "AllergenException";
  }
}

class RestaurantException extends RestaurantsManagerException {
  constructor(fileName, lineNumber) {
    super(
      "Error: The method needs a Restaurant parameter.",
      fileName,
      lineNumber
    );
    this.name = "RestaurantException";
  }
}

class CategoryInTheListException extends RestaurantsManagerException {
  constructor(fileName, lineNumber) {
    super("Error: Category is already in the list.", fileName, lineNumber);
    this.name = "CategoryInTheListException";
  }
}

class CategoryNotExistsInTheListException extends RestaurantsManagerException {
  constructor(fileName, lineNumber) {
    super(
      "Error: The category doesn't exist in the list.",
      fileName,
      lineNumber
    );
    this.name = "CategoryNotExistsInTheListException";
  }
}

class MenuInTheListException extends RestaurantsManagerException {
  constructor(fileName, lineNumber) {
    super("Error: Menu is already in the list.", fileName, lineNumber);
    this.name = "MenuInTheListException";
  }
}

class MenuNotExistsInTheListException extends RestaurantsManagerException {
  constructor(fileName, lineNumber) {
    super("Error: The menu doesn't exist in the list.", fileName, lineNumber);
    this.name = "MenuNotExistsInTheListException";
  }
}

class AllergenInTheListException extends RestaurantsManagerException {
  constructor(fileName, lineNumber) {
    super("Error: Allergen is already in the list.", fileName, lineNumber);
    this.name = "AllergenInTheListException";
  }
}

class AllergenNotExistsInTheListException extends RestaurantsManagerException {
  constructor(fileName, lineNumber) {
    super(
      "Error: The allergen doesn't exist in the list.",
      fileName,
      lineNumber
    );
    this.name = "AllergenNotExistsInTheListException";
  }
}

class DishInTheListException extends RestaurantsManagerException {
  constructor(fileName, lineNumber) {
    super("Error: Dish is already in the list.", fileName, lineNumber);
    this.name = "DishInTheListException";
  }
}

class DishNotExistsInTheListException extends RestaurantsManagerException {
  constructor(fileName, lineNumber) {
    super("Error: The dish doesn't exist in the list.", fileName, lineNumber);
    this.name = "DishNotExistsInTheListException";
  }
}

class RestaurantInTheListException extends RestaurantsManagerException {
  constructor(fileName, lineNumber) {
    super("Error: Restaurant is already in the list.", fileName, lineNumber);
    this.name = "RestaurantInTheListException";
  }
}

class RestaurantNotExistsInTheListException extends RestaurantsManagerException {
  constructor(fileName, lineNumber) {
    super(
      "Error: The restaurant doesn't exist in the list.",
      fileName,
      lineNumber
    );
    this.name = "RestaurantNotExistsInTheListException";
  }
}

//Patrón Singleton
let RestaurantsManager = (function () {
  let instanciated;

  //Dentro de la función anónima declaramos la clase RestaurantsManager
  class RestaurantsManager {
    //Definimos los atributos privados del objeto
    #systemName = "Undefined";
    #dishesCategory = [];
    #allergenType = [];
    #menus = [];
    #restaurants = [];
    #dishes = [];

    //Declaración de métodos privados
    //Dado una categoría, devuelve la posición de esa categoría o -1 si no lo encontramos
    #getCategoryPosition(obj) {
      return this.#dishesCategory.findIndex(
        (busqueda) => busqueda.category.name === obj.category.name
      );
    }

    //Dado un Menu, devuelve la posición de ese menú o -1 si no lo encontramos
    #getMenuPosition(obj) {
      return this.#menus.findIndex(
        (busqueda) => busqueda.menu.name === obj.menu.name
      );
    }

    //Dado una alergia, devuelve la posición de esa alergoa o -1 so no lo encontramos
    #getAllergenPosition(obj) {
      return this.#allergenType.findIndex(
        (busqueda) => busqueda.allerge.name === obj.allerge.name
      );
    }

    //Dado un plato, devuelve la posición de esa plato o -1 so no lo encontramos
    #getDishPosition(obj) {
      return this.#dishes.findIndex((busqueda) => busqueda.name === obj.name);
    }

    //Dado un restaurante, devuelve la posición de ese restaurante o -1 so no lo encontramos
    #getRestaurantPosition(obj) {
      return this.#restaurants.findIndex(
        (busqueda) => busqueda.restaurant === obj.restaurant
      );
    }

    constructor() {
      //La función se invoca con el operador new
      if (!new.target) throw new InvalidAccessConstructorException();

      Object.defineProperty(this, "systemName", {
        enumerable: true,
        get() {
          return this.#systemName;
        },
        set(value) {
          if (!value) throw new EmptyValueException();
          if (typeof value !== "string")
            throw new InvalidValueException("systemName", value);
          this.#systemName = value;
        },
      });

      Object.defineProperty(this, "dishes", {
        enumerable: true,
        get() {
          return this.#dishes;
        },
      });
    }

    //Definimos los métodos
    //Devuelve un iterador que permite recorrer las categorías del sistema
    get categories() {
      const categories = this.#dishesCategory;
      return {
        *[Symbol.iterator]() {
          for (const category of categories) {
            yield category;
          }
        },
      };
    }

    //Devuelve un iterador que permite recorrer los menus del sistema
    get menus() {
      const menuIte = this.#menus;
      return {
        *[Symbol.iterator]() {
          for (const menu of menuIte) {
            yield menu;
          }
        },
      };
    }

    //Devuelve un iterador que permite recorrer los alérgenos del sistema
    get allergens() {
      const allergens = this.#allergenType;
      return {
        *[Symbol.iterator]() {
          for (const allergen of allergens) {
            yield allergen;
          }
        },
      };
    }

    //Devuelve un iterador que permite recorrer los restaurantes del sistema
    get restaurants() {
      const rest = this.#restaurants;
      return {
        *[Symbol.iterator]() {
          for (const r of rest) {
            yield r;
          }
        },
      };
    }

    //Añade una nueva categoría
    addCategory(...categories) {
      for (const cat of categories) {
        if (!(cat instanceof Category)) {
          throw new CategoryException();
        }
        if (cat === null) {
          throw new EmptyValueException();
        }
        let obj = { category: cat, dishes: [] };
        if (this.#getCategoryPosition(obj) !== -1) {
          throw new CategoryInTheListException();
        } else {
          this.#dishesCategory.push(obj);
        }
      }
    }

    //Elimina una categoría. Los platos quedarán desasignados de la categoria
    removeCategory(...categories) {
      for (const cat of categories) {
        if (!(cat instanceof Category)) {
          throw new CategoryException();
        }
        let obj = { category: cat, dishes: [] };
        let position = this.#getCategoryPosition(obj);
        if (position !== -1) {
          this.#dishesCategory.splice(position, 1);
        } else {
          throw new CategoryNotExistsInTheListException();
        }
      }
    }

    //Añade un nuevo menú
    addMenu(...menus) {
      for (const m of menus) {
        if (!(m instanceof Menu)) {
          throw new MenuException();
        }
        if (m === null) {
          throw new EmptyValueException();
        }
        let obj = { menu: m, dishes: [] };
        if (this.#getMenuPosition(obj) !== -1) {
          throw new MenuInTheListException();
        } else {
          this.#menus.push(obj);
        }
      }
    }

    //Elimina un menu
    removeMenu(...menus) {
      for (const m of menus) {
        if (!(m instanceof Menu)) {
          throw new MenuException();
        }
        let obj = { menu: m, dishes: [] };
        let position = this.#getMenuPosition(obj);
        if (position !== -1) {
          this.#menus.splice(position, 1);
        } else {
          throw new MenuNotExistsInTheListException();
        }
      }
    }

    //Añade un nuevo alérgeno
    addAllergen(...allergens) {
      for (const aller of allergens) {
        if (!(aller instanceof Allergen)) {
          throw new AllergenException();
        }
        if (aller === null) {
          throw new EmptyValueException();
        }
        let obj = { allerge: aller, dishes: [] };
        if (this.#getAllergenPosition(obj) !== -1) {
          throw new AllergenInTheListException();
        } else {
          this.#allergenType.push(obj);
        }
      }
    }

    //Elimina un alérgeno
    removeAllergen(...allergens) {
      for (const aller of allergens) {
        if (!(aller instanceof Allergen)) {
          throw new AllergenException();
        }
        let obj = { allerge: aller, dishes: [] };
        let position = this.#getAllergenPosition(obj);
        if (position !== -1) {
          this.#allergenType.splice(position, 1);
        } else {
          throw new AllergenNotExistsInTheListException();
        }
      }
    }

    //Añade un nuevo plato
    addDish(...dishes) {
      for (const di of dishes) {
        if (!(di instanceof Dish)) {
          throw new DishException();
        }
        if (di === null) {
          throw new EmptyValueException();
        }
        if (this.#getDishPosition(di) !== -1) {
          throw new DishInTheListException();
        } else {
          this.#dishes.push(di);
        }
      }
    }

    //Elimina un plato y todas sus asignaciones a categorias, alergenos y menus
    removeDish(...dishes) {
      for (const di of dishes) {
        if (!(di instanceof Dish)) {
          throw new DishException();
        }
        //primero, buscamos si el plato existe en el array dishes y si lo encuentra lo eliminamos
        let position = this.#getDishPosition(di);
        if (position !== -1) {
          this.#dishes.splice(position, 1);

          //segundo, buscamos si el plato está en alguna de las categorias(ya que puede estar en varias) y si los encuentra los borra
          for (const objCat of this.#dishesCategory) {
            let categoryPosition = this.#getCategoryPosition(objCat);
            let objCategory = this.#dishesCategory[categoryPosition];
            let dishIndex = objCategory.dishes.findIndex(
              (busqueda) => busqueda.name === di.name
            );
            if (dishIndex !== -1) {
              this.#dishesCategory[categoryPosition].dishes.splice(
                dishIndex,
                1
              );
            }
          }

          //tercero, buscamos si el plato está en algún alérgeno
          for (const objAller of this.#allergenType) {
            let allergenPosition = this.#getAllergenPosition(objAller);
            let objAll = this.#allergenType[allergenPosition];
            let dishIndex = objAll.dishes.findIndex(
              (busqueda) => busqueda.name === di.name
            );
            if (dishIndex !== -1) {
              this.#allergenType[allergenPosition].dishes.splice(dishIndex, 1);
            }
          }

          //cuarto, buscamos si el plato está en algún menu
          for (const objMenu of this.#menus) {
            let menuPosition = this.#getMenuPosition(objMenu);
            let objM = this.#menus[menuPosition];
            let dishIndex = objM.dishes.findIndex(
              (busqueda) => busqueda.name === di.name
            );
            if (dishIndex !== -1) {
              this.#menus[menuPosition].dishes.splice(dishIndex, 1);
            }
          }
        } else {
          throw new DishNotExistsInTheListException();
        }
      }
    }

    //Añade un nuevo restaurante
    addRestaurant(...restaurants) {
      for (const rest of restaurants) {
        if (!(rest instanceof Restaurant)) {
          throw new RestaurantException();
        }
        if (rest === null) {
          throw new EmptyValueException();
        }
        let obj = { restaurant: rest };
        if (this.#getRestaurantPosition(obj) !== -1) {
          throw new RestaurantInTheListException();
        } else {
          this.#restaurants.push(obj);
        }
      }
    }

    //Elimina un restaurante
    removeRestaurant(...restaurants) {
      for (const rest of restaurants) {
        if (!(rest instanceof Restaurant)) {
          throw new RestaurantException();
        }
        let obj = { restaurant: rest };
        let position = this.#getRestaurantPosition(obj);
        if (position !== -1) {
          this.#restaurants.splice(position, 1);
        } else {
          throw new RestaurantNotExistsInTheListException();
        }
      }
    }

    //Asigna un plato a una categoría. Si el objeto category o dish no existen se añaden al sistema
    assignCategoryToDish(cat, ...dishes) {
      //primero nos aseguramos que introducimos un tipo de categoria
      if (!(cat instanceof Category)) {
        throw new CategoryException();
      }
      if (cat === null) {
        throw new EmptyValueException();
      }

      //segundo tenemos que encontrar la categoria
      let obj = { category: cat };
      let categoryPosition = this.#getCategoryPosition(obj);
      if (categoryPosition !== -1) {
        //Buscar la posición del plato en la categoria
        //vamos pasando por cada plato
        for (let di of dishes) {
          if (!(di instanceof Dish)) {
            throw new DishException();
          }
          if (di === null) {
            throw new EmptyValueException();
          }

          //comprobamos si el plato existe en nuestra colección de platos, y si no existe lo añadimos
          if (this.#getDishPosition(di) === -1) {
            this.addDish(di);
          }

          let objCategory = this.#dishesCategory[categoryPosition];
          let dishIndex = objCategory.dishes.findIndex(
            (busqueda) => busqueda.name === di.name
          );
          if (dishIndex !== -1) {
            throw new DishInTheListException();
          } else {
            this.#dishesCategory[categoryPosition].dishes.push(di);
          }
        }
      } else {
        //si la categoría no existe se crea
        this.addCategory(cat);
        //como ya vamos a tener esa categoría, para no repetir el código volvemos a llamar al método
        //para que añada los plato ya que hemos creado la caegoría
        this.assignCategoryToDish(cat, ...dishes);
      }
    }

    //Desasigna un plato de una categoria
    deassignCategoryToDish(cat, ...dishes) {
      //primero nos aseguramos que introducimos un tipo de categoria
      if (!(cat instanceof Category)) {
        throw new CategoryException();
      }
      if (cat === null) {
        throw new EmptyValueException();
      }

      //segundo tenemos que encontrar la categoria
      let obj = { category: cat };
      let categoryPosition = this.#getCategoryPosition(obj);
      if (categoryPosition !== -1) {
        //Buscar la posición del plato en la categoria
        //vamos pasando por cada plato
        for (let di of dishes) {
          if (!(di instanceof Dish)) {
            throw new DishException();
          }
          if (di === null) {
            throw new EmptyValueException();
          }

          let objCategory = this.#dishesCategory[categoryPosition];
          let dishIndex = objCategory.dishes.findIndex(
            (busqueda) => busqueda.name === di.name
          );
          if (dishIndex === -1) {
            throw new DishNotExistsInTheListException();
          } else {
            this.#dishesCategory[categoryPosition].dishes.splice(dishIndex, 1);
          }
        }
      }
    }

    //Asigna un plato a un alérgeno. Si algún plato no existe se añade al sistema.
    assignAllergenToDish(aller, ...dishes) {
      //primero nos aseguramos que introducimos un tipo de alergeno
      if (!(aller instanceof Allergen)) {
        throw new AllergenException();
      }
      if (aller === null) {
        throw new EmptyValueException();
      }

      //segundo tenemos que encontrar el alérgeno
      let obj = { allerge: aller };
      let allergenPosition = this.#getAllergenPosition(obj);
      if (allergenPosition !== -1) {
        //Buscar la posición del plato en el alergeno
        //vamos pasando por cada plato
        for (let di of dishes) {
          if (!(di instanceof Dish)) {
            throw new DishException();
          }
          if (di === null) {
            throw new EmptyValueException();
          }

          //comprobamos si el plato existe en nuestra colección de platos, y si no existe lo añadimos
          if (this.#getDishPosition(di) === -1) {
            this.addDish(di);
          }

          let objAllergen = this.#allergenType[allergenPosition];
          let dishIndex = objAllergen.dishes.findIndex(
            (busqueda) => busqueda.name === di.name
          );
          if (dishIndex !== -1) {
            throw new DishInTheListException();
          } else {
            this.#allergenType[allergenPosition].dishes.push(di);
          }
        }
      } else {
        //si el alérgeno no existe se crea
        this.addAllergen(aller);
        //llamamos al propio método para añadir los platos
        this.assignAllergenToDish(aller, ...dishes);
      }
    }

    //Desasigna un plato de un alérgeno
    deassignAllergenToDish(aller, ...dishes) {
      //primero nos aseguramos que introducimos un tipo de alérgeno
      if (!(aller instanceof Allergen)) {
        throw new AllergenException();
      }
      if (aller === null) {
        throw new EmptyValueException();
      }

      //segundo tenemos que encontrar el alérgeno
      let obj = { allerge: aller };
      let allergePosition = this.#getAllergenPosition(obj);
      if (allergePosition !== -1) {
        //Buscar la posición del plato en el alérgeno
        //vamos pasando por cada plato
        for (let di of dishes) {
          if (!(di instanceof Dish)) {
            throw new DishException();
          }
          if (di === null) {
            throw new EmptyValueException();
          }

          let objAllerge = this.#allergenType[allergePosition];
          let dishIndex = objAllerge.dishes.findIndex(
            (busqueda) => busqueda.name === di.name
          );
          if (dishIndex === -1) {
            throw new DishNotExistsInTheListException();
          } else {
            this.#allergenType[allergePosition].dishes.splice(dishIndex, 1);
          }
        }
      }
    }

    //Asigna un plato a un alérgeno. Si algún plato no existe se añade al sistema.
    assignDishToMenu(menu, ...dishes) {
      //primero nos aseguramos que introducimos un tipo de menu
      if (!(menu instanceof Menu)) {
        throw new MenuException();
      }
      if (menu === null) {
        throw new EmptyValueException();
      }

      //segundo tenemos que encontrar el menu
      let obj = { menu: menu };
      let menuPosition = this.#getMenuPosition(obj);
      if (menuPosition !== -1) {
        //Buscar la posición del plato en el alergeno
        //vamos pasando por cada plato
        for (let di of dishes) {
          if (!(di instanceof Dish)) {
            throw new DishException();
          }
          if (di === null) {
            throw new EmptyValueException();
          }

          //comprobamos si el plato existe en nuestra colección de platos, y si no existe lo añadimos
          if (this.#getDishPosition(di) === -1) {
            this.addDish(di);
          }

          let objMenu = this.#menus[menuPosition];
          let dishIndex = objMenu.dishes.findIndex(
            (busqueda) => busqueda.name === di.name
          );
          if (dishIndex !== -1) {
            throw new DishInTheListException();
          } else {
            this.#menus[menuPosition].dishes.push(di);
          }
        }
      } else {
        //si el menu no existe se crea
        this.addMenu(menu);
        //llamamos al propio método para añadir los platos
        this.assignDishToMenu(menu, ...dishes);
      }
    }

    //Desasigna un plato de un menú
    deassignDishToMenu(menu, ...dishes) {
      //primero nos aseguramos que introducimos un tipo de menu
      if (!(menu instanceof Menu)) {
        throw new MenuException();
      }
      if (menu === null) {
        throw new EmptyValueException();
      }

      //segundo tenemos que encontrar el menu
      let obj = { menu: menu };
      let menuPosition = this.#getMenuPosition(obj);
      if (menuPosition !== -1) {
        //Buscar la posición del plato en el menu
        //vamos pasando por cada plato
        for (let di of dishes) {
          if (!(di instanceof Dish)) {
            throw new DishException();
          }
          if (di === null) {
            throw new EmptyValueException();
          }

          let objMenu = this.#menus[menuPosition];
          let dishIndex = objMenu.dishes.findIndex(
            (busqueda) => busqueda.name === di.name
          );
          if (dishIndex === -1) {
            throw new DishNotExistsInTheListException();
          } else {
            this.#menus[menuPosition].dishes.splice(dishIndex, 1);
          }
        }
      }
    }

    //Intercambia las posiciones de dos platos en un menu
    changeDishesPositionsInMenu(menu, dish1, dish2) {
      //primero nos aseguramos que introducimos un tipo de menu
      if (!(menu instanceof Menu)) {
        throw new MenuException();
      }
      if (menu === null) {
        throw new EmptyValueException();
      }

      //segundo tenemos que encontrar el menu
      let obj = { menu: menu };
      let menuPosition = this.#getMenuPosition(obj);
      if (menuPosition !== -1) {
        //nos aseguramos de que los platos sean platos
        if (!((dish1 && dish2) instanceof Dish)) {
          throw new DishException();
        }
        if ((dish1 && dish2) === null) {
          throw new EmptyValueException();
        }

        //sacamos la posición del plato1 y plato2 y comprobamos si existen
        let objMenu = this.#menus[menuPosition];
        let dish1Index = objMenu.dishes.findIndex(
          (busqueda) => busqueda.name === dish1.name
        );
        let dish2Index = objMenu.dishes.findIndex(
          (busqueda) => busqueda.name === dish2.name
        );
        if ((dish1Index || dish2Index) === -1) {
          throw new DishNotExistsInTheListException();
        }

        /*//Nos creamos un auxiliar para guardar el primer plato
        let aux = objMenu.dishes[dish1Index];
        //en la primeroa posición se guarda el segundo plato
        objMenu.dishes[dish1Index] = objMenu.dishes[dish2Index];
        //metemos en el segundo plato el plato auxiliar
        objMenu.dishes[dish2Index] = aux; */

        //tambien se pueden cambiar sin usar una auxiliar
        [objMenu.dishes[dish1Index], objMenu.dishes[dish2Index]] = [
          objMenu.dishes[dish2Index],
          objMenu.dishes[dish1Index],
        ];
      } else {
        throw new MenuNotExistsInTheListException();
      }
    }

    //Obtiene un iterador con la relación de los platos a una categoría. El iterador puede estar ordenado
    //como el iterador puede estar ordenado o no, le ponemos en un principio null
    *getDishesInCategroy(cat, comparison = null) {
      //primero nos aseguramos que introducimos un tipo de categoria
      if (!(cat instanceof Category)) {
        throw new CategoryException();
      }
      if (cat === null) {
        throw new EmptyValueException();
      }

      //segundo tenemos que encontrar la categoria
      let obj = { category: cat };
      let categoryPosition = this.#getCategoryPosition(obj);
      if (categoryPosition !== -1) {
        //sacamos el objeto de la categoria con el que queremos trabajar
        let objCategory = this.#dishesCategory[categoryPosition];
        //nos creamos un array para ir guardando los platos
        let dishesArray = [];
        for (let di of objCategory.dishes) {
          dishesArray.push(di);
        }
        //ahora que ya tenemos todos los platos en un array, ordenamos el array en caso de que nos haya llegado la funcion
        if (comparison) {
          dishesArray.sort(comparison);
        }
        //devolvemos los platos
        for (let dish of dishesArray) {
          yield dish;
        }
      } else {
        throw new CategoryNotExistsInTheListException();
      }
    }

    //Obtiene un iterador con los platos que tiene un determinado alergeno. El iterador puede estar ordenado
    *getDishesWithAllergen(aller, comparison = null) {
      //primero nos aseguramos que introducimos un tipo de categoria
      if (!(aller instanceof Allergen)) {
        throw new AllergenException();
      }
      if (aller === null) {
        throw new EmptyValueException();
      }

      //segundo tenemos que encontrar el alergeno
      let obj = { allerge: aller };
      let allergenPosition = this.#getAllergenPosition(obj);
      if (allergenPosition !== -1) {
        //sacamos el objeto del alergeno con el que queremos trabajar
        let objAllergen = this.#allergenType[allergenPosition];
        //nos creamos un array para ir guardando los platos
        let dishesArray = [];
        for (let di of objAllergen.dishes) {
          dishesArray.push(di);
        }
        //ahora que ya tenemos todos los platos en un array, ordenamos el array en caso de que nos haya llegado la funcion
        if (comparison) {
          dishesArray.sort(comparison);
        }
        //devolvemos los platos
        for (let dish of dishesArray) {
          yield dish;
        }
      } else {
        throw new AllergenNotExistsInTheListException();
      }
    }

    //obtiene un iterador con los platos que tiene un determinado menú. El iterador puede estar ordenado
    *getDishesWithMenu(menu, comparison = null) {
      //primero nos aseguramos que introducimos un tipo de menu
      if (!(menu instanceof Menu)) {
        throw new MenuException();
      }
      if (menu === null) {
        throw new EmptyValueException();
      }

      //segundo tenemos que encontrar el alergeno
      let obj = { menu: menu };
      let menuPosition = this.#getMenuPosition(obj);
      if (menuPosition !== -1) {
        //sacamos el objeto del menu con el que queremos trabajar
        let objMenu = this.#menus[menuPosition];
        //nos creamos un array para ir guardando los platos
        let dishesArray = [];
        for (let di of objMenu.dishes) {
          dishesArray.push(di);
        }
        //ahora que ya tenemos todos los platos en un array, ordenamos el array en caso de que nos haya llegado la funcion
        if (comparison) {
          dishesArray.sort(comparison);
        }
        //devolvemos los platos
        for (let dish of dishesArray) {
          yield dish;
        }
      } else {
        throw new MenuNotExistsInTheListException();
      }
    }

    //Obtiene un iterador que cumpla un criterio concreto en base a una función de callback. El iterador puede estar ordenado.
    *findDishes(fil = null, comparison = null) {
      //nos creamos una copia de array de platos
      let dishesArray = this.#dishes.slice();

      if (fil) {
        dishesArray = dishesArray.filter(fil); //devuelve los platos que tiene concuerda con la función pasada por parámetro
      }
      if (comparison) {
        //si existe la función, ordenamos le array
        dishesArray.sort(comparison);
      }
      //devolvemos los platos
      for (let dish of dishesArray) {
        yield dish;
      }
    }

    //devuelve un objeto Dish si está registrado y si no, crea uno nuevo
    createDish(name = "undefined") {
      let dish;
      //hacemos una búsqueda para ver si encontramos el plato o no
      let dishPosition = this.#dishes.findIndex(
        (busqueda) => busqueda.name === name
      );
      if (dishPosition !== -1) {
        //hemos encontrado el plato asique lo devolvemos luego
        dish = this.#dishes[dishPosition];
      } else {
        //si no lo encuentra lo crea
        dish = new Dish(name);
      }
      return dish;
    }

    //devuelve un objeto Menu si está registrado y si no, crea uno nuevo
    createMenu(name = "undefined") {
      let menu;
      //hacemos una búsqueda para ver si encontramos el menu o no
      let menuPosition = this.#menus.findIndex(
        (busqueda) => busqueda.name === name
      );
      if (menuPosition !== -1) {
        //hemos encontrado el plato asique lo devolvemos luego
        menu = this.#menus[menuPosition];
      } else {
        //si no lo encuentra lo crea
        menu = new Menu(name);
      }
      return menu;
    }

    //devuelve un objeto Menu si está registrado y si no, crea uno nuevo
    createAllergen(name = "undefined") {
      let allergen;
      //hacemos una búsqueda para ver si encontramos el alergeno o no
      let allergenPosition = this.#allergenType.findIndex(
        (busqueda) => busqueda.name === name
      );
      if (allergenPosition !== -1) {
        //hemos encontrado el plato asique lo devolvemos luego
        allergen = this.#allergenType[allergenPosition];
      } else {
        //si no lo encuentra lo crea
        allergen = new Allergen(name);
      }
      return allergen;
    }

    //devuelve un objeto Category si está registrado y si no, crea uno nuevo
    createCategory(name = "undefined") {
      let category;
      //hacemos una búsqueda para ver si encontramos el alergeno o no
      let categoryPosition = this.#dishesCategory.findIndex(
        (busqueda) => busqueda.name === name
      );
      if (categoryPosition !== -1) {
        //hemos encontrado el plato asique lo devolvemos luego
        category = this.#dishesCategory[categoryPosition];
      } else {
        //si no lo encuentra lo crea
        category = new Category(name);
      }
      return category;
    }

    //devuelve un objeto Restaurant si está registrado y si no, crea uno nuevo
    createRestaurant(name = "undefined") {
      let restaurant;
      //hacemos una búsqueda para ver si encontramos el alergeno o no
      let restaurantPosition = this.#restaurants.findIndex(
        (busqueda) => busqueda.restaurant.name === name
      );
      if (restaurantPosition !== -1) {
        //hemos encontrado el plato asique lo devolvemos luego
        restaurant = this.#restaurants[restaurantPosition];
      } else {
        //si no lo encuentra lo crea
        restaurant = new Restaurant(name);
      }
      return restaurant;
    }

    //devuelve 3 platos aleatorios del array platos
    getRandomDishes() {
      const randoms = [];
      const arrSize = this.#dishes.length;

      while (randoms.length < 3) {
        const index = Math.floor(Math.random() * arrSize);
        if (!randoms.includes(this.#dishes[index])) {
          randoms.push(this.#dishes[index]);
        }
      }

      return randoms;
    }
  }

  //Inicialización del Singleton
  function init() {
    let rm = new RestaurantsManager();
    Object.freeze(rm);
    return rm;
  }
  return {
    //Devuelve un objeto con el método getInstance
    getInstance: function () {
      //Si la variable instanciated es undefined, primera ejecución, ejecuta init.
      if (!instanciated) {
        //instanciated contiene el objeto único
        instanciated = init();
      }
      //Si ya está asignado, devuelve la asignación
      return instanciated;
    },
  };
})();

export {
  BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException,
  Dish,
  Category,
  Allergen,
  Menu,
  Restaurant,
  Coordinate,
  RestaurantsManagerException,
  DishException,
  CategoryException,
  MenuException,
  AllergenException,
  RestaurantException,
  CategoryInTheListException,
  CategoryNotExistsInTheListException,
  MenuInTheListException,
  MenuNotExistsInTheListException,
  AllergenInTheListException,
  AllergenNotExistsInTheListException,
  DishInTheListException,
  DishNotExistsInTheListException,
  RestaurantInTheListException,
  RestaurantNotExistsInTheListException,
};

export default RestaurantsManager;
