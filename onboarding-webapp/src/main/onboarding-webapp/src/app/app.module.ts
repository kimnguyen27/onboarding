import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ControlMessagesComponent } from './control-messages/control-messages.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserDeleteModalComponent } from "./user/user-delete-modal/user-delete-modal.component";
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { CreatePhoneComponent } from './phone/create-phone/create-phone.component';
import { DeletePhoneComponent } from './phone/delete-phone/delete-phone.component';
import { EditPhoneComponent } from './phone/edit-phone/edit-phone.component';
import { PhoneListComponent } from './phone/phone-list/phone-list.component';
import { PhoneDetailComponent } from './phone/phone-detail/phone-detail.component';
import { VerifyPhoneComponent } from './phone/verify-phone/verify-phone.component';


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserEditComponent,
    ControlMessagesComponent,
    UserCreateComponent,
    UserDeleteModalComponent,
    UserDetailComponent,
    CreatePhoneComponent,
    DeletePhoneComponent,
    EditPhoneComponent,
    PhoneListComponent,
    PhoneDetailComponent,
    VerifyPhoneComponent
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
