//importamos la función getCookie
import { getCookie } from "./util.js";

const MODEL = Symbol("RestaurantsManager");
const VIEW = Symbol("ManagerView");

const AUTH = Symbol("AUTH");
const USER = Symbol("USER");

const LOAD_RESTAURANTS_MANAGER_OBJECTS = Symbol(
  "Load Restaurants Manager Objects"
);

class ManagerController {
  constructor(model, view, auth) {
    this[MODEL] = model;
    this[VIEW] = view;
    this[AUTH] = auth;
    this[USER] = null;

    //Invocamos el método onLoad para llamarlo cuando se cargue la página
    this.onLoad();

    //Invocamos el evento y asignamos el manejador al bind
    // this.onInit();
    // this[VIEW].bindInit(this.handleInit);
  }

  onLoad = () => {
    // this[LOAD_RESTAURANTS_MANAGER_OBJECTS]();
    fetch("../data/objects.json")
      .then((response) => response.json())
      .then((data) => {
        const categoriesArr = data.Categorias;
        for (const cat of categoriesArr) {
          const category = this[MODEL].createCategory(cat.name);
          category.image = cat.image;
          category.description = cat.description;
          this[MODEL].addCategory(category);
        }

        const allergensArr = data.Alergenos;
        for (const aller of allergensArr) {
          const allergen = this[MODEL].createAllergen(aller.name);
          allergen.description = aller.description;
          this[MODEL].addAllergen(allergen);
        }

        const menuArr = data.Menus;
        for (const m of menuArr) {
          const menu = this[MODEL].createMenu(m.name);
          menu.description = m.description;
          this[MODEL].addMenu(menu);
        }

        const restArr = data.Restaurantes;
        for (const rest of restArr) {
          const restaurant = this[MODEL].createRestaurant(rest.name);
          restaurant.description = rest.description;
          restaurant.image = rest.image;
          this[MODEL].addRestaurant(restaurant);
        }

        const dishArr = data.Platos;
        for (const di of dishArr) {
          const dish = this[MODEL].createDish(di.name);
          dish.description = di.description;
          dish.ingredients = di.ingredients;
          dish.image = di.image;
          this[MODEL].addDish(dish);

          const cat = this[MODEL].createCategory(di.category);
          if (cat) {
            this[MODEL].assignCategoryToDish(cat, dish);
          }

          for (const aller of di.allergen) {
            const allergen = this[MODEL].createAllergen(aller);
            if (allergen) {
              this[MODEL].assignAllergenToDish(allergen, dish);
            }
          }

          if (di.menu) {
            const me = this[MODEL].createMenu(di.menu);

            console.log(me);
            this[MODEL].assignDishToMenu(me, dish);
          }
        }
      })
      .then(() => {
        this.onAddCategory();
        this.onAddAllergen();
        this.onAddMenu();
        this.onAddRestaurant();
        this.onInit();
        this[VIEW].bindInit(this.handleInit);

        //lo debemos hacer una unica vez al comienzo de la aplicación
        if (getCookie("accetedCookieMessage") !== "true") {
          this[VIEW].showCookiesMessage();
        }

        const userCookie = getCookie("activeUser");
        if (userCookie) {
          const user = this[AUTH].getUser(userCookie);
          if (user) {
            this[USER] = user;
            this.onOpenSession();
          }
        } else {
          this.onCloseSession();
        }
      });
  };

  onInit = () => {
    //carga las categorías al iniciar la página principal
    this[VIEW].showCategories(this[MODEL].categories);
    const randoms = this[MODEL].getRandomDishes();
    this[VIEW].showRandomDishes(randoms);
    this[VIEW].bindDishesCategoryList(this.handleDishesCategoryList);
  };

  handleInit = () => {
    this.onInit();
  };

  onAddCategory = () => {
    this[VIEW].showCategoriesInMenu(this[MODEL].categories);
    this[VIEW].bindDishesCategoryListInMenu(this.handleDishesCategoryList);
  };

