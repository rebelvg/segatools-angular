import { Component, OnInit, OnDestroy } from '@angular/core';
import { NamesService } from './names.service';
import { DataService } from '../shared/services/data.service';
import { Subscription } from 'rxjs';
import { Name } from '../shared/models/name.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { NamesQuery } from '../shared/models/namesQuery.model';
import { isNil, omitBy } from 'lodash';
@Component({
  selector: 'app-names',
  templateUrl: './names.component.html',
  styleUrls: ['./names.component.scss']
})
export class NamesComponent implements OnInit, OnDestroy {
  names = <Name[]>[];
  subscription: Subscription;
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
    this.route.queryParams.subscribe(({ search = null, hideCompleted = false }) => {
      this.fetchData({ search, hideCompleted });
    });

    this.subscription = this.nameService.listUpdated.subscribe(response => {
      this.loading = false;
      this.names = response.names;
    });
  }

  fetchData(params: NamesQuery) {
    const formattedParams = omitBy(params, isNil);
    this.dataService.fetchNames(formattedParams);
    this.initForm(formattedParams);
  }

  initForm(params) {
    const hideCompletedParam = !isNil(params.hideCompleted) && params.hideCompleted === 'true' ? true : false;
    const isSearchSet = params.search ? hideCompletedParam : false;
    const hideCompleted = !isNil(params.hideCompleted) ? hideCompletedParam : isSearchSet;

    this.searchForm = new FormGroup({
      search: new FormControl(params.search || ''),
      hideCompleted: new FormControl(hideCompleted)
    });
  }

  onSearch() {
    const queryParams = omitBy(this.searchForm.value, isNil);
    if (!queryParams.search) {
      queryParams.search = null;
    }

    this.router.navigate(['/names'], { queryParams });
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
