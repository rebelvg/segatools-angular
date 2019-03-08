import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessagesService } from '../messages.service';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/shared/models/message.model';
import { DataService } from 'src/app/shared/services/data.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { forEach, get, isNull, set } from 'lodash';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { PreviewService } from './preview/preview.service';
import { MetaService } from 'src/app/shared/services/meta.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {
  message: Message;
  chapters = [];

  previewMessage: string;
  messageSubscription: Subscription;
  messageForm = new FormGroup({});
  isLoaded = false;
  isApproving = false;
  isChanged = false;
  constructor(
    private msgService: MessagesService,
    private route: ActivatedRoute,
    private dataService: DataService,
    public modalService: NgxSmartModalService,
    private previewService: PreviewService,
    private auth: AuthService,
    private meta: MetaService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.dataService.fetchMessage(params.id);
      }
    });
    this.chapters = this.meta.getChapters();
    this.meta.chaptersUpdated.subscribe(chapters => {
      this.chapters = chapters;
    });

    this.messageSubscription = this.msgService.singleMessageUpdated.subscribe(message => {
      this.isLoaded = true;
      this.message = message;
      this.initForm();
    });
  }

  getName(nameId) {
    if (nameId === null) {
      return 'SYSTEM MESSAGE';
    }

    const { names } = this.message;

    const name = names.find(nameItem => nameItem.nameId === nameId);

    if (!name) {
      return 'EMPTY NAME';
    }

    return `${name.japanese} (${name.english})`;
  }

  toggleApprove() {
    const { proofRead, _id } = this.message;
    this.isApproving = true;
    this.dataService.updateMessage(_id, { proofRead: !proofRead }, () => {
      this.isApproving = false;
    });
  }

  checkForUpdatedLines(returnUpdated = false) {
    const { value } = this.messageForm;
    const updatedLines = [];

    let isChanged = false;

    if (this.message.chapterName !== value.chapterName) {
      isChanged = true;
    }

    forEach(this.message.lines, (line, index) => {
      if (!get(value.lines, [index, 'english'])) {
        set(value.lines, [index, 'english'], null);
      }

      if (line.text.japanese !== null && get(value.lines, [index, 'english']) !== line.text.english) {
        updatedLines.push({
          japanese: line.text.japanese,
          english: get(value.lines, [index, 'english'])
        });

        isChanged = true;
      }
    });

    return returnUpdated ? updatedLines : isChanged;
  }

  async onSubmit() {
    const { value } = this.messageForm;

    const data = {
      chapterName: undefined,
      updatedLines: this.checkForUpdatedLines(true)
    };

    if (this.message.chapterName !== value.chapterName) {
      data.chapterName = value.chapterName;
    }

    console.log(data);
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
    console.log(this.messageForm.pristine);
    this.messageForm.valueChanges.subscribe(changes => {
      this.isChanged = <boolean>this.checkForUpdatedLines();
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