  onAddAllergen = () => {
    this[VIEW].showAllergensInMenu(this[MODEL].allergens);
    this[VIEW].bindDishesAlleregnListInMenu(this.handleDishesAllergenList);
  };

  onAddMenu = () => {
    this[VIEW].showMenuInMenu(this[MODEL].menus);
    this[VIEW].bindDishesMenuListInMenu(this.handleDishesMenuList);
  };

  onAddRestaurant = () => {
    this[VIEW].showRestaurantsInMenu(this[MODEL].restaurants);
    this[VIEW].bindRestaurantListInMenu(this.handleRestaurant);
    this[VIEW].showCloseInMenu();
    this[VIEW].bindCloseInMenu(this.handleClose);
  };

  onAddAdmin = () => {
    this[VIEW].showAdminMenu();
  };

  onOpenSession() {
    this.onInit();
    this[VIEW].initHistory();
    this[VIEW].showAuthUserProfile(this[USER]);
    this[VIEW].bindCloseSession(this.handleCloseSession);
    this.onAddAdmin();
    this[VIEW].bindAdminMenu(
      this.handleNewCategoryForm,
      this.handleRemoveCategoryForm,
      this.handleNewDishForm,
      this.handleRemoveDishForm,
      this.handleNewRestaurantForm,
      this.handleAssignDishForm,
      this.handleDesassignDishForm,
      this.handleChangeDishForm,
      this.generarBackup
    );
  }

  onCloseSession() {
    this[USER] = null;
    this[VIEW].deleteUserCookie();
    this[VIEW].showIdentificationLink();
    this[VIEW].bindIdentificationLink(this.handleLoginForm);
    this[VIEW].removeAdminMenu();
  }

  handleDishesCategoryList = (name) => {
    const category = this[MODEL].createCategory(name);
    this[VIEW].listDishes(
      this[MODEL].getDishesInCategroy(category),
      category.name,
      "Categorías"
    );
    this[VIEW].bindDishClick(this.handleDish);
  };

  handleDishesAllergenList = (name) => {
    const allergen = this[MODEL].createAllergen(name);
    this[VIEW].listDishes(
      this[MODEL].getDishesWithAllergen(allergen),
      allergen.name,
      "Alérgenos"
    );
    this[VIEW].bindDishClick(this.handleDish);
  };

  handleDishesMenuList = (name) => {
    const menu = this[MODEL].createMenu(name);
    this[VIEW].listDishes(
      this[MODEL].getDishesWithMenu(menu),
      menu.name,
      "Menús"
    );
    this[VIEW].bindDishClick(this.handleDish);
  };

  handleDish = (name) => {
    const dish = this[MODEL].createDish(name);
    this[VIEW].showDish(dish);
    this[VIEW].bindShowDishInNewWindow(this.handleShowDishInNewWindow);
  };

  handleRestaurant = (name) => {
    const rest = this[MODEL].createRestaurant(name);
    this[VIEW].showRestaurant(rest, name);
  };

  handleShowDishInNewWindow = (name, pag) => {
    const dish = this[MODEL].createDish(name);
    this[VIEW].showDishInNewWindow(dish, pag);
  };

  handleClose = (pag) => {
    pag.forEach((value) => {
      value.close();
    });
    pag.clear();
    this[VIEW].cont = 0;
  };

  handleNewCategoryForm = () => {
    this[VIEW].showNewCategoryForm();
    this[VIEW].bindNewCategoryForm(this.handleCreateCategory);
  };

  handleCreateCategory = (name, img, desc) => {
    const index = img.lastIndexOf("\\");
    img = img.substring(index + 1);
    const cat = this[MODEL].createCategory(name);
    cat.image = "./img/" + img;
    cat.description = desc;
    let done;
    let error;
    try {
      this[MODEL].addCategory(cat);
      done = true;
      this.onAddCategory();
    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].showNewCategoryModal(done, cat, error);
  };

  handleRemoveCategoryForm = () => {
    this[VIEW].showRemoveCategoryForm(this[MODEL].categories);
    this[VIEW].bindRemoveCategoryForm(this.handleRemoveCategory);
  };

