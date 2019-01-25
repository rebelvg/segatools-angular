import { Component, OnInit, OnDestroy } from '@angular/core';
import { NamesService } from './names.service';
import { DataService } from '../shared/data.service';
import { Subscription } from 'rxjs';
import { Name } from '../shared/models/name.model';

@Component({
  selector: 'app-names',
  templateUrl: './names.component.html',
  styleUrls: ['./names.component.scss']
})
export class NamesComponent implements OnInit, OnDestroy {
  names: Name[];
  subscription: Subscription;
  loading: false;

  constructor(private nameService: NamesService, private dataService: DataService) {}

  ngOnInit() {
    this.dataService.fetchNames();
    this.subscription = this.nameService.listUpdated.subscribe(response => {
      this.names = response.names;
    });
  }

  onSubmit(form) {
    console.log(form.value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
