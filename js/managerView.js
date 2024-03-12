import {
  newCategoryValidation,
  newDishValidation,
  newRestaurantValidation,
  AssignDishValidation,
  ChangeDishValidation,
} from "../js/validation.js";

//la vista de la cokkie se puede modificar si importamos la función setCookie
import { setCookie } from "./util.js";

const EXCECUTE_HANDLER = Symbol("excecuteHandler");

class ManagerView {
  constructor() {
    this.main = document.getElementById("main");
    this.categories = document.getElementById("categories");
    this.menu = document.querySelector(".barra__style");
    this.dishWindow = new Map();
    this.cont = 0;
  }

  [EXCECUTE_HANDLER](
    handler,
    handlerArguments,
    scrollElement,
    data,
    url,
    event
  ) {
    handler(...handlerArguments);
    const scroll = document.querySelector(scrollElement);
    if (scroll) scroll.scrollIntoView();
    history.pushState(data, null, url);
    event.preventDefault();
  }

  //Creación de shows

  showCategories(categories) {
    this.categories.replaceChildren();
    const container = document.createElement("section");
    container.id = "section-div";
    container.classList.add("row");
    for (const category of categories) {
      this.categories.insertAdjacentHTML(
        "beforeend",
        `<div>
            <a class='categories__enlace' href="#category-list" data-category=${category.category.name}>
            <img src=${category.category.image} alt=${category.category.name}>
              <h4>${category.category.name}</h4>
              
            </a>
          </div>`
      );
    }

    this.categories.appendChild(container);
  }
  showRandomDishes(dishes) {
    this.main.replaceChildren();
    const container = document.createElement("section");
    container.id = "random-dishes";
    container.insertAdjacentHTML(
      "beforeend",
      `
        <div class="miniSeparador"></div>
        <h3 class="tit">Algunos de nuestros platos...</h3>
      `
    );

    for (const dish of dishes) {
      const div = document.createElement("div");
      div.insertAdjacentHTML(
        "beforeend",
        `
        <div class="plato plato2">
              <img src="${dish.image}">
        </div>`
      );
      container.append(div);
    }
    this.main.appendChild(container);
  }

