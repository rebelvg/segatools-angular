import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-infobox',
  templateUrl: './infobox.component.html',
  styleUrls: ['./infobox.component.scss']
})
export class InfoboxComponent implements OnInit {
  @Input() label: string;
  @Input() showLabel = true;
  @Input() value: any;
  @Input() number: any;
  @Input() maxValue: string;
  constructor() {}

  ngOnInit() {}
}
