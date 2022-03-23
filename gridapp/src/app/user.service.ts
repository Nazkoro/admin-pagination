import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './user';

@Injectable()
export class UserService{

    private url = "http://localhost:4000/api/admin";
    constructor(private http: HttpClient){ }

    getUsers(){
        return this.http.get<User[]>(this.url);
    }

    createUser(user: User){

        // const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        // return this.http.post<User>(this.url, JSON.stringify(user), {headers: myHeaders});
        return this.http.post<User>(`${this.url}/create`, user);
    }
    updateUser(user: User) {
        // const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        // return this.http.put<User>(this.url, JSON.stringify(user), {headers:myHeaders});
        return this.http.put<User>(`${this.url}/update`, user);
    }

    deleteUser(id: any){

        return this.http.delete<User>(this.url + '/' + id);
    }
}