import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  imagesUrls = new Array<String>() 
  constructor() { }

  ngOnInit(): void {
    let initurl = '/assets/imgs/banner'
    for (let i=1; i<6; i++){
      this.imagesUrls.push(initurl+i+'.jpg')
    }
  }

}
