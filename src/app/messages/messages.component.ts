import { Component, OnInit } from '@angular/core';
import { MessagesService } from './messages.service';
import { DataService } from '../shared/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  private messageSubscription: Subscription;
  messages = [];
  constructor(private messageService: MessagesService, private dataService: DataService) {}

  ngOnInit() {
    this.dataService.fetchMessages(this.messageService.params);
    this.messageSubscription = this.messageService.messagesUpdated.subscribe(messages => {
      this.messages = messages;
    });
  }

  onPageChange(page) {
    this.messageService.setPage(page);
    this.dataService.fetchMessages(this.messageService.params);
  }
}
