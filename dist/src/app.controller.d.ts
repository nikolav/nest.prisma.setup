import { AppService } from './app.service';
import { StatusResponseTest } from './app-defs';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getStatus(): StatusResponseTest;
}
