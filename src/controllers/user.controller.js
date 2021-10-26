const userService = require("../service/user.service.js");
const logger = require("../config/logger/logger")(module);

class UserController {
  signin = async (req, res) => {
    logger.debug("Rest request to login");
    let response = await userService.signin(req.body);
    res.send(response);
  };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new UserController();
