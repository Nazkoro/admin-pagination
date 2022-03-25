import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {User} from "../user";
import {UserService} from "../user.service";

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  //типы шаблонов
  @ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate: TemplateRef<any>|undefined;
  @ViewChild('editTemplate', {static: false}) editTemplate: TemplateRef<any>|undefined;
  page: number = 1;
  PerPage: number = 2;
  limitPage:number = 6;
  editedUser: User|null = null;
  users: Array<User> = [];
  isNewRecord: boolean = false;
  statusMessage: string = "";
  unlockPagin: boolean = true;

  constructor(private serv: UserService) {
    this.users = new Array<User>();
  }

  ngOnInit() {
    this.loadUsers();
  }
  skipPage(){
    if(Math.ceil(this.users.length/this.PerPage) === this.page && this.unlockPagin){
      this.loadUsers();
    }
  }

  printFiltered(users){
    this.users = [...users]
  }
  blockPagination(flag){
    this.unlockPagin = flag

  }


  //загрузка пользователей
  private loadUsers() {
    this.serv.getUsers(this.page -1, this.limitPage, this.PerPage).subscribe((data: Array<User>) => {
      this.users =[...this.users,...data] ;
    });
  }
  // добавление пользователя
  addUser() {
    this.editedUser = new User("","",0,"","","","","","");
    this.users.unshift(this.editedUser)
    // this.users.push(this.editedUser);
    this.isNewRecord = true;
  }

  // редактирование пользователя
  editUser(user: User) {
    this.editedUser = new User(user.email, user.username, user.year, user._id, user.password,user.country, user.city, user.jobs,user.position);
  }
  // загружаем один из двух шаблонов
  loadTemplate(user: User) {
    if (this.editedUser && this.editedUser._id === user._id) {
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
      this.users.shift();
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

}