  showCategoriesInMenu(categories) {
    const navCats = document.getElementById("navCats");
    const container = navCats.nextElementSibling;
    container.replaceChildren();
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-category="${category.category.name}" class="dropdown-item" href="#productlist">${category.category.name}</a></li>`
      );
    }
  }

  showAllergensInMenu(allergens) {
    const li = document.createElement("li");
    li.classList.add("nav-item", "dropdown");
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link dropdown-toggle" href="#" id="navAller" role="button"     data-bs-toggle="dropdown" aria-expanded="false">Alérgenos</a>`
    );
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");
    container.id = "np-Allergens";
    for (const allergen of allergens) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-allergen="${allergen.allerge.name}" class="dropdown-item" href="#productlist">${allergen.allerge.name}</a></li>`
      );
    }
    li.append(container);
    this.menu.append(li);
  }

  showMenuInMenu(menus) {
    const li = document.createElement("li");
    li.classList.add("nav-item", "dropdown");
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link dropdown-toggle" href="#" id="navMenu" role="button"     data-bs-toggle="dropdown" aria-expanded="false">Menús</a>`
    );
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");
    for (const menu of menus) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-menu="${menu.menu.name}" class="dropdown-item" href="#productlist">${menu.menu.name}</a></li>`
      );
    }
    li.append(container);
    this.menu.append(li);
  }

  showRestaurantsInMenu(restaurants) {
    const navRest = document.getElementById("navRest");
    const container = navRest.nextElementSibling;
    container.replaceChildren();
    for (const restaurant of restaurants) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-restaurant="${restaurant.restaurant.name}" class="dropdown-item" href="#productlist">${restaurant.restaurant.name}</a></li>`
      );
    }
  }

  listDishes(dishes, name, pageTitle) {
    this.categories.replaceChildren();
    this.main.replaceChildren();
    this.main.classList.add("cambiar--fondo");

    const nav = document.createElement("nav");
    nav.id = "migas";
    nav.ariaLabel = "breadcrumbs";
    nav.insertAdjacentHTML(
      "beforeend",
      `
      <ol class="breadcrumb">
       <li class="breadcrumb-item">Inicio</li>
       <li class="breadcrumb-item">${pageTitle}</li>
       <li class="breadcrumb-item active">${name}</li>
      </ol>
      `
    );

    const container = document.createElement("div");
    container.id = "dishes-list";
    container.insertAdjacentHTML(
      "beforeend",
      '<section class="row seccion__plato"></section>'
    );

    for (const dish of dishes) {
      const div = document.createElement("div");
      div.insertAdjacentHTML(
        "beforeend",
        `
        <div class="miniSeparador"></div>
        <div class="plato">
              <a class='imagen' data-name='${dish.name}'>
                <img src="${dish.image}" style="cursor: pointer">
              </a>
              <h4>${dish.name}</h4>
              <p>${dish.description}</p>
          </div>`
      );
      container.children[0].append(div);
    }
    this.main.append(nav);
    container.insertAdjacentHTML("afterbegin", `<h1>${name}</h1>`);
    this.main.append(container);
  }

  showDish(dish) {
    const nav = document.querySelector(".breadcrumb");
    nav.id = "migas_plato";
    const ultimoLi = nav.querySelector(".active");
    ultimoLi.classList.remove("active");
    const li = document.createElement("li");
    li.classList.add("breadcrumb-item", "active");
    li.textContent = "Plato";
    nav.insertAdjacentElement("beforeend", li);

    this.categories.replaceChildren();
    this.main.replaceChildren();

    const container = document.createElement("div");
    container.classList.add("container");

    if (dish) {
      container.id = "single-dish";
      const ingredientsList = dish.ingredients.join(", ");
      container.insertAdjacentHTML(
        "beforeend",
        `
        <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${dish.image}" class="img-fluid rounded-start">
            </div>  
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${dish.name}</h5>
                <p class="card-text">${dish.description}</p>
                <p class="card-text"><small class="text-body-secondary">${ingredientsList}</small></p>
              </div>
            </div>
          </div>
        </div>
        `
      );
    }
    const bDish = document.createElement("button");
    bDish.id = "btn";
    bDish.dataset.name = dish.name;
    bDish.innerHTML = "Abrir plato en una nueva ventana";

    this.main.append(nav);
    this.main.append(container);
    this.main.append(bDish);
  }

  showRestaurant(restaurant, name) {
    this.categories.replaceChildren();
    this.main.replaceChildren();

    const nav = document.createElement("nav");
    nav.id = "migas_restaurante";
    nav.ariaLabel = "breadcrumbs";
    nav.insertAdjacentHTML(
      "beforeend",
      `
      <ol class="breadcrumb">
       <li class="breadcrumb-item">Inicio</li>
       <li class="breadcrumb-item">Restaurantes</li>
       <li class="breadcrumb-item active">${name}</li>
      </ol>
      `
    );

    const container = document.createElement("div");
    container.classList.add("container");
    if (restaurant) {
      container.id = "restaurant";
      container.insertAdjacentHTML(
        "beforeend",
        `
        <div class="card text-bg-dark">
          <img src="${restaurant.restaurant.image}" class="card-img">
          <div class="card-img-overlay">
            <h5 class="card-title">${restaurant.restaurant.name}</h5>
            <p class="card-text text-rest">${restaurant.restaurant.description}</p>
          </div>
        </div>
        `
      );
    }
    this.main.append(nav);
    this.main.append(container);
  }

  showDishInNewWindow(dish, newWindow) {
    const main = newWindow.document.querySelector("main");
    main.replaceChildren();
    let container;
    if (dish) {
      newWindow.document.title = `${dish.name}`;
      container = newWindow.document.createElement("div");
      container.classList.add("container");
      container.id = "single-dish";
      const ingredientsList = dish.ingredients.join(", ");
      container.insertAdjacentHTML(
        "beforeend",
        `
      <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${dish.image}" class="img-fluid rounded-start">
          </div>  
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${dish.name}</h5>
              <p class="card-text">${dish.description}</p>
              <p class="card-text"><small class="text-body-secondary">${ingredientsList}</small></p>
            </div>
          </div>
        </div>
      </div>
      `
      );
    }
    main.append(container);
  }

  showCloseInMenu() {
    const li = document.createElement("li");
    li.insertAdjacentHTML(
      "beforeend",
      `<a class=" href="#" id="navClose" role="button">Cerrar ventanas</a>`
    );
    this.menu.append(li);
  }

  showAdminMenu() {
    const menuOption = document.createElement("li");
    menuOption.classList.add("nav-item");
    menuOption.classList.add("dropdown");
    menuOption.insertAdjacentHTML(
      "afterbegin",
      '<a class="nav-link dropdown-toggle" href="#" id="navServices" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Otras opciones</a>'
    );
    const suboptions = document.createElement("ul");
    suboptions.classList.add("dropdown-menu");
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lnewCategory" class="dropdown-item" href="#new-category">Crear categoría</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="ldelCategory" class="dropdown-item" href="#del-category">Eliminar categoría</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lnewDish" class="dropdown-item" href="#new-dish">Crear plato</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="ldelDish" class="dropdown-item" href="#del-dish">Eliminar plato</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lnewRestaurant" class="dropdown-item" href="#new-restaurant">Crear restaurante</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lAssignDish" class="dropdown-item" href="#assign-dish">Asignar plato a menú</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lDesassignDish" class="dropdown-item" href="#desassign-dish">Desasignar plato a menú</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lChangeDish" class="dropdown-item" href="#change-dish">Cambiar posición platos</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lBackup" class="dropdown-item" href="#backup">Backup</a></li>'
    );

    menuOption.append(suboptions);
    this.menu.append(menuOption);
  }

  showNewCategoryForm() {
    this.categories.replaceChildren();
    this.main.replaceChildren();
    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "new-category";
    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Nueva categoría</h1>'
    );
    container.insertAdjacentHTML(
      "beforeend",
      `<form id="formulario-cat" name="fNewCategory" role="form" class="row g-3" novalidate> 
        <div class="col-md-6 mb-3"> 
          <label class="form-label" for="ncName">Nombre *</label> 
          <div class="input-group"> 
            <input type="text" class="form-control" id="ncName" name="ncName" placeholder="Título de categoría" value="" required> 
            <div class="invalid-feedback">El nombre es obligatorio.</div> 
            <div class="valid-feedback">Correcto.</div> 
          </div> 
        </div> 
        <div class="col-md-6 mb-3"> 
          <label class="form-label" for="ncImg">Nombre de la imagen *</label> 
          <div class="input-group"> 
            <input type="file" class="form-control" id="ncImg" name="ncImg" placeholder="Nombre con extensión de la imagen" value="" required> 
            <div class="invalid-feedback">La imagen no es válida.</div> 
            <div class="valid-feedback">Correcto.</div> 
          </div> 
        </div> 
        <div class="col-md-12 mb-3"> 
          <label class="form-label" for="ncDescription">Descripción</label> 
          <div class="input-group"> 
            <input type="text" class="form-control" id="ncDescription" name="ncDescription" value="" required> 
            <div class="invalid-feedback"></div> 
            <div class="valid-feedback">Correcto.</div> 
          </div> 
        </div> 
        <div class="mb-12"> 
          <button class="btn btn-primary" type="submit">Enviar</button> 
          <button class="btn btn-primary" type="reset">Cancelar</button> 
        </div> 
      </form>`
    );
    this.main.append(container);
  }

  showNewCategoryModal(done, cat, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");
    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Nueva Categoría";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">La categoría <strong>${cat.name}</strong> ha sido creada correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> La categoría <strong>${cat.name}</strong> ya está creada.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewCategory.reset();
      }
      document.fNewCategory.ncName.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showRemoveCategoryForm(categories) {
    for (let category of categories) {
    }
    this.main.replaceChildren();
    this.categories.replaceChildren();
    const container = document.createElement("section");
    container.id = "remove-category";
    container.classList.add("row");
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `
					<div class='categories__enlace categories-eliminar' href="#category-list" data-category=${category.category.name}>
					<img src=${category.category.image} alt=${category.category.name}>
						<h4>${category.category.name}</h4>
						<p>${category.category.description}</p>
            <button class="btn btn-primary" data-category="${category.category.name}" type='button'>Eliminar</button>
					</div>
				`
      );
    }

    this.categories.appendChild(container);
  }

  showRemoveCategoryModal(done, cat, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");
    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Borrado de categoría";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">La categoría <strong>${cat.name}</strong> ha sido eliminada correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3">
          <i class="bi bi-exclamation-triangle"></i> La categoría <strong>${cat.name}</strong> no se ha podido borrar.
        </div>`
      );
    }
    messageModal.show();
  }

  showNewDishForm(categories, allergens) {
    this.main.replaceChildren();
    this.categories.replaceChildren();
    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "new-dish";

    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Nuevo plato</h1>'
    );

    const form = document.createElement("form");
    form.name = "fNewDish";
    form.setAttribute("role", "form");
    form.setAttribute("novalidate", "");
    form.classList.add("row");
    form.classList.add("g-3");

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-6 mb-3">
				<label class="form-label" for="npBrand">Nombre *</label>
				<div class="input-group">
					<input type="text" class="form-control" id="npName" name="npName"
						placeholder="Nombre" value="" required>
					<div class="invalid-feedback">El nombre es oblicatorio.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>`
    );
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-6 mb-3">
				<label class="form-label" for="npModel">Ingredientes *</label>
				<div class="input-group">
					<input type="text" class="form-control" id="npIngredients" name="npIngredients"
						placeholder="Ingredientes" value="" required>
					<div class="invalid-feedback">Los ingredientes son obligatorios.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>`
    );

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-12 mb-3"> 
          <label class="form-label" for="npImg">Nombre de la imagen *</label> 
          <div class="input-group"> 
            <input type="file" class="form-control" id="npImg" name="ncpImg" placeholder="Nombre con extensión de la imagen" value="" required> 
            <div class="invalid-feedback">La imagen no es válida.</div> 
            <div class="valid-feedback">Correcto.</div> 
          </div> 
        </div> `
    );

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-4 mb-3">
				<label class="form-label" for="npModel">Descripción *</label>
				<div class="input-group">
					<textarea class="form-control" id="npDescription" name="npDescription" rows="4" required></textarea>
					<div class="invalid-feedback"></div>
					<div class="invalid-feedback">El plato debe tener una descripción.</div> 
            <div class="valid-feedback">Correcto.</div> 
				</div>
			</div>`
    );

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-4 mb-3">
				<label class="form-label" for="npCategories">Categorías *</label>
				<div class="input-group">
					<label class="input-group-text" for="npCategories"><i class="bi bi-card-checklist"></i></label>
					<select class="form-select" name="npCategories" id="npCategories" multiple required>
					</select>
					<div class="invalid-feedback">El plato debe pertenecer al menos a una categoría.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>`
    );

    const npCategories = form.querySelector("#npCategories");
    for (const category of categories) {
      npCategories.insertAdjacentHTML(
        "beforeend",
        `<option value="${category.category.name}">${category.category.name}</option>`
      );
    }

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-4 mb-3">
    		<label class="form-label" for="npAllergens">Alérgenos </label>
    		<div class="input-group">
    			<label class="input-group-text" for="npAllergens"><i class="bi bi-card-checklist"></i></label>
    			<select class="form-select" name="npAllergens" id="npAllergens" multiple>
    			</select>
    			<div class="valid-feedback">Correcto.</div>
    		</div>
    	</div>`
    );

    const np_Allergens = document.getElementById("np-Allergens");
    const npAllergens = form.querySelector("#npAllergens");
    for (const allerge of allergens) {
      npAllergens.insertAdjacentHTML(
        "beforeend",
        `<option value="${allerge.allerge.name}">${allerge.allerge.name}</option>`
      );
    }

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="mb-12">
				<button class="btn btn-primary" type="submit">Enviar</button>
				<button class="btn btn-primary" type="reset">Cancelar</button>
			</div>`
    );

    container.append(form);
    this.main.append(container);
  }

  showNewDishModal(done, dish, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Plato creado";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El plato <strong>${dish.name}</strong> ha sido creado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El plato <strong>${dish.name}</strong> no ha podido crearse correctamente.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewDish.reset();
      }
      document.fNewDish.npName.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showRemoveDishForm(categories, allergens) {
    this.main.replaceChildren();
    this.categories.replaceChildren();

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "remove-dish";

    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Eliminar un plato</h1>'
    );

    const form = document.createElement("form");
    form.name = "fDelDish";
    form.setAttribute("role", "form");
    form.setAttribute("novalidate", "");
    form.classList.add("row");
    form.classList.add("g-3");

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-6 mb-3">
				<label class="form-label" for="npCategories">Categorías del producto</label>
				<div class="input-group">
					<label class="input-group-text" for="rpCategories"><i class="bi bi-card-checklist"></i></label>
					<select class="form-select" name="rpCategories" id="rpCategories">
						<option disabled selected>Selecciona una categoría</option>
					</select>
				</div>
			</div>`
    );
    const rpCategories = form.querySelector("#rpCategories");
    for (const category of categories) {
      rpCategories.insertAdjacentHTML(
        "beforeend",
        `<option value="${category.category.name}">${category.category.name}</option>`
      );
    }

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-6 mb-3">
				<label class="form-label" for="npAllegens">Alérgenos del producto</label>
				<div class="input-group">
					<label class="input-group-text" for="rpAllergens"><i class="bi bi-card-checklist"></i></label>
					<select class="form-select" name="rpAllergens" id="rpAllergens">
						<option disabled selected>Selecciona un alérgeno</option>
					</select>
				</div>
			</div>`
    );
    const np_Allergens = document.getElementById("np-Allergens");
    const rpAllergens = form.querySelector("#rpAllergens");
    for (const allerge of allergens) {
      rpAllergens.insertAdjacentHTML(
        "beforeend",
        `<option value="${allerge.allerge.name}">${allerge.allerge.name}</option>`
      );
    }

    container.append(form);
    container.insertAdjacentHTML(
      "beforeend",
      '<div id="dish-list" class="container my-3"><div class="row"></div></div>'
    );

    this.main.append(container);
  }

  showRemoveDishList(dishes) {
    const listContainer = document
      .getElementById("dish-list")
      .querySelector("div.row");
    listContainer.replaceChildren();

    let exist = false;
    for (const dish of dishes) {
      exist = true;
      listContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="card mb-3" style="max-width: 600px;">
              <div class="col-md-12 mb-3">
              <div class="col-md-4">
                <img src="${dish.image}" class="img-fluid rounded-start">
              </div>  
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${dish.name}</h5>
                  <p class="card-text">${dish.description}</p>
                  <p class="card-text"><small class="text-body-secondary">${dish.ingredients}</small></p>
                </div>
              </div>
          </div>
          <div class="bottom-wrap"> <a href="#" data-name="${dish.name}" class="btn btn-primary float-right"> Eliminar </a></div>
        `
      );
    }
    if (!exist) {
      listContainer.insertAdjacentHTML(
        "beforeend",
        '<p class="text-danger"><i class="bi bi-exclamation-triangle"></i> No existen plato para esta categoría o Alérgeno.</p>'
      );
    }
  }

  showRemoveDishModal(done, dish, error) {
    const dishList = document.getElementById("dish-list");
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Plato eliminado";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El plato <strong>${dish.name}</strong> ha sido eliminado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        '<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El plato no existe en el restaurante.</div>'
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        const button = dishList.querySelector(
          `a.btn[data-name="${dish.name}"]`
        );
        button.parentElement.parentElement.parentElement.remove();
      }
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showNewRestaurantForm() {
    this.categories.replaceChildren();
    this.main.replaceChildren();
    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "new-restaurant";
    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Nuevo restaurante</h1>'
    );
    container.insertAdjacentHTML(
      "beforeend",
      `<form id="formulario-res" name="fNewRestaurant" role="form" class="row g-3" novalidate> 
        <div class="col-md-6 mb-3"> 
          <label class="form-label" for="nrName">Nombre *</label> 
          <div class="input-group"> 
            <input type="text" class="form-control" id="nrName" name="nrName" placeholder="Nombre del restaurante" value="" required> 
            <div class="invalid-feedback">El nombre es obligatorio.</div> 
            <div class="valid-feedback">Correcto.</div> 
          </div> 
        </div> 
        <div class="col-md-6 mb-3"> 
          <label class="form-label" for="nrImg">Nombre de la imagen *</label> 
          <div class="input-group"> 
            <input type="file" class="form-control" id="nrImg" name="nrImg" placeholder="Nombre con extensión de la imagen" value="" required> 
            <div class="invalid-feedback">La imagen no es válida.</div> 
            <div class="valid-feedback">Correcto.</div> 
          </div> 
        </div> 
        <div class="col-md-12 mb-3"> 
          <label class="form-label" for="nrDescription">Descripción</label> 
          <div class="input-group"> 
            <input type="text" class="form-control" id="nrDescription" name="nrDescription" value="" required> 
            <div class="invalid-feedback"></div> 
            <div class="valid-feedback">Correcto.</div> 
          </div> 
        </div> 
        <div class="mb-12"> 
          <button class="btn btn-primary" type="submit">Enviar</button> 
          <button class="btn btn-primary" type="reset">Cancelar</button> 
        </div> 
      </form>`
    );
    this.main.append(container);
  }

  showNewRestaurantModal(done, res, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");
    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Nuevo restaurante";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El restaurante <strong>${res.name}</strong> ha sido creado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i>El restaurante <strong>${res.name}</strong> ya está creado.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewRestaurant.reset();
      }
      document.fNewRestaurant.nrName.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showAssignDishForm(dishes, menus) {
    this.main.replaceChildren();
    this.categories.replaceChildren();
    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "assign-dish";

    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Asignar platos a menú</h1>'
    );

    const form = document.createElement("form");
    form.name = "fAssignDish";
    form.setAttribute("role", "form");
    form.setAttribute("novalidate", "");
    form.classList.add("row");
    form.classList.add("g-3");

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-12 mb-3">
				<label class="form-label" for="npMenu">Menús *</label>
				<div class="input-group">
					<label class="input-group-text" for="npMenu"><i class="bi bi-card-checklist"></i></label>
					<select class="form-select" name="npMenu" id="npMenu" required>
             <option disabled selected>Selecciona un menú</option>
					</select>
					<div class="invalid-feedback">Los platos deben pertenecer a un menú.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>`
    );

    const npMenus = form.querySelector("#npMenu");
    for (const menu of menus) {
      npMenus.insertAdjacentHTML(
        "beforeend",
        `<option value="${menu.menu.name}">${menu.menu.name}</option>`
      );
    }

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-12 mb-3">
				<label class="form-label" for="naDishes">Platos *</label>
				<div class="input-group">
					<label class="input-group-text" for="naDishes"><i class="bi bi-card-checklist"></i></label>
					<select class="form-select" name="naDishes" id="naDishes" multiple required>
					</select>
					<div class="invalid-feedback">Debe seleccionar al menos un plato</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>`
    );

    const naDishes = form.querySelector("#naDishes");
    for (const dish of dishes) {
      naDishes.insertAdjacentHTML(
        "beforeend",
        `<option value="${dish.name}">${dish.name}</option>`
      );
    }

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="mb-12">
				<button class="btn btn-primary" type="submit">Enviar</button>
				<button class="btn btn-primary" type="reset">Cancelar</button>
			</div>`
    );

    container.append(form);
    this.main.append(container);
  }

  showAssignDishModal(done, menu, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Asignación de platos";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">Los platos se han asignado correctamente al menú <strong>${menu.name}</strong></div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> No se han podido asignar los platos al menú <strong>${menu.name}</strong>.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fAssignDish.reset();
      }
      document.fAssignDish.npMenu.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showDesassignDishForm(menus) {
    console.log("estoy aqui");
    this.main.replaceChildren();
    this.categories.replaceChildren();

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "desassign-dish";

    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Desasignar un plato de un menú</h1>'
    );

    const form = document.createElement("form");
    form.name = "fDesDish";
    form.setAttribute("role", "form");
    form.setAttribute("novalidate", "");
    form.classList.add("row");
    form.classList.add("g-3");

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-12 mb-3">
				<label class="form-label" for="ndMenu">Menús</label>
				<div class="input-group">
					<label class="input-group-text" for="ndMenu"><i class="bi bi-card-checklist"></i></label>
					<select class="form-select" name="ndMenu" id="ndMenu">
						<option disabled selected>Selecciona un menú</option>
					</select>
				</div>
			</div>`
    );
    const ndMenu = form.querySelector("#ndMenu");
    for (const menu of menus) {
      ndMenu.insertAdjacentHTML(
        "beforeend",
        `<option value="${menu.menu.name}">${menu.menu.name}</option>`
      );
    }

    container.append(form);
    container.insertAdjacentHTML(
      "beforeend",
      '<div id="desdish-list" class="container my-3"><div class="row"></div></div>'
    );

    this.main.append(container);
  }

  showDesassignDishList(dishes, menu) {
    const listContainer = document
      .getElementById("desdish-list")
      .querySelector("div.row");
    3;
    listContainer.replaceChildren();

    let exist = false;
    for (const dish of dishes) {
      exist = true;
      listContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="card mb-3" style="max-width: 600px;">
              <div class="col-md-12 mb-3">
              <div class="col-md-4">
                <img src="${dish.image}" class="img-fluid rounded-start">
              </div>  
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${dish.name}</h5>
                  <p class="card-text">${dish.description}</p>
                  <p class="card-text"><small class="text-body-secondary">${dish.ingredients}</small></p>
                </div>
              </div>
          </div>
          <div class="bottom-wrap"> <a href="#" data-name="${dish.name}" data-menu="${menu.name}" class="btn btn-primary float-right"> Eliminar </a></div>
        `
      );
    }
    if (!exist) {
      listContainer.insertAdjacentHTML(
        "beforeend",
        '<p class="text-danger"><i class="bi bi-exclamation-triangle"></i> No existen platos para este menú.</p>'
      );
    }
  }

  showDesassignDishModal(done, dish, error) {
    const dishList = document.getElementById("desdish-list");
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Desasignación de platos en menú";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El plato <strong>${dish.name}</strong> ha sido desasignado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        '<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El plato no existe en el restaurante.</div>'
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        const button = dishList.querySelector(
          `a.btn[data-name="${dish.name}"]`
        );
        button.parentElement.parentElement.remove();
      }
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showChangeDishForm(menus) {
    this.main.replaceChildren();
    this.categories.replaceChildren();

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "change-dish";

    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Cambiar posición de dos platos en un menú</h1>'
    );

    const form = document.createElement("form");
    form.name = "fChanDish";
    form.id = "fChanDish";
    form.setAttribute("role", "form");
    form.setAttribute("novalidate", "");
    form.classList.add("row");
    form.classList.add("g-3");

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-12 mb-3">
				<label class="form-label" for="chMenu">Menús</label>
				<div class="input-group">
					<label class="input-group-text" for="chMenu"><i class="bi bi-card-checklist"></i></label>
					<select class="form-select" name="chMenu" id="chMenu">
						<option disabled selected>Selecciona un menú</option>
					</select>
				</div>
			</div>
      <div id="chdish-list" class="container my-3"><div class="row"></div></div>
      `
    );
    const chMenu = form.querySelector("#chMenu");
    for (const menu of menus) {
      chMenu.insertAdjacentHTML(
        "beforeend",
        `<option value="${menu.menu.name}">${menu.menu.name}</option>`
      );
    }

    container.append(form);
    // container.insertAdjacentHTML(
    //   "beforeend",

    // );

    this.main.append(container);
  }

  showChangeDishList(dishes) {
    const listContainer = document
      .getElementById("chdish-list")
      .querySelector("div.row");
    3;
    listContainer.replaceChildren();
    const form = document.getElementById("fChanDish");

    let exist = false;

    listContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-6 mb-3">
		<label class="form-label" for="chPlato1">Primer plato</label>
		<div class="input-group">
			<label id='dish1' class="input-group-text" for="chPlato1"><i class="bi bi-card-checklist"></i></label>
			<select class="form-select" name="chPlato1" id="chPlato1">
				<option disabled selected>Selecciona el primer plato</option>
			</select>
		</div>
	</div>
  <div class="col-md-6 mb-3">
		<label class="form-label" for="chPlato2">Segundo plato</label>
		<div class="input-group">
			<label id='dish2' class="input-group-text" for="chPlato2"><i class="bi bi-card-checklist"></i></label>
			<select class="form-select" name="chPlato2" id="chPlato2">
				<option disabled selected>Selecciona el segundo plato</option>
			</select>
		</div>
	</div>`
    );
    const chPlato1 = listContainer.querySelector("#chPlato1");
    const chPlato2 = listContainer.querySelector("#chPlato2");
    for (const dish of dishes) {
      exist = true;
      chPlato1.insertAdjacentHTML(
        "beforeend",
        `<option value="${dish.name}">${dish.name}</option>`
      );
      chPlato2.insertAdjacentHTML(
        "beforeend",
        `<option value="${dish.name}">${dish.name}</option>`
      );
    }

    if (!exist) {
      listContainer.insertAdjacentHTML(
        "beforeend",
        '<p class="text-danger"><i class="bi bi-exclamation-triangle"></i> No existen platos para este menu</p>'
      );
    }

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="mb-12">
				<button class="btn btn-primary" type="submit">Enviar</button>
				<button class="btn btn-primary" type="reset">Cancelar</button>
			</div>`
    );
  }

  showChangeDishModal(done, menu, error) {
    console.log("estoy aqui ------------");
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Cambiar orden de platos";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">Los platos se han cambiado correctamente en el menú <strong>${menu.name}</strong></div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> No se han podido cambiar los platos en el menú <strong>${menu.name}</strong>.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fChanDish.reset();
      }
      document.fChanDish.chMenu.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showCookiesMessage() {
    const toast = `
    <div class="fixed-top p-5 mt-5"> 
      <div id="cookies-message" class="toast fade show bg-dark text-white w-100 mw-100" role="alert" aria-live="assertive" aria-atomic="true"> 
        <div class="toast-header"> 
          <h4 class="me-auto">Aviso de uso de cookies</h4> 
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" id="btnDismissCookie"></button> 
        </div> 
        <div class="toast-body p-4 d-flex flex-column"> 
          <p> Este sitio web almacenda datos en cookies para activar su funcionalidad, entre las que se encuentra datos analíticos y personalización. Para poder utilizar este sitio, estás automáticamente aceptando que utilizamos cookies. </p> 
          <div class="ml-auto"> 
            <button type="button" class="btn btn-outline-light mr-3 deny" id="btnDenyCookie" data-bs-dismiss="toast"> Denegar </button> 
            <button type="button" class="btn btn-primary" id="btnAcceptCookie" data-bs-dismiss="toast"> Aceptar </button> 
          </div> 
        </div> 
      </div> 
    </div>`;
    document.body.insertAdjacentHTML("afterbegin", toast);

    //gestionamos los eventos producidos en la notificacion
    const cookiesMessage = document.getElementById("cookies-message");
    cookiesMessage.addEventListener("hidden.bs.toast", (event) => {
      event.currentTarget.parentElement.remove();
    });

    //capturamos el evento click del boton de aceptacion
    const btnAcceptCookie = document.getElementById("btnAcceptCookie");
    btnAcceptCookie.addEventListener("click", (event) => {
      setCookie("accetedCookieMessage", "true", 1);
    });

    //añadimos un manejador para el evento click para cerrar y denegar
    const denyCookieFunction = (event) => {
      this.main.replaceChildren();
      this.main.insertAdjacentHTML(
        "afterbegin",
        `<div class="container my-3">
          <div class="alert alert-warning" role="alert">
					  <strong>Para utilizar esta web es necesario aceptar el uso de cookies. Debe recargar la página y aceptar las condicones para seguir navegando. Gracias.</strong>
				  </div>
        </div>`
      );
      this.categories.remove();
      this.menu.remove();
    };
    const btnDenyCookie = document.getElementById("btnDenyCookie");
    btnDenyCookie.addEventListener("click", denyCookieFunction);
    const btnDismissCookie = document.getElementById("btnDismissCookie");
    btnDismissCookie.addEventListener("click", denyCookieFunction);
  }

  showIdentificationLink() {
    const userArea = document.getElementById("userArea");
    userArea.replaceChildren();
    userArea.insertAdjacentHTML(
      "afterbegin",
      `<div class="account d-flex mx-2 flex-column" style="text-align: right; height: 40px"> <a id="login" href="#"><i class="bi bi-person-circle" aria-hidden="true"></i> Identificate</a> </div>`
    );
  }

  showLogin() {
    this.categories.replaceChildren();
    this.main.replaceChildren();
    const login = `<div class="container h-100">
			<div class="d-flex justify-content-center h-100">
				<div class="user_card">
					<div class="d-flex justify-content-center form_container">
					<form name="fLogin" role="form" novalidate>
							<div class="input-group mb-3">
								<input type="text" name="username" class="form-control input_user" value="" placeholder="usuario">
							</div>
							<div class="input-group mb-2">
								<input type="password" name="password" class="form-control input_pass" value="" placeholder="contraseña">
							</div>
							<div class="form-group">
								<div class="custom-control custom-checkbox">
									<input name="remember" type="checkbox" class="custom-control-input" id="customControlInline">
									<label class="custom-control-label" for="customControlInline">Recuerdame</label>
								</div>
							</div>
								<div class="d-flex justify-content-center mt-3 login_container">
									<button class="btn login_btn" type="submit">Acceder</button>
						</div>
						</form>
					</div>
				</div>
			</div>
		</div>`;
    this.main.insertAdjacentHTML("afterbegin", login);
  }

  showInvalidUserMessage() {
    this.main.insertAdjacentHTML(
      "beforeend",
      `<div class="container my-3">
        <div class="alert alert-warning" role="alert"> 
          <strong>El usuario y la contraseña no son válidos. Inténtelo nuevamente.</strong> 
        </div>
      </div>`
    );
    document.forms.fLogin.reset();
    document.forms.fLogin.username.focus();
  }

  showAuthUserProfile(user) {
    const userArea = document.getElementById("userArea");
    userArea.replaceChildren();
    userArea.insertAdjacentHTML(
      "afterbegin",
      `
      <div id='user_min' class="account d-flex mx-2 flex-column" style="text-align: right"> 
        ${user.username} 
        <a id="aCloseSession" href="#">Cerrar sesión</a> 
      </div> 
      <div class="image"> 
        <img alt="${user.username}" src="img/user.png" id='img_user' /> 
      </div>
      `
    );
  }

  removeAdminMenu() {
    const navServices = document.getElementById("navServices");
    if (navServices) navServices.parentElement.remove();
  }

  //Creacion de binds ------------------------------------------------------------------------------------------------------------
  bindInit(handler) {
    document.getElementById("init").addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        handler,
        [],
        "body",
        { action: "init" },
        "#",
        event
      );
    });
  }

  //Dos métodos que enlazan el manejador con los elementos de la pagina categoria
  bindDishesCategoryList(handler) {
    const categoryList = document.getElementById("categories");
    const links = categoryList.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { category } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [category],
          "#category-list",
          { action: "dishesCategoryList", category },
          "#category-list",
          event
        );
      });
    }
  }

  bindDishesCategoryListInMenu(handler) {
    const navCats = document.getElementById("navCats");
    const links = navCats.nextElementSibling.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { category } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [category],
          "#category-list",
          { action: "dishesCategoryList", category },
          "#category-list",
          event
        );
      });
    }
  }

  bindDishesAlleregnListInMenu(handler) {
    const navAller = document.getElementById("navAller");
    const links = navAller.nextSibling.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { allergen } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [allergen],
          "#navAller",
          { action: "dishesAllergenList", allergen },
          "#",
          event
        );
      });
    }
  }

  bindDishesMenuListInMenu(handler) {
    const navMenu = document.getElementById("navMenu");
    const links = navMenu.nextSibling.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { menu } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [menu],
          "#navMenu",
          { action: "dishesMenuList", menu },
          "#",
          event
        );
      });
    }
  }

  bindDishClick(handler) {
    const dishlist = document.getElementById("dishes-list");
    const links = dishlist.querySelectorAll("a.imagen");

    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { name } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [name],
          "#single-dish",
          { action: "dish", name },
          "#single-dish",
          event
        );
      });
    }
  }

  bindRestaurantListInMenu(handler) {
    const navRest = document.getElementById("navRest");
    const links = navRest.nextElementSibling.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.restaurant);

        const { restaurant } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [restaurant],
          "#restaurant",
          { action: "restaurant", restaurant },
          "#",
          event
        );
      });
    }
  }

  bindShowDishInNewWindow(handler) {
    const bOpen = document.getElementById("btn");
    bOpen.addEventListener("click", (event) => {
      let windowName = `DishWindow${this.cont}`;

      // Abrir la página en una nueva ventana
      let newWindow = window.open(
        "plato.html",
        windowName,
        "width=800, height=330, top=250, left=350, titlebar=yes, toolbar=no, menubar=no, location=no"
      );

      // Verificar si se pudo abrir la ventana
      if (newWindow) {
        this.dishWindow.set(windowName, newWindow); // Agregar la ventana al mapa
        this.cont++;
      }

      // Agregar un listener para el evento DOMContentLoaded
      newWindow.addEventListener("DOMContentLoaded", () => {
        const dishName = event.target.dataset.name;
        handler(dishName, newWindow);
      });
    });
  }

  bindCloseInMenu(handler) {
    const navClose = document.getElementById("navClose");
    navClose.addEventListener("click", (event) => {
      handler(this.dishWindow);
    });
  }

  bindAdminMenu(
    hNewCategory,
    hRemoveCategory,
    hNewDishForm,
    hRemoveDish,
    hNewRestaurant,
    hAssignDishForm,
    hDesassignDishForm,
    hChangeDishForm,
    hbackup
  ) {
    const newCategoryLink = document.getElementById("lnewCategory");
    newCategoryLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hNewCategory,
        [],
        "#new-category",
        { action: "newCategory" },
        "#",
        event
      );
    });
    const delCategoryLink = document.getElementById("ldelCategory");
    delCategoryLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hRemoveCategory,
        [],
        "#remove-category",
        { action: "removeCategory" },
        "#",
        event
      );
    });
    const newProductLink = document.getElementById("lnewDish");
    newProductLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hNewDishForm,
        [],
        "#new-dish",
        { action: "newDish" },
        "#",
        event
      );
    });
    const delProductLink = document.getElementById("ldelDish");
    delProductLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hRemoveDish,
        [],
        "#remove-dish",
        { action: "removeDish" },
        "#",
        event
      );
    });
    const newRestaurantLink = document.getElementById("lnewRestaurant");
    newRestaurantLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hNewRestaurant,
        [],
        "#new-restaurant",
        { action: "newRestaurant" },
        "#",
        event
      );
    });
    const assignDishLink = document.getElementById("lAssignDish");
    assignDishLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hAssignDishForm,
        [],
        "#assign-dish",
        { action: "assignDish" },
        "#",
        event
      );
    });
    const desassignDishLink = document.getElementById("lDesassignDish");
    desassignDishLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hDesassignDishForm,
        [],
        "#desassign-dish",
        { action: "desassignDish" },
        "#",
        event
      );
    });
    const changeDishLink = document.getElementById("lChangeDish");
    changeDishLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hChangeDishForm,
        [],
        "#change-dish",
        { action: "changeDish" },
        "#",
        event
      );
    });
    const backup = document.getElementById("lBackup");
    backup.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hbackup,
        [],
        "#backup",
        { action: "backup" },
        "#",
        event
      );
    });
  }

  bindNewCategoryForm(handler) {
    newCategoryValidation(handler);
  }

  bindRemoveCategoryForm(handler) {
    const removeContainer = document.getElementById("remove-category");
    const buttons = removeContainer.getElementsByTagName("button");
    for (const button of buttons) {
      button.addEventListener("click", function (event) {
        handler(this.dataset.category);
      });
    }
  }

  bindNewDishForm(handler) {
    newDishValidation(handler);
  }

  //creamos el bind para ambos select de borrado
  bindRemoveDishSelects(hCategories, hAllergens) {
    const rpCategories = document.getElementById("rpCategories");
    rpCategories.addEventListener("change", (event) => {
      this[EXCECUTE_HANDLER](
        hCategories,
        [event.currentTarget.value],
        "#remove-dish",
        {
          action: "removeDishByCategory",
          category: event.currentTarget.value,
        },
        "#remove-dish",
        event
      );
    });
    const rpAllergens = document.getElementById("rpAllergens");
    rpAllergens.addEventListener("change", (event) => {
      this[EXCECUTE_HANDLER](
        hAllergens,
        [event.currentTarget.value],
        "#remove-dish",
        {
          action: "removeDishByAllergen",
          allergen: event.currentTarget.value,
        },
        "#remove-dish",
        event
      );
    });
  }

  bindRemoveDish(handler) {
    const dishList = document.getElementById("dish-list");
    const buttons = dishList.querySelectorAll("a.btn");
    for (const button of buttons) {
      button.addEventListener("click", function (event) {
        handler(this.dataset.name);
        event.preventDefault();
      });
    }
  }

  bindNewRestaurantForm(handler) {
    newRestaurantValidation(handler);
  }

  bindAssignDishForm(handler) {
    AssignDishValidation(handler);
  }

  bindDesassignDishSelects(hMenu) {
    const ndMenu = document.getElementById("ndMenu");
    ndMenu.addEventListener("change", (event) => {
      this[EXCECUTE_HANDLER](
        hMenu,
        [event.currentTarget.value],
        "#desassign-dish",
        {
          action: "desassignDishByMenu",
          menu: event.currentTarget.value,
        },
        "#desassign-dish",
        event
      );
    });
  }

  bindDesassignDish(handler) {
    const dishList = document.getElementById("desdish-list");
    const buttons = dishList.querySelectorAll("a.btn");
    for (const button of buttons) {
      console.log(button);
      button.addEventListener("click", function (event) {
        handler(this.dataset.name, this.dataset.menu);
        event.preventDefault();
      });
    }
  }

  bindChangeDishSelects(hMenu) {
    const chMenu = document.getElementById("chMenu");
    chMenu.addEventListener("change", (event) => {
      this[EXCECUTE_HANDLER](
        hMenu,
        [event.currentTarget.value],
        "#change-dish",
        {
          action: "changeDishByMenu",
          menu: event.currentTarget.value,
        },
        "#change-dish",
        event
      );
    });
  }

  bindChangeDishForm(handler) {
    ChangeDishValidation(handler);
  }

  bindIdentificationLink(handler) {
    const login = document.getElementById("login");
    login.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        handler,
        [],
        "main",
        { action: "login" },
        "#",
        event
      );
    });
  }

  bindLogin(handler) {
    const form = document.forms.fLogin;
    form.addEventListener("submit", (event) => {
      handler(form.username.value, form.password.value, form.remember.checked);
      event.preventDefault();
    });
  }

  bindCloseSession(handler) {
    document
      .getElementById("aCloseSession")
      .addEventListener("click", (event) => {
        handler();
        event.preventDefault();
      });
  }

  initHistory() {
    history.replaceState({ action: "init" }, null);
  }

  setUserCookie(user) {
    setCookie("activeUser", user.username, 1);
  }

  deleteUserCookie() {
    setCookie("activeUser", "", 0);
  }
}
export default ManagerView;
