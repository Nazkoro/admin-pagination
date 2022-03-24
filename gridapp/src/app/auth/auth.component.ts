import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import { NgForm} from '@angular/forms';
import {Router} from "@angular/router";
@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {


  constructor( private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    console.log(form, form.value.password,form.value.email);
    this.userService.login({password:form.value.password, email: form.value.email}).subscribe((data: any) => {
      if(data){
        console.log(data)
        this.router.navigate(['/admin'])
      } else alert(" wrong password");
    })

    form.reset();
  }

}
