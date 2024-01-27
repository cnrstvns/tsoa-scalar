import {
  Body,
  Controller,
  Get,
  Patch,
  Path,
  Post,
  Route,
  SuccessResponse,
} from 'tsoa';
import { Major } from './major';
import {
  MajorsService,
  CreateMajorParams,
  UpdateMajorParams,
} from './majors-service';

@Route('v1/majors')
export class MajorsController extends Controller {
  /** @summary Create a Major */
  @SuccessResponse('201', 'Created')
  @Post()
  public async create(@Body() requestBody: CreateMajorParams): Promise<Major> {
    this.setStatus(201);
    return new MajorsService().create(requestBody);
  }

  /** @summary Retrieve a Major */
  @Get('{majorId}')
  public async retrieve(@Path() majorId: string): Promise<Major> {
    return new MajorsService().retrieve(majorId);
  }

  /** @summary Update a major */
  @Patch('{majorId}')
  public async update(
    @Path() majorId: string,
    @Body() requestBody: UpdateMajorParams,
  ): Promise<Major> {
    return new MajorsService().update(majorId, requestBody);
  }
}
