import { VariablesService } from './variables.service';
import { CreateVariableDto, UpdateVariableDto } from './dto';
import { VariableEntity } from './entities';
export declare class VariablesController {
    private readonly variablesService;
    constructor(variablesService: VariablesService);
    create(createVariableDto: CreateVariableDto): Promise<VariableEntity>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<VariableEntity>;
    update(id: string, updateVariableDto: UpdateVariableDto): Promise<VariableEntity>;
    remove(id: string): Promise<VariableEntity>;
    findOneByName(name: string): Promise<VariableEntity>;
}
