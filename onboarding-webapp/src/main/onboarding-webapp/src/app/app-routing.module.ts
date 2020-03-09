import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from "./user/user-list/user-list.component";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {UserCreateComponent} from "./user/user-create/user-create.component";
import {UserDetailComponent} from "./user/user-detail/user-detail.component";

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
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: UserDetailComponent
          },
          // {
          //   path: 'phones',
          //   pathMatch: 'full',
          //   component: PhoneListComponent
          // }
        ]
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
