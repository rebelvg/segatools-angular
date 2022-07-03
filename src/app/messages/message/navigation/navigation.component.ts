import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {
  @Input() next: string;
  @Input() isChanged: boolean;
  @Input() prev: string;
  constructor(private router: Router) {}

  ngOnInit() {}

  onNext() {
    if (!this.next) {
      return;
    }
    this.router.navigate(['messages', this.next]);
  }
  onPrev() {
    if (!this.prev) {
      return;
    }
    this.router.navigate(['messages', this.prev]);
  }
}
