import * as express from "express";
import * as Http from "http";
import * as Io from "socket.io";
import {
    getInjectRepository,
    getRequestMapping,
    getRestMethod,
    hasInjectRepository,
    hasRequestMapping,
    hasRestMethod
} from "./decorators/rest.decorator";
import {createConnection} from "typeorm";
import * as fs from "fs-extra";
import {AppSettings} from "./app-settings";
import {RouteContext} from "./route-context";




export class CustomRest {

    private readonly modules;
    private readonly expressApp;
    private readonly httpServer;
    private readonly settings: AppSettings;

    constructor(serverModule, settings: AppSettings) {
        this.modules = serverModule;
        this.settings = settings;
        this.expressApp = express();
        this.httpServer = new Http.Server(this.expressApp);
    }


    getRoutes(): Array<RouteContext> {
        return this.modules.controllers.filter(hasRequestMapping)
            .map(controller => ({controller, path: getRequestMapping(controller)}))
            .map(module => {
                const controller = module.controller;
                return Object.getOwnPropertyNames(controller.prototype).map((prototypeKey) => {
                    return ["get", "post", "put", "delete"].filter(requestMethod => hasRestMethod(requestMethod, controller, prototypeKey))
                        .map(requestMethod => {
                            const methodMapping = getRestMethod(requestMethod, controller, prototypeKey);
                            return {
                                requestMethod,
                                requestPath: module.path + methodMapping,
                                controller,
                                controllerMethod: prototypeKey
                            };
                        })

                });
            })
            .reduce((a, b) => a.concat(b))
            .reduce((a, b) => a.concat(b))
    }

    getMiddlewares(routes: Array<RouteContext>) {
        return routes.map(route => this.modules.middlewares.map(middleware => ({route, middleware})))
            .reduce((a, b) => a.concat(b));
    }

    injectRepos(controller){
        Object.getOwnPropertyNames(controller).filter(prototypeKey => hasInjectRepository(controller, prototypeKey))
            .forEach(prototypeKey => {
                const repoName = getInjectRepository(controller, prototypeKey);
                const foundedRepo = this.modules.repositories.find(repo => repo.name === repoName);
                if (foundedRepo) {
                    controller[prototypeKey] = new foundedRepo();
                }else {
                    console.warn(`Repo ${repoName} Not found!`)
                }
            });
    }

    async connectDb() {
        const configDb = await fs.readJson('./ormconfig.json');
        if (!configDb.entities) {
            configDb.entities = this.modules.models;
        }
        return await createConnection(configDb);
    }

    async runHttp() {
        await this.connectDb();

        const routes = this.getRoutes();


        this.getMiddlewares(routes).forEach(res => {
            const middleware = new res.middleware();
            this.expressApp[res.route.requestMethod](res.route.requestPath, middleware.validate(res.route).bind(middleware));
        });

        routes.forEach(route => {
            console.log(`registered api @${route.requestMethod.toUpperCase()}: ${route.requestPath} -> ${route.controller.name}.${route.controllerMethod}()`)
            const clazz = new (route.controller);
            this.injectRepos(clazz);
            this.expressApp[route.requestMethod](route.requestPath, clazz[route.controllerMethod].bind(clazz));
        })

        this.httpServer.listen(this.settings.port, () => {
            console.log(`listening on *:${this.settings.port}`);
        });

    }

    socketServer() {
        const io = Io(this.httpServer);
        io.on('connection', (socket) => {
            console.log('a user connected');
        });
    }

}