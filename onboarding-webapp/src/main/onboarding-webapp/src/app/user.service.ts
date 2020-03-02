import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserModel} from "./model/user.model";
import {Observable} from "rxjs";

const BASE_URI = './api/v1/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  findAllUsers(): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(BASE_URI);
  }
}
