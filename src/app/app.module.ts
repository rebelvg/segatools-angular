import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MessageComponent } from './messages/message/message.component';
import { MessagesComponent } from './messages/messages.component';
import { NamesComponent } from './names/names.component';
import { ListItemComponent } from './messages/list-item/list-item.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, MessageComponent, MessagesComponent, NamesComponent, ListItemComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgxPaginationModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
