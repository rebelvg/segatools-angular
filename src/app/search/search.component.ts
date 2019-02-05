import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { omitBy, isNil, pickBy } from 'lodash';
import { MessagesQuery } from '../shared/models/messagesQuery.models';
import { convertField } from '../shared/helpers';
import qs from 'query-string';
import { MetaService } from '../shared/services/meta.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm = new FormGroup({});
  formInit = false;
  chapters = [];
  constructor(private router: Router, private route: ActivatedRoute, private meta: MetaService) {}

  ngOnInit() {
    this.chapters = this.meta.getChapters();
    this.meta.chaptersUpdated.subscribe(chapters => (this.chapters = chapters));
    this.route.queryParams.subscribe(() => {
      const formattedParams = new MessagesQuery();
      this.initForm(formattedParams.getFormParams());
    });
  }

  getControls(type: string) {
    return (<FormArray>this.searchForm.get(type)).controls;
  }

  onAddFilterObject(type: string) {
    (<FormArray>this.searchForm.get(type)).push(
      new FormGroup({
        value: new FormControl(null, Validators.required),
        strict: new FormControl(false)
      })
    );
  }

  onRemoveFilterObject(type: string, index: number) {
    (<FormArray>this.searchForm.get(type)).removeAt(index);
  }

  isError(type) {
    return !this.searchForm.get(type).valid && this.searchForm.get(type).touched;
  }

  initForm(params) {
    const search = params.search.map(
      item =>
        new FormGroup({
          value: new FormControl(item.value, Validators.required),
          strict: new FormControl(item.strict)
        })
    );

    const names = params.names.map(
      item =>
        new FormGroup({
          value: new FormControl(item.value, Validators.required),
          strict: new FormControl(item.strict)
        })
    );

    console.log(params);

    this.searchForm = new FormGroup({
      fileName: new FormControl(params.fileName),
      chapterName: new FormControl(params.chapterName || ''),
      sortBy: new FormControl(params.sortBy || ''),
      sortOrder: new FormControl(params.sortOrder || ''),
      speakersCount: new FormControl(params.speakersCount),
      hideChanged: new FormControl(params.hideChanged),
      hideCompleted: new FormControl(params.hideCompleted),
      hideNotCompleted: new FormControl(params.hideNotCompleted),
      search: new FormArray(search),
      names: new FormArray(names)
    });
    this.formInit = true;
  }

  onSubmit() {
    if (!this.searchForm.valid) {
      return;
    }
    const values = pickBy(this.searchForm.value, data => Boolean(data));
    const queryParams = omitBy(
      {
        ...values,
        ...convertField('search', values.search),
        ...convertField('names', values.names)
      },
      isNil
    );

    console.log(queryParams);

    const url = `/messages?${qs.stringify(queryParams, { arrayFormat: 'bracket' })}`;

    this.router.navigateByUrl(url);
  }
}
