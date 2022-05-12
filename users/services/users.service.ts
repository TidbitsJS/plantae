import UsersDao from "../dao/users.dao";
import { CRUD } from "../../common/interfaces/crud.interface";
import { CreateUserDto } from "../dto/create.user.dto";
import { PutUserDto } from "../dto/put.user.dto";
import { PatchUserDto } from "../dto/patch.user.dto";

class UsersService implements CRUD {
  async list(limit: number, page: number) {
    return UsersDao.getUsers(limit, page);
  }

  async create(resource: CreateUserDto) {
    return UsersDao.createUser(resource);
  }

  async deleteById(id: string) {
    return UsersDao.deleteUserById(id);
  }

  async patchById(id: string, resource: PatchUserDto): Promise<any> {
    return UsersDao.updateUserById(id, resource);
  }

  async putById(id: string, resource: PutUserDto): Promise<any> {
    return UsersDao.updateUserById(id, resource);
  }

  async readById(id: string) {
    return UsersDao.readById(id);
  }

  async readyByEmail(email: string) {
    return UsersDao.readByEmail(email);
  }

  async getAllPlantsForUser(userId: string) {
    return UsersDao.getAllPlantsForUser(userId);
  }
}

export default new UsersService();
