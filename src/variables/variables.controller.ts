import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { map } from 'lodash';
import { VariablesService } from './variables.service';
import { CreateVariableDto, UpdateVariableDto } from './dto';
import { VariableEntity } from './entities';
import { JwtGuard } from '../auth/guard/jwt.guard';
//
@Controller('variables')
@UseGuards(JwtGuard)
@ApiBearerAuth()
@ApiTags('Variables')
export class VariablesController {
  constructor(private readonly variablesService: VariablesService) {}

  @Post()
  @ApiOkResponse({ type: VariableEntity })
  async create(@Body() createVariableDto: CreateVariableDto) {
    return new VariableEntity(
      await this.variablesService.create(createVariableDto),
    );
  }

  @Get()
  @ApiOkResponse({ type: VariableEntity, isArray: true })
  async findAll() {
    return map(
      await this.variablesService.findAll(),
      (node) => new VariableEntity(node),
    );
  }

  @Get(':id')
  @ApiOkResponse({ type: VariableEntity })
  async findOne(@Param('id') id: string) {
    return new VariableEntity(await this.variablesService.findOne(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: VariableEntity })
  async update(
    @Param('id') id: string,
    @Body() updateVariableDto: UpdateVariableDto,
  ) {
    return new VariableEntity(
      await this.variablesService.update(id, updateVariableDto),
    );
  }

  @Delete(':id')
  @ApiOkResponse({ type: VariableEntity })
  async remove(@Param('id') id: string) {
    return new VariableEntity(await this.variablesService.remove(id));
  }

  @Get('name/:name')
  @ApiOkResponse({ type: VariableEntity })
  async findOneByName(@Param('name') name: string) {
    return new VariableEntity(await this.variablesService.findOneByName(name));
  }
}
