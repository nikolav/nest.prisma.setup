import { Injectable } from '@nestjs/common';
import { CreateVariableDto } from './dto/create-variable.dto';
import { UpdateVariableDto } from './dto/update-variable.dto';
import { PrismaService } from '../prisma/prisma.service';
//
@Injectable()
export class VariablesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createVariableDto: CreateVariableDto) {
    return this.prisma.main.create({ data: createVariableDto });
  }

  findAll() {
    return this.prisma.main.findMany({});
  }

  findOne(id: string) {
    return this.prisma.main.findUnique({ where: { id } });
  }

  update(id: string, updateVariableDto: UpdateVariableDto) {
    return this.prisma.main.update({
      where: { id },
      data: updateVariableDto,
    });
  }

  remove(id: string) {
    return this.prisma.main.delete({ where: { id } });
  }

  findOneByName(name: string) {
    return this.prisma.main.findUnique({ where: { name } });
  }
}
