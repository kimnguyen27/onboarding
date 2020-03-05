import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from "./user-list/user-list.component";
import {UserEditComponent} from "./user-edit/user-edit.component";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {UserCreateComponent} from "./user-create/user-create.component";

const routes: Routes = [
  {
    path: 'users',
    pathMatch: 'prefix',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: UserListComponent
      },
      {
        path: 'new',
        pathMatch: 'full',
        component: UserCreateComponent
      },
      {
        path: ':userId',
        pathMatch: 'full',
        component: UserEditComponent
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppRoutingModule {


}
