import 'reflect-metadata';
import * as express from "express";
import * as Http from "http";
import * as Io from "socket.io";
import {serverModule} from "./server.module";
import * as core from "express-serve-static-core";


class App {
    main() {
        const app = express();
        const http = new Http.Server(app);
        const io = Io(http);


        serverModule.controllers.filter(controller => Reflect.hasMetadata("custom:annotation:rest-request-mapping", controller))
            .map(controller => {
                return {controller, path: Reflect.getMetadata("custom:annotation:rest-request-mapping", controller)}
            })
            .forEach(module => {
                const controller = module.controller;
                const clazz = new controller();
                Object.getOwnPropertyNames(controller.prototype).forEach((prototypeKey) => {
                    ["get", "post", "put", "delete"].forEach(method => {
                        let methodMapping = Reflect.getMetadata(`custom:annotation:rest-${method}`, clazz, prototypeKey);
                        if (methodMapping) {
                            const path = module.path + methodMapping;
                            console.log(`registered api @${method.toUpperCase()}: ${path} -> ${controller.name}.${prototypeKey}()`)
                            app[method](path, clazz[prototypeKey]);
                        }
                    })
                });
            });

        io.on('connection', (socket) => {
            console.log('a user connected');
        });

        http.listen(3000, () => {
            console.log('listening on *:3000');
        });

    }

}


const app = new App();
app.main();

