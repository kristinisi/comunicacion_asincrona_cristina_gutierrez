import ManagerApp from "../js/managerApp.js";

window.addEventListener("popstate", (event) => {
  if (event.state) {
    historyActions[event.state.action](event);
  }
});

const historyActions = {
  init: () => {
    ManagerApp.handleInit();
  },
  dishesCategoryList: (event) =>
    ManagerApp.handleDishesCategoryList(event.state.category),
  dishesAllergenList: (event) =>
    ManagerApp.handleDishesAllergenList(event.state.allergen),
  dishesMenuList: (event) => ManagerApp.handleDishesMenuList(event.state.menu),
  restaurant: (event) => ManagerApp.handleRestaurant(event.state.restaurant),
  dish: (event) => ManagerApp.handleDish(event.state.name),
  newCategory: () => ManagerApp.handleNewCategoryForm(),
  removeCategory: () => ManagerApp.handleRemoveCategoryForm(),
  newDish: () => ManagerApp.handleNewDishForm(),
  removeDish: () => ManagerApp.handleRemoveDishForm(),
  removeDishByCategory: (event) => {
    ManagerApp.handleRemoveDishForm();
    ManagerApp.handleRemoveDishListByCategory(event.state.category);
  },
  removeDishByAllergen: (event) => {
    ManagerApp.handleRemoveDishForm();
    ManagerApp.handleRemoveDishListByAllergens(event.state.allergen);
  },
  newRestaurant: () => ManagerApp.handleNewRestaurantForm(),
  assignDish: () => ManagerApp.handleAssignDishForm(),
  desassignDish: () => ManagerApp.handleDesassignDishForm(),
  desassignDishByMenu: (event) => {
    ManagerApp.handleDesassignDishForm();
    ManagerApp.handleDesassignDishListByMenu(event.state.category);
  },
  changeDish: () => ManagerApp.handleChangeDishForm(),
  changeDishByMenu: (event) => {
    ManagerApp.handleChangeDishForm();
    ManagerApp.handleChangeDishListByMenu(event.state.category);
  },
  login: () => ManagerApp.handleLoginForm(),
};

history.replaceState({ action: "init" }, null);
