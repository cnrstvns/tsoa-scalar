import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Route,
  SuccessResponse,
} from 'tsoa';
import { Major } from './major';
import { MajorsService, CreateMajorParams } from './majors-service';

@Route('v1/majors')
export class MajorsController extends Controller {
  /** @summary Retrieve a Major */
  @Get('{majorId}')
  public async retrieve(@Path() majorId: number): Promise<Major> {
    return new MajorsService().get(majorId);
  }

  /** @summary Create a Major */
  @SuccessResponse('201', 'Created')
  @Post()
  public async create(@Body() requestBody: CreateMajorParams): Promise<void> {
    this.setStatus(201);
    new MajorsService().create(requestBody);
    return;
  }
}
