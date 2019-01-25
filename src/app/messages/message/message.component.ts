import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessagesService } from '../messages.service';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/shared/models/message.model';
import { DataService } from 'src/app/shared/data.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { forEach, get } from 'lodash';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { PreviewService } from './preview/preview.service';
import { chapters } from './chapters';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {
  message: Message;
  chapters = chapters;

  previewMessage: string;
  messageSubscription: Subscription;
  messageForm = new FormGroup({});
  isLoaded = false;
  constructor(
    private msgService: MessagesService,
    private route: ActivatedRoute,
    private dataService: DataService,
    public modalService: NgxSmartModalService,
    private previewService: PreviewService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.dataService.fetchMessage(params.id);
      }
    });
    this.messageSubscription = this.msgService.singleMessageUpdated.subscribe(message => {
      this.isLoaded = true;
      this.message = message;
      console.log(message);
      this.initForm();
    });
    console.log('cool');
  }

  onSubmit() {
    const values = this.messageForm.value;
    const data = {
      chapterName: undefined,
      updatedLines: [],
      updateMany: true
    };

    if (this.message.chapterName !== values.chapterName) {
      data.chapterName = values.chapterName;
    }

    forEach(this.message.lines, (line, index) => {
      if (line.text.japanese !== null && get(values.lines, [index, 'english']) !== line.text.english) {
        data.updatedLines.push({
          japanese: line.text.japanese,
          english: get(values.lines, [index, 'english'])
        });
      }
    });

    this.dataService.updateMessage(this.message._id, data);
  }

  getControls() {
    return (<FormArray>this.messageForm.get('lines')).controls;
  }

  initForm() {
    const lines = new FormArray([]);
    forEach(this.message.lines, line => {
      lines.push(
        new FormGroup({
          english: new FormControl(line.text.english),
          japanese: new FormControl(line.text.japanese),
          count: new FormControl(line.count)
        })
      );
    });

    this.messageForm = new FormGroup({
      chapterName: new FormControl(this.message.chapterName),
      lines
    });
  }

  onPreview(index) {
    this.previewMessage = this.messageForm.value.lines[index].english;
    this.previewService.setMessage(this.previewMessage);
    this.modalService.open('myModal');
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }
}
