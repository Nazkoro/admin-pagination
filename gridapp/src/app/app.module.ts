import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';
import { AppComponent }   from './app.component';
import { FormatPipe} from './format.pipe';
import { ReactiveFormsModule }   from '@angular/forms';
import {NgxPaginationModule} from "ngx-pagination";
import { AuthComponent } from './auth/auth.component';
import {AppRoutingModule} from "./app-routing.module";
import { AdminComponent } from './admin/admin.component';
import { FilterComponent } from './admin/filter/filter.component';
@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule, NgxPaginationModule, AppRoutingModule],
    declarations: [ AppComponent ,FormatPipe, AuthComponent, AdminComponent, FilterComponent],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }