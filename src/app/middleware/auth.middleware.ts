
import {hasAuthenticated} from "../../custom-rest/decorators/rest.decorator";
import {RouteContext} from "../../custom-rest/route-context";


export class AuthMiddleware {

    validate(context: RouteContext) {
        return (res, req, next) => {
            if (!hasAuthenticated(context.controller)) {
                next();
            }

        }
    }
}