import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SuiModule } from 'ng2-semantic-ui';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSmartModalModule } from 'ngx-smart-modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MessageComponent } from './messages/message/message.component';
import { MessagesComponent } from './messages/messages.component';
import { NamesComponent } from './names/names.component';
import { ListComponent } from './messages/list/list.component';
import { ItemComponent } from './messages/list/item/item.component';
import { NavigationComponent } from './messages/message/navigation/navigation.component';
import { PreviewComponent } from './messages/message/preview/preview.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MobileHeaderComponent } from './mobile-header/mobile-header.component';
import { UniqueComponent } from './unique/unique.component';
import { SearchComponent } from './search/search.component';
import { NotifierModule } from 'angular-notifier';
import { LoginComponent } from './login/login.component';
import { InfoboxComponent } from './shared/infobox/infobox.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { ReplaceComponent } from './replace/replace.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MessagesComponent,
    MessageComponent,
    NamesComponent,
    ListComponent,
    ItemComponent,
    NavigationComponent,
    PreviewComponent,
    SidebarComponent,
    MobileHeaderComponent,
    UniqueComponent,
    SearchComponent,
    LoginComponent,
    InfoboxComponent,
    ProfileComponent,
    AdminComponent,
    ReplaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SuiModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NotifierModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
