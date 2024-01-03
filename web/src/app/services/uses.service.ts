import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class UsesService {

  constructor(private rest: RestService) { }

  createUsers(p: object) { return this.rest.post('users', p); }
  updateUsers(id :string, p: object) { return this.rest.put(`users/${id}`, p); }
  getUsers(p: object) { return this.rest.get('users', p); }
  deleteUsers(p: object) { return this.rest.delete('users', p); }
  getUsersById(p: object) { return this.rest.get('usersById', p); }

  login(p: object) { return this.rest.post('login', p); }

}
