import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NgxSmartModalService, NgxSmartModalComponent } from 'ngx-smart-modal';
import { PreviewService } from './preview.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef;
  messageListener: Subscription;
  message: string;

  constructor(
    public modalService: NgxSmartModalService,
    private previewService: PreviewService,
  ) {}

  ngOnInit() {
    this.messageListener = this.previewService.messageSet.subscribe(
      (message) => {
        this.message = message;
      },
    );
  }

  initCanvas() {
    const message = this.message || '';
    const image = new Image(1044, 220);
    image.src = '/assets/preview.png';

    const canvasContext = this.canvas.nativeElement.getContext('2d');
    const deviceHeight = window.innerHeight;
    const deviceWidth = window.innerWidth;
    const canvasWidth = Math.min(1044, deviceWidth);
    const canvasHeight = Math.min(220, deviceHeight - 40);

    this.canvas.nativeElement.width = canvasWidth;
    this.canvas.nativeElement.height = canvasHeight;
    canvasContext.lineWidth = 5;

    canvasContext.fillStyle = 'white';
    canvasContext.textAlign = 'left';
    canvasContext.lineJoin = 'round';
    canvasContext.lineJoin = 'round';
    canvasContext.font = '23.3px "Courier New"';
    const startX = 68;
    const startY = 75;
    const lines = message.replace(/<(?:.|\n)*?>/gm, '').split('\n');
    image.onload = () => {
      canvasContext.drawImage(image, 0, 0);
      let currentY = startY;
      lines.forEach((line) => {
        canvasContext.fillText(line, startX, currentY);
        currentY += 34;
      });
    };
  }
}
