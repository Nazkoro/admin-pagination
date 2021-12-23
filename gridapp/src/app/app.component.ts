import {TemplateRef, ViewChild} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {User} from './user';
import {UserService} from './user.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [UserService]
})
export class AppComponent implements OnInit {
    //типы шаблонов
    @ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate: TemplateRef<any>|undefined;
    @ViewChild('editTemplate', {static: false}) editTemplate: TemplateRef<any>|undefined;

    p: number = 1;
    editedUser: User|null = null;
    users: Array<User>;
    isNewRecord: boolean = false;
    statusMessage: string = "";

    constructor(private serv: UserService) {
        this.users = new Array<User>();
    }

    ngOnInit() {
        this.loadUsers();
    }

    //загрузка пользователей
    private loadUsers() {
        this.serv.getUsers().subscribe((data: Array<User>) => {
            this.users = data;
        });
    }
    // добавление пользователя
    addUser() {
        this.editedUser = new User("","",0,"");
        this.users.push(this.editedUser);
        this.isNewRecord = true;
    }

    // редактирование пользователя
    editUser(user: User) {
        this.editedUser = new User(user.email, user.username, user.year);
    }
    // загружаем один из двух шаблонов
    loadTemplate(user: User) {
        if (this.editedUser && this.editedUser.email === user.email) {
            return this.editTemplate;
        } else {
            return this.readOnlyTemplate;
        }
    }
    // сохраняем пользователя
    saveUser() {
        if (this.isNewRecord) {
            // добавляем пользователя
            this.serv.createUser(this.editedUser as User).subscribe(data => {
                this.statusMessage = 'Данные успешно добавлены',
                    this.loadUsers();
            });
            this.isNewRecord = false;
            this.editedUser = null;
        } else {
            // изменяем пользователя
            this.serv.updateUser(this.editedUser as User).subscribe(data => {
                this.statusMessage = 'Данные успешно обновлены',
                    this.loadUsers();
            });
            this.editedUser = null;
        }
    }
    // отмена редактирования
    cancel() {
        // если отмена при добавлении, удаляем последнюю запись
        if (this.isNewRecord) {
            this.users.pop();
            this.isNewRecord = false;
        }
        this.editedUser = null;
    }
    // удаление пользователя
    deleteUser(user: User) {
        this.serv.deleteUser(user._id).subscribe(data => {
            this.statusMessage = 'Данные успешно удалены',
                this.loadUsers();
        });
    }
    selectTodo(event : any): void {
        console.log(event)
    }
}
