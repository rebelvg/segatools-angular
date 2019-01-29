import { Component, OnInit } from '@angular/core';
import { MetaService } from './shared/meta.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Segatools-react';
  constructor(private meta: MetaService) {}

  ngOnInit() {
    this.meta.fetchChapters();
  }
}
