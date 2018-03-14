import {get,param} from '@loopback/rest';
import { Units} from '../models';
import {repository} from '@loopback/repository';
import {UnitsRepository} from '../repositories/index';

export class UnitsController {
  constructor(@repository('units') protected unitsRepo: UnitsRepository) {}
 
  @get('/units')
  async findUnits(): Promise<Units[]> {
    return await this.unitsRepo.find();
  }

  @get('/units/{id}')
  @param.path.number('id')
  @param.query.boolean('items')
  async findUnitsById(id: number, items?: boolean): Promise<Units> {
    return await this.unitsRepo.findById(id);
  }

 
}
