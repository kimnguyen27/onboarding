import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserModel } from "../_model/user.model";
import { Observable } from "rxjs";

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

  public findByUsername(username: string): Observable<UserModel[]>{
    //username= '^'+username.trim()+'$'; //Exact match testing?
    return this.httpClient.get<UserModel[]>(`${BASE_URI}/?username=${username}`);
  }

  public usernameExists(username: string): Observable<any>{
    return this.httpClient.get<Boolean>(`${BASE_URI}/?usernameExists=${username}`);
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
