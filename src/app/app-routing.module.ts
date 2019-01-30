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

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  {
    path: 'messages',
    component: MessagesComponent,
    children: [{ path: '', component: ListComponent }, { path: ':id', component: MessageComponent }]
  },

  { path: 'names', component: NamesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'unique', component: UniqueComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
