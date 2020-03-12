import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {UserModel} from "../model/user.model";
import {Observable} from "rxjs";

const BASE_URI = './api/v1/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  public findAllUsers(): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(BASE_URI);
  }

  public usernameExists(username: string) {
    let params = new HttpParams();
    params = params.set('username', username);

    return this.httpClient.get(`${BASE_URI}`, {params: params});
  }

  public create(user: UserModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>(`${BASE_URI}`, user);
  }

  public get(userId: string): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${BASE_URI}/${userId}`);
  }

  public update(user: UserModel): Observable<UserModel> {
    return this.httpClient.put<UserModel>(`${BASE_URI}/${user.userId}`, user);
  }

  public delete(userId: string): Observable<any> {
    return this.httpClient.delete(`${BASE_URI}/${userId}`);
  }
}
