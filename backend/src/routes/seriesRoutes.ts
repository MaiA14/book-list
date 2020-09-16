import { Router } from 'express';
import seriesController from '../controllers/seriesController';
import checkToken from "../token_validition";

class seriesRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/:id', checkToken, seriesController.getList);
        this.router.get('/:id/:filter', checkToken, seriesController.getByFilter);
        this.router.post('/', checkToken, seriesController.create);
        this.router.put('/:id', checkToken, seriesController.update);
        this.router.delete('/:id', checkToken, seriesController.delete);
    }
}

export default new seriesRoutes().router;

