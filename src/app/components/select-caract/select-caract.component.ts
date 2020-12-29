import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { SousArticle } from 'src/app/models/sousarticle.model';

@Component({
  selector: 'app-select-caract',
  templateUrl: './select-caract.component.html',
  styleUrls: ['./select-caract.component.scss'],
})
export class SelectCaractComponent implements OnInit {
  @Input() selectedValue: string;
  @Input() caractName: string;
  @Input() values: string[];
  @Output() newSelectEvent = new EventEmitter<{
    name: string;
    value: string;
  }>();

  setNewCaract(event: Event): void {
    this.selectedValue = (event.target as HTMLInputElement).value;
    this.newSelectEvent.emit({
      name: this.caractName,
      value: this.selectedValue,
    });
  }

  constructor() {}

  ngOnInit(): void {}
}
