import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './user';

@Injectable()
export class UserService{

    private url = "http://localhost:4000/api/admin";
    constructor(private http: HttpClient){ }

    getUsers(page, limit, PerPage){
        return this.http.get<User[]>(`${this.url}?page=${page}&limit=${limit}&PerPage=${PerPage}`);
    }

    getFilteredUsers(model){
        return this.http.post<User[]>(`${this.url}/filter`, model);
    }

    createUser(user: User){
        return this.http.post<User>(`${this.url}/create`, user);
    }

    login(model: object){
        console.log("cred", model)
        return this.http.post<User>(`${this.url}/auth`, model);
    }

    updateUser(user: User) {
        return this.http.put<User>(`${this.url}/update`, user);
    }

    deleteUser(id: any){
        return this.http.delete<User>(this.url + '/' + id);
    }
}