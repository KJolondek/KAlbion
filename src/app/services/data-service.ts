import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemResponseModel } from '../models/item-response-model';
import { LocationEnum } from '../models/enums/location-enum';
import { ResourceModel } from '../models/resource-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

    //private REST_API_SERVER = "https://www.albion-online-data.com/api/v2/stats/prices/T4_BAG,T5_BAG?locations=Caerleon,Bridgewatch&qualities=1";
    
    private ALBION_DATA_API_SERVER = "https://www.albion-online-data.com/api/v2/stats/prices/";
    private allLocations: string;

    constructor(private httpClient: HttpClient) 
    {
        const keys = Object.keys(LocationEnum).filter(k => typeof LocationEnum[k as any] === "number");
        const values = keys.map(k => LocationEnum[k as any]); 
        this.allLocations = values.join(',');
    }

    public getAllData(itemsString: string, locations: string, qualities: string = '1'): void {
        this.httpClient.get<ItemResponseModel>(this.ALBION_DATA_API_SERVER + itemsString + '?locations=' + locations + '&qualities=' + qualities);
    }

    public sendGetRequest(){
        return this.httpClient.get<ItemResponseModel[]>(this.ALBION_DATA_API_SERVER + 'T4_BAG' + '?locations=' + this.allLocations+ '&qualities=1');
    }

    public search(itemsString: string, locations: string = this.allLocations, qualities: string = '1'): Observable<ItemResponseModel[]> {
        return this.httpClient.get<ItemResponseModel[]>(this.ALBION_DATA_API_SERVER + itemsString + '?locations=' + locations + '&qualities=' + qualities);
    }

    // public sendGetRequest(){
    //     return this.httpClient.get<ItemResponseModel[]>(this.REST_API_SERVER);
    // }
}