  handleRemoveCategory = (name) => {
    let done;
    let error;
    let cat;
    try {
      cat = this[MODEL].createCategory(name);
      this[MODEL].removeCategory(cat);
      done = true;
      this.onAddCategory();
      this.handleRemoveCategoryForm();
    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].showRemoveCategoryModal(done, cat, error);
  };

  handleNewDishForm = () => {
    this[VIEW].showNewDishForm(this[MODEL].categories, this[MODEL].allergens);
    this[VIEW].bindNewDishForm(this.handleCreateDish);
  };

  handleCreateDish = (name, ingredients, img, desc, categories, allergens) => {
    let done;
    let error;
    let dish;

    try {
      const index = img.lastIndexOf("\\");
      img = img.substring(index + 1);
      dish = this[MODEL].createDish(name);
      dish.ingredients = ingredients;
      dish.image = "./img/" + img;
      dish.description = desc;
      categories.forEach((name) => {
        const category = this[MODEL].createCategory(name);
        this[MODEL].assignCategoryToDish(category, dish);
      });
      allergens.forEach((name) => {
        const allergen = this[MODEL].createAllergen(name);
        this[MODEL].assignAllergenToDish(allergen, dish);
      });
      done = true;
    } catch (exception) {
      done = false;
      error = exception;
    }

    this[VIEW].showNewDishModal(done, dish, error);
  };

  handleRemoveDishForm = () => {
    this[VIEW].showRemoveDishForm(
      this[MODEL].categories,
      this[MODEL].allergens
    );
    this[VIEW].bindRemoveDishSelects(
      //se enlazan los dos handlers
      this.handleRemoveDishListByCategory,
      this.handleRemoveDishListByAllergens
    );
  };

  handleRemoveDishListByCategory = (category) => {
    const cat = this[MODEL].createCategory(category);
    this[VIEW].showRemoveDishList(this[MODEL].getDishesInCategroy(cat));
    this[VIEW].bindRemoveDish(this.handleRemoveDish);
  };

  handleRemoveDishListByAllergens = (allergen) => {
    const aller = this[MODEL].createAllergen(allergen);
    this[VIEW].showRemoveDishList(this[MODEL].getDishesWithAllergen(aller));
    this[VIEW].bindRemoveDish(this.handleRemoveDish);
  };

  handleRemoveDish = (name) => {
    let done;
    let error;
    let dish;
    try {
      dish = this[MODEL].createDish(name);
      this[MODEL].removeDish(dish);
      done = true;
    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].showRemoveDishModal(done, dish, error);
  };

  handleNewRestaurantForm = () => {
    this[VIEW].showNewRestaurantForm();
    this[VIEW].bindNewRestaurantForm(this.handleCreateRestaurant);
  };

  handleCreateRestaurant = (name, img, desc) => {
    const index = img.lastIndexOf("\\");
    img = img.substring(index + 1);
    const res = this[MODEL].createRestaurant(name);
    res.image = "./img/" + img;
    res.description = desc;
    let done;
    let error;
    try {
      this[MODEL].addRestaurant(res);
      done = true;
      this.onAddRestaurant();
    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].showNewRestaurantModal(done, res, error);
  };

  handleAssignDishForm = () => {
    this[VIEW].showAssignDishForm(this[MODEL].dishes, this[MODEL].menus);
    this[VIEW].bindAssignDishForm(this.handleAssignDish);
  };

  handleAssignDish = (menu, dishes) => {
    let done;
    let error;
    let menu_obj;
    let dish_obj;

    try {
      menu_obj = this[MODEL].createMenu(menu);
      for (const dish of dishes) {
        dish_obj = this[MODEL].createDish(dish);
        this[MODEL].assignDishToMenu(menu_obj, dish_obj);
      }
      done = true;
    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].showAssignDishModal(done, menu_obj, error);
  };

  handleDesassignDishForm = () => {
    this[VIEW].showDesassignDishForm(this[MODEL].menus);
    console.log(this[MODEL].menus);

    this[VIEW].bindDesassignDishSelects(this.handleDesassignDishListByMenu);
  };

