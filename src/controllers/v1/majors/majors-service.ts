import { Major } from './major';

export interface CreateMajorParams extends Omit<Major, 'id'> {}

export class MajorsService {
  public get(id: number): Major {
    return {
      id,
      title: 'Computing and Information Technologies',
      description: '',
      college: 'gccis',
    };
  }

  public create(params: CreateMajorParams): Major {
    return {
      id: Math.floor(Math.random() * 1000),
      ...params,
    };
  }
}
