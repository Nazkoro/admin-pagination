import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../../user.service";

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() collection: any
  @Output() filteredUser = new EventEmitter()
  @Output()  reset = new EventEmitter()
  collection2?: any = [];
  year?: any = "";
  username?: any = "";
  country?: any = "";
  city?: any = "";
  jobs?: any = "";

  selectedOption: any;
  resetFilter: boolean = false;

  constructor(private serv: UserService) {
  }

  ngOnInit(): void {
    this.collection2 = this.collection;
  }

   select(){
     this.collection = this.collection2;
    let selected = new Object();
    if(this.year != "" && this.selectedOption == undefined) selected["year"] = this.year
    if(this.username != "") selected["username"] = this.username
    if(this.country != "") selected["country"] = this.country
    if(this.city != "") selected["city"] = this.city
    if(this.jobs != "") selected["jobs"] = this.jobs

     this.serv.getFilteredUsers(selected).subscribe((data: any) =>{
      this.collection = data
       this.submitFilter()
    })
  }

  clearFilter(){
    this.resetFilter = true;
    this.reset.emit(this.resetFilter)
  }

  submitFilter(){

    switch (this.selectedOption) {
      case ">":
        this.collection = this.collection.filter((user: any) => user.year != "" && +user.year > +this.year )
        break;
      case "all":
        this.collection = this.collection2
        break;
      case ">=":
        this.collection = this.collection.filter((user: any) => user.year != "" && +user.year >= +this.year )
        break;
      case "==":
        this.collection = this.collection.filter((user: any) => user.year != "" && +user.year == +this.year )
        break;
      case "<=":
        this.collection = this.collection.filter((user: any) => user.year != "" && +user.year <= +this.year )
        break;
      case "<":
        this.collection = this.collection.filter((user: any) => user.year != "" && +user.year < +this.year )
        break;
      default:
    }
    this.filteredUser.emit(this.collection)
    this.resetFilter = false;
    this.reset.emit(this.resetFilter)

    this.year = "";
  }
}
