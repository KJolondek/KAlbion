import { Injectable } from '@angular/core';
import { ResourceModel } from '../models/resource-model';

@Injectable({
  providedIn: 'root'
})

export class ResourcesService {

    constructor() 
    {

    }

    public  getOres(resource: string): ResourceModel[] {
        let objArray: Array<ResourceModel> = new Array();

        for (let i = 2; i < 9; i++) {
            let newItem = new ResourceModel();
            newItem.resource = resource;
            newItem.tier = i;
            newItem.stringItem = 'T'+i+'_' + resource;
            newItem.send = true;

            objArray.push(newItem);
        }

        return objArray;
    }
}