  handleDesassignDishListByMenu = (menu) => {
    const menu_obj = this[MODEL].createMenu(menu);
    this[VIEW].showDesassignDishList(
      this[MODEL].getDishesWithMenu(menu_obj),
      menu_obj
    );
    this[VIEW].bindDesassignDish(this.handleDesassignDish);
  };

  handleDesassignDish = (name, menu) => {
    let done;
    let error;
    let dish;
    let menu_obj;
    console.log(name);
    console.log(menu);
    try {
      dish = this[MODEL].createDish(name);
      console.log(dish);
      menu_obj = this[MODEL].createMenu(menu);
      console.log(menu_obj);
      this[MODEL].deassignDishToMenu(menu_obj, dish);
      done = true;
    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].showDesassignDishModal(done, dish, error);
  };

  handleChangeDishForm = () => {
    this[VIEW].showChangeDishForm(this[MODEL].menus);
    this[VIEW].bindChangeDishSelects(this.handleChangeDishListByMenu);
  };

  handleChangeDishListByMenu = (menu) => {
    const menu_obj = this[MODEL].createMenu(menu);
    this[VIEW].showChangeDishList(this[MODEL].getDishesWithMenu(menu_obj));
    this[VIEW].bindChangeDishForm(this.handleChangeDish);
  };

  handleChangeDish = (menu, dish1, dish2) => {
    let done;
    let error;
    let menu_obj;
    let dish1_obj;
    let dish2_obj;

    console.log(menu);
    console.log(dish1);
    console.log(dish2);

    try {
      menu_obj = this[MODEL].createMenu(menu);
      dish1_obj = this[MODEL].createDish(dish1);
      dish2_obj = this[MODEL].createDish(dish2);
      this[MODEL].changeDishesPositionsInMenu(menu_obj, dish1_obj, dish2_obj);
      done = true;
    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].showChangeDishModal(done, menu_obj, error);
  };

  handleLoginForm = () => {
    this[VIEW].showLogin();
    this[VIEW].bindLogin(this.handleLogin);
  };

  handleLogin = (username, password, remember) => {
    if (this[AUTH].validateUser(username, password)) {
      this[USER] = this[AUTH].getUser(username);
      this.onOpenSession();
      if (remember) {
        this[VIEW].setUserCookie(this[USER]);
      }
    } else {
      this[VIEW].showInvalidUserMessage();
    }
  };

  handleCloseSession = () => {
    this.onCloseSession();
    this.onInit();
    this[VIEW].initHistory();
  };

  //funcion que crea el backup de las colecciones de nuestras clases
  generarBackup = () => {
    //nos creamos el objeto data
    const data = {
      restaurants: [],
      categories: [],
      allergens: [],
      menus: [],
      dishes: [],
    };

    //recorremos los restaurantes de la app para introducirlos en el array del data
    for (const rest of this[MODEL].restaurants) {
      console.log(rest.restaurant.name);
      //metemos en el data.restaurant un objeto literal
      data.restaurants.push({
        name: rest.restaurant.name,
        image: rest.restaurant.image,
        description: rest.restaurant.description,
      });
    }

    //recorremos las categorias
    for (const cat of this[MODEL].categories) {
      data.categories.push({
        name: cat.category.name,
        image: cat.category.image,
        description: cat.category.description,
      });
      //metemos en el data.restaurant un objeto literal
    }

    //recorremos los alérgenos
    for (const aller of this[MODEL].allergens) {
      data.allergens.push({
        name: aller.allerge.name,
        description: aller.allerge.description,
      });
    }

    //recorremos los menús
    for (const menu of this[MODEL].menus) {
      data.menus.push({
        name: menu.menu.name,
        description: menu.menu.description,
      });
    }

    //recorremos los platos
    for (const dish of this[MODEL].dishes) {
      data.dishes.push({
        name: dish.name,
        description: dish.description,
        ingredients: dish.ingredients,
        image: dish.image,
      });
    }

    console.log(JSON.stringify(data)); //para ver por consola como sería el json
  };
}
export default ManagerController;
