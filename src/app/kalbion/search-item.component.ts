import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemResponseModel } from '../models/item-response-model';
import { ResourceModel } from '../models/resource-model';
import { DataService } from '../services/data-service';
import { ResourcesService } from '../services/resources-service';
import { ItemModel } from '../models/item.model';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements OnInit {

  public isBusy: boolean = false;

  public ores: Array<ResourceModel> = [];
  public woods: Array<ResourceModel> = [];
  public fibers: Array<ResourceModel> = [];
  public rocks: Array<ResourceModel> = [];
  public hides: Array<ResourceModel> = [];

  public clothes: Array<ResourceModel> = [];
  public leathers: Array<ResourceModel> = [];
  public metalBars: Array<ResourceModel> = [];
  public plankes: Array<ResourceModel> = [];
  public stoneBlocks: Array<ResourceModel> = [];

  public itemGroupedByCategory: Array<ResourceModel> = [];

  public searchResult: ItemResponseModel[] = [];

  public stringItems: string = '';

  public currentTimeServer: Date;

  public tax: number = 0.06;

  public orderByProfit: boolean = false;

  public searchInput: string = '';
  public allItems:  ItemModel[]  = [];
  public foundResults: ItemModel[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private resourcesService: ResourcesService,
    private httpClient: HttpClient
  ) 
  {
    this.httpClient.get<ItemModel[]>("assets/items.json").subscribe(
      result => {
        this.allItems = result;
      }
    )
    
    const dateNow = new Date();
    this.currentTimeServer = new Date(dateNow.getUTCFullYear(),
                                      dateNow.getUTCMonth(),
                                      dateNow.getUTCDate(),
                                      dateNow.getUTCHours(),
                                      dateNow.getUTCMinutes(),
                                      dateNow.getUTCSeconds()
                                      );

  }

  ngOnInit() {

  }

    public goTo(url: string): void{
      this.router.navigate([url], { relativeTo: this.route });
    }

    public search(): void{
      this.isBusy = true;

      this.stringItems = '';
      this.itemGroupedByCategory = [];
      
      this.foundResults = this.allItems
      .filter(x => x.LocalizedNames != null && (x.LocalizedNames['PT-BR'].toLowerCase().includes(this.searchInput.toLowerCase()) || x.LocalizedNames['EN-US'].toLowerCase().includes(this.searchInput.toLowerCase())));

      this.foundResults.forEach(f => {
        if(!this.itemGroupedByCategory.find(x => x.stringItem == f.UniqueName)){
          let newItemCategory = new ResourceModel();
          newItemCategory.stringItem = f.UniqueName;
          this.itemGroupedByCategory.push(newItemCategory);
        }
      });


      this.stringItems += this.foundResults.map(x => x.UniqueName).join(',');

      this.dataService.search(this.stringItems).subscribe(
        result => {
          this.searchResult = result;
          
          this.searchResult.forEach(x => {
            x.item_description = this.allItems.find(a => a.UniqueName == x.item_id).LocalizedNames['PT-BR']
          });
          
          this.fillMinMaxProperties();
          this.isBusy = false;
        }, error => {
          this.isBusy = false;
        }
      )

    }

    public fillMinMaxProperties(): void{
      this.searchResult.map(x => x.is_min = x.is_max = false);

      this.itemGroupedByCategory.forEach(resource => {
        let resources = this.searchResult.filter(x => x.item_id == resource.stringItem && x.sell_price_min > 0);

        let min = Math.min.apply(null, resources.map(x => x.sell_price_min));
        let max = Math.max.apply(null, resources.map(x => x.sell_price_min));

        resources.forEach(y => {
          y.max_profit = Math.floor((max - y.sell_price_min) - ((max - y.sell_price_min)*this.tax));

          if(y.sell_price_min == min){
            y.is_min = true;
          }

          if(y.sell_price_min == max){
            y.is_max = true;
          }
        })
      })

      this.itemGroupedByCategory.forEach(x => {
        let resources = this.searchResult.filter(f => f.item_id == x.stringItem && f.sell_price_min > 0);
        x.profit = Math.max.apply(null, resources.map(z => z.max_profit));
      });

      this.orderBy(4);
    }

    public setResourcesState(array: ResourceModel[]): void{
      if(array.find(x => x.send)){
        array.map(x => x.send = false);
      } else {
        array.map(x => x.send = true);
      }
    }

    public orderBy(status: number){
      switch(status){
        case 1: //tier asc
          this.itemGroupedByCategory.sort((a, b) => ( (a.tier < b.tier) ? -1 : 1));
          break;
        case 2: //tier desc
          this.itemGroupedByCategory.sort((a, b) => ( (a.tier > b.tier) ? -1 : 1));
          break;
        case 3: //max profit asc
          this.itemGroupedByCategory.sort((a, b) => ( (a.profit < b.profit) ? -1 : 1));
          break;
        case 4: //max profit desc
          this.itemGroupedByCategory.sort((a, b) => ( (a.profit > b.profit) ? -1 : 1));
          break;
      }
    }
  
    public eventHandler(event) {
      if (event.keyCode == 13) {
          this.search();
      }
  }

}

