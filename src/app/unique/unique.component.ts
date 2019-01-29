import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { omit } from 'lodash';

import { DataService } from '../shared/data.service';
import { UniqueService } from './unique.service';
import { Pagination } from '../shared/models/pagination.model';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { PreviewService } from '../messages/message/preview/preview.service';

@Component({
  selector: 'app-unique',
  templateUrl: './unique.component.html',
  styleUrls: ['./unique.component.scss']
})
export class UniqueComponent implements OnInit, OnDestroy, AfterViewInit {
  linesSubscription: Subscription;
  paginator = new Pagination(1, 20);
  previewMessage = '';
  init = false;
  loading = false;
  lines = [];

  constructor(
    private uniqueService: UniqueService,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private cdRef: ChangeDetectorRef,
    public modalService: NgxSmartModalService,
    private previewService: PreviewService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.paginator.setPagination(params);
      this.fetchMessages();
    });
    this.linesSubscription = this.uniqueService.uniqueLinesUpdated.subscribe(response => {
      setTimeout(() => {
        this.init = true;
        this.lines = response.lines;
        this.loading = false;
        this.paginator.setPagination(omit(response, 'messages'));
      }, 0);
    });
  }

  onSubmit(form) {
    return;
  }

  onPreview(form) {
    if (!form.value.english) {
      return;
    }
    this.previewMessage = form.value.english;
    this.previewService.setMessage(this.previewMessage);
    this.modalService.open('myModal');
  }

  fetchMessages() {
    const params = this.paginator.getQuery();
    this.dataService.fetchUniqueLines(params);
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    this.linesSubscription.unsubscribe();
  }

  onPageChange(page) {
    this.loading = true;
    this.router.navigate(['/unique'], {
      queryParams: { ...this.paginator.getQuery(), page: page }
    });
  }
}
