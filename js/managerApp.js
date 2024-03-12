import RestaurantsManager from "./restauranManager.js";
import ManagerController from "./managerController.js";
import ManagerView from "./managerView.js";
import AuthenticationService from "./authenticacion/authentication.js";

const ManagerApp = new ManagerController(
  RestaurantsManager.getInstance(),
  new ManagerView(),
  AuthenticationService.getInstance()
);
export default ManagerApp;
