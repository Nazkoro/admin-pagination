import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';


@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [UserService]
})
export class AppComponent implements OnInit {
     ngOnInit() {
    }

}
