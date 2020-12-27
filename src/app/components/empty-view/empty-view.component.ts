import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-view',
  templateUrl: './empty-view.component.html',
  styleUrls: ['./empty-view.component.css']
})
export class EmptyViewComponent implements OnInit {

  @Input()
  message: string;
  constructor() { }

  ngOnInit(): void {
  }

}
