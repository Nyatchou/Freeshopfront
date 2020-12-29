import { Component, OnInit } from '@angular/core';
import { CategHome } from 'src/app/models/categ-home.model';
import { DatasFromBackendService } from 'src/app/services/datas-from-backend.service';

@Component({
  selector: 'app-tabshome',
  templateUrl: './tabshome.component.html',
  styleUrls: ['./tabshome.component.scss']
})
export class TabshomeComponent implements OnInit {


  categoriesToHome: Array<CategHome>;
  datas_loaded = false;
  constructor(private datasFromBackendService : DatasFromBackendService) { }

  ngOnInit(): void {
    this.datasFromBackendService.getCategoriesHomeList().then(
      data => {
        this.categoriesToHome = data;
        this.datas_loaded = true;
      }
    )
  }

}
