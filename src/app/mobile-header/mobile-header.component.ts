import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss']
})
export class MobileHeaderComponent implements OnInit {
  isOpen = false;
  constructor() {}

  onToggleOpen() {
    this.isOpen = !this.isOpen;
  }

  ngOnInit() {}
}
