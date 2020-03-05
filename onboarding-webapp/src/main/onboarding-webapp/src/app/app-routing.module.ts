import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from "./user-list/user-list.component";
import {UserEditComponent} from "./user-edit/user-edit.component";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {UserEditTemplateComponent} from "./user-edit-template/user-edit-template.component";

const routes: Routes = [
  {path: 'users', component: UserListComponent},
  {path: 'users/:userId', component: UserEditComponent},
  {path: 'users2/:userId', component: UserEditTemplateComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppRoutingModule {


}
