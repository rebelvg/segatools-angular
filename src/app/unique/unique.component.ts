import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { pickBy } from 'lodash';
import qs from 'query-string';

import { DataService } from '../shared/services/data.service';
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
  search = '';
  replace = '';
  isEnglish = false;
  init = false;
  loading = true;
  modalOpenned = false;
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
      this.isEnglish = location.pathname.includes('unique/english');
      console.log(params);
      this.search = params.search;
      this.paginator.setPagination();
      this.fetchMessages();
      console.log('happening');
    });

    this.dataService.refetcher.subscribe(() => {
      this.search = this.replace;
      this.replace = '';
      this.fetchMessages();
    });

    this.linesSubscription = this.uniqueService.uniqueLinesUpdated.subscribe(response => {
      setTimeout(() => {
        this.init = true;
        this.lines = response.lines;
        this.loading = false;

        this.paginator.setPaginatorData(response);
      }, 0);
    });
  }

  onSubmit(form) {
    const { value } = form;
    const data = { updatedLines: [{ japanese: value.japanese, english: value.english || null }] };
    this.dataService.updateUniqueLine(data);
    return;
  }

  onReplace(form) {
    this.replace = form.value.replace;
    this.toggleModal(true);
    return;
  }

  toggleModal(isOpen) {
    this.modalOpenned = isOpen;
  }

  onModalConfirm() {
    const data = {
      find: this.search,
      replace: this.replace
    };

    this.toggleModal(false);
    this.dataService.replaceLine(data, this.isEnglish);
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
    const params = pickBy({ ...this.paginator.getQuery(), search: this.search }, v => !!v);
    if (!this.isEnglish) {
      this.dataService.fetchUniqueLines(params);
    } else {
      this.dataService.fetchEnglishLines(params);
    }
  }

  onSearch(form) {
    const {
      value: { search }
    } = form;
    this.search = search;
    this.navigate();
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    this.linesSubscription.unsubscribe();
  }

  navigate() {
    const params = pickBy({ ...this.paginator.getQuery(), search: this.search }, v => !!v);
    const queryParams = qs.stringify(params);
    const url = this.isEnglish ? '/unique/english' : '/unique/japanese';

    this.router.navigateByUrl(`${url}?${queryParams}`);
    this.fetchMessages();
  }

  onPageChange(page) {
    this.loading = true;
    console.log(page);
    this.paginator.setPage(page);
    this.navigate();
  }
}
