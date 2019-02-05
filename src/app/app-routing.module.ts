import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageComponent } from './messages/message/message.component';
import { NamesComponent } from './names/names.component';
import { ListComponent } from './messages/list/list.component';
import { SearchComponent } from './search/search.component';
import { UniqueComponent } from './unique/unique.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  {
    path: 'messages',
    component: MessagesComponent,
    children: [{ path: '', component: ListComponent }, { path: ':id', component: MessageComponent }]
  },

  { path: 'names', component: NamesComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'unique/japanese', component: UniqueComponent },
  { path: 'unique/english', component: UniqueComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
