import { Injectable } from '@angular/core';
import {BaseService} from '../../shared/services/base.service';
import {Support} from '../model/support.entity';

@Injectable({
  providedIn: 'root'
})
export class SupportService extends BaseService<Support>{


  constructor() {
    super();
    this.resourceEndPoint='/support';
  }
}
