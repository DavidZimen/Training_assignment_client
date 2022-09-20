import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  { path: 'user-info', component: UserInfoComponent },
  { path: 'users-list', component: UserListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
