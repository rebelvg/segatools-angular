import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { omitBy, isNil, forOwn, isArray } from 'lodash';
import { MessagesQuery } from '../shared/models/messagesQuery.models';
import { convertField } from '../shared/helpers';
import qs from 'query-string';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm = new FormGroup({});
  formInit = false;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
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

    this.searchForm = new FormGroup({
      fileName: new FormControl(params.fileName),
      chapterName: new FormControl(params.chapterName),
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

    const values = this.searchForm.value;

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
