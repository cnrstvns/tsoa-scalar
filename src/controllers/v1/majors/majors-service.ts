import { Major } from './major';

const defaultMajor = {
  name: 'Computing and Information Technologies',
  description:
    "RIT's computer information technology degree embodies a hands-on approach to technology. Learn to design, implement, and manage complex IT systems by approaching complex problems and creating custom solutions that help users meet their goals. You will play an integral role in any modern organization, often working behind the scenes to deploy technology where it's needed most.",
  college: 'gccis',
  studentCount: 123,
};

export interface CreateMajorParams extends Omit<Major, 'id'> {}
export interface UpdateMajorParams extends Partial<Omit<Major, 'id'>> {}

export class MajorsService {
  public create(params: CreateMajorParams): Major {
    return {
      id: 'new_id',
      ...params,
    };
  }

  public retrieve(id: string): Major {
    return {
      id,
      ...defaultMajor,
    };
  }

  public update(id: string, params: UpdateMajorParams): Major {
    return {
      id: id,
      ...defaultMajor,
      ...params,
    };
  }
}
