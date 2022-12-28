import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../item/item';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [trigger('slideFade', [state('void', style({ opacity: 0 })), transition('void <=> *', [animate('1s')])])]
})
export class SliderComponent implements OnInit {
  @Input() items: Item[] = [];
  @Input() isBanner: Boolean = false;

  curentSlideIndex: number = 0;

  ngOnInit(): void {
    if (!this.isBanner) {
      setInterval(() => {
        this.curentSlideIndex = ++this.curentSlideIndex % this.items.length;
      }, 5000);
    }
  }
}
