const StudentService = require("./student.service");
const logger = require("../config/logger/logger")(module);
class UserService {
  signin = async (params) => {
    let student = await StudentService.updateOrCreate(params);
    return student;
  };
}

module.exports = new UserService();
