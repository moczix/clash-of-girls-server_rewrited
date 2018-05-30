import 'reflect-metadata';
import {serverModule} from "./server.module";
import {CustomRest} from "./custom-rest/custom-rest";


const app = new CustomRest(serverModule,  {
    port: 3000
});
app.jsonBodyParse()
app.enableCors();
app.runHttp();

