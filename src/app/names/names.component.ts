import { Component, OnInit, OnDestroy } from '@angular/core';
import { NamesService } from './names.service';
import { DataService } from '../shared/services/data.service';
import { Subscription } from 'rxjs';
import { Name } from '../shared/models/name.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { NamesQuery } from '../shared/models/namesQuery.model';
import { isNil, pickBy, isEmpty } from 'lodash';
import qs from 'query-string';
@Component({
  selector: 'app-names',
  templateUrl: './names.component.html',
  styleUrls: ['./names.component.scss']
})
export class NamesComponent implements OnInit, OnDestroy {
  names = <Name[]>[];
  subscription: Subscription;
  query = new NamesQuery();
  page = 1;
  searchForm = new FormGroup({});
  loading = true;

  constructor(
    private nameService: NamesService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(() => {
      this.query = new NamesQuery();
      this.fetchData();
    });

    this.subscription = this.nameService.listUpdated.subscribe(response => {
      this.loading = false;
      this.names = response.names;
    });
  }

  fetchData() {
    this.dataService.fetchNames(this.query.params);
    this.initForm(this.query.params);
  }

  initForm(params) {
    this.searchForm = new FormGroup({
      search: new FormControl(params.search || ''),
      hideCompleted: new FormControl(params.hideCompleted || false),
      hideNotCompleted: new FormControl(params.hideNotCompleted || false),
      sortBy: new FormControl(params.sortBy || ''),
      sortOrder: new FormControl(params.sortOrder || '')
    });
  }

  onSearch() {
    const { value } = this.searchForm;
    const queryParams = qs.stringify(pickBy(value, data => Boolean(data)));
    this.router.navigateByUrl(`/names?${queryParams}`);
  }

  onSubmit(form) {
    const values = form.value;
    const data = { english: values.english };
    this.dataService.updateName(values._id, data);
  }

  onPageChange(page) {
    this.page = page;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
