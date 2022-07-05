import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemResponseModel } from '../models/item-response-model';
import { ResourceModel } from '../models/resource-model';
import { DataService } from '../services/data-service';
import { ResourcesService } from '../services/resources-service';
import * as _ from 'lodash';

@Component({
  templateUrl: './sell-resources.component.html',
  styleUrls: ['./sell-resources.component.scss']
})
export class SellResourcesComponent implements OnInit {

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

  public allResources: Array<ResourceModel> = [];

  public activeResources: Array<ResourceModel> = [];
  public searchResult: ItemResponseModel[] = [];

  public stringItems: string = '';

  public currentTimeServer: Date;

  public tax: number = 0.06;

  public orderByProfit: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private resourcesService: ResourcesService
  ) 
  {
    this.getResourcesByService();
    
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
    this.allResources = this.ores
    .concat(this.woods)
    .concat(this.rocks)
    .concat(this.fibers)
    .concat(this.hides)
    .concat(this.clothes)
    .concat(this.leathers)
    .concat(this.metalBars)
    .concat(this.plankes)
    .concat(this.stoneBlocks);

    this.activeResources = this.allResources.filter(x => x.send);
  }

  public goTo(url: string): void{
    this.router.navigate([url], { relativeTo: this.route });
  }

  public getResourcesByService(): void{
    this.ores = this.resourcesService.getOres('ORE');
    this.woods = this.resourcesService.getOres('WOOD');
    this.rocks = this.resourcesService.getOres('ROCK');
    this.fibers = this.resourcesService.getOres('FIBER');  
    this.hides = this.resourcesService.getOres('HIDE');  
    this.clothes = this.resourcesService.getOres('CLOTH');  
    this.leathers = this.resourcesService.getOres('LEATHER');  
    this.metalBars = this.resourcesService.getOres('METALBAR');  
    this.plankes = this.resourcesService.getOres('PLANK');  
    this.stoneBlocks = this.resourcesService.getOres('STONEBLOCK');  
  }

  public search(): void{
    this.stringItems = '';

    this.stringItems += this.allResources.filter(x => x.send).map(x => x.stringItem).join(',');

    this.isBusy = true;
    this.dataService.search(this.stringItems).subscribe(
      result => {
        this.searchResult = result;

        this.fillMinMaxProperties();
        this.isBusy = false;
      }, error => {
        this.isBusy = false;
      }
    )

  }

  public fillMinMaxProperties(): void{
    this.searchResult.map(x => x.is_min = x.is_max = false);

    this.allResources.filter(x => x.send).forEach(resource => {
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

    this.activeResources = this.allResources.filter(x => x.send);

    this.activeResources.forEach(x => {
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
        this.activeResources.sort((a, b) => ( (a.tier < b.tier) ? -1 : 1));
        break;
      case 2: //tier desc
        this.activeResources.sort((a, b) => ( (a.tier > b.tier) ? -1 : 1));
        break;
      case 3: //max profit asc
        this.activeResources.sort((a, b) => ( (a.profit < b.profit) ? -1 : 1));
        break;
      case 4: //max profit desc
        this.activeResources.sort((a, b) => ( (a.profit > b.profit) ? -1 : 1));
        break;
    }
  }
  
  public callService(){
    // this.dataService.sendGetRequest()
    // .subscribe((data: ItemResponseModel[])=>{
    //   console.log(data);
    // })  
  }

}

