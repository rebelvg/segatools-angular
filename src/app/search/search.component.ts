import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { omitBy, isNil, forOwn, isArray } from 'lodash';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm = new FormGroup({});
  constructor(private router: Router) {}

  ngOnInit() {
    this.initForm();
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

  initForm() {
    this.searchForm = new FormGroup({
      fileName: new FormControl(null),
      chapterName: new FormControl(''),
      speakerCount: new FormControl(null),
      hideChanged: new FormControl(false),
      hideCompleted: new FormControl(false),
      hideNotCompleted: new FormControl(false),
      // percentDone: new FormControl(null, [Validators.max(100), Validators.min(0)]),
      search: new FormArray([]),
      names: new FormArray([])
    });
  }

  onSubmit() {
    if (!this.searchForm.valid) {
      return;
    }

    const values = omitBy(this.searchForm.value, isNil);

    const queryParams = {};

    forOwn(values, (value, key) => {
      if (isArray(value) && value.length) {
        const strict = value.filter(item => !!item.strict).map(item => item.value);
        if (strict.length) {
          queryParams[`${key}Strict`] = JSON.stringify(strict);
        }
        const notStrict = value.filter(item => !item.strict).map(item => item.value);

        if (notStrict.length) {
          queryParams[`${key}`] = JSON.stringify(notStrict);
        }
      }

      if (!!value && !isArray(value)) {
        queryParams[key] = value;
      }
    });

    this.router.navigate(['/messages'], { queryParams });
  }
}
