import { Injectable } from '@angular/core';
import {B} from '@angular/cdk/keycodes';
import {Client} from '../model/client.entity';
import {BaseService} from '../../shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends BaseService<Client>{

  constructor() {
    super();
    this.resourceEndPoint = '/clients';
  }
}
