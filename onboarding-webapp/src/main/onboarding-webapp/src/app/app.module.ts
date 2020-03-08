import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ControlMessagesComponent } from './control-messages/control-messages.component';
import { UserEditTemplateComponent } from './user-edit-template/user-edit-template.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserDeleteModalComponent } from "./user-delete-modal/user-delete-modal.component";


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserEditComponent,
    UserEditTemplateComponent,
    ControlMessagesComponent,
    UserCreateComponent,
    UserDeleteModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
