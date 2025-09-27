import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-skeleton',
  templateUrl: './loading-skeleton.component.html',
  styleUrls: ['./loading-skeleton.component.scss'],
})
export class LoadingSkeletonComponent {
  @Input() type: 'product' | 'list' | 'text' = 'product';
  @Input() count: number = 1;
  @Input() height: string = '200px';
  @Input() width: string = '100%';

  getSkeletonArray(): number[] {
    return Array(this.count).fill(0);
  }
}