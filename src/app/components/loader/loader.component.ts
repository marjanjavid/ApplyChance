import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'obc-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() show : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
