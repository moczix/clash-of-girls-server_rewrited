export function RequestMapping(path: string): ClassDecorator {
        return target => Reflect.defineMetadata("custom:annotation:rest-request-mapping", path, target);
}

export function hasRequestMapping(object): boolean {// if class has @RequestMapping
    return Reflect.hasMetadata("custom:annotation:rest-request-mapping", object)
}
export function getRequestMapping(object): string {// return path from @RequestMapping
    return Reflect.getMetadata("custom:annotation:rest-request-mapping", object)
}

export function Authenticated(): ClassDecorator {
    return target => Reflect.defineMetadata("custom:annotation:rest-authenticated", null,  target);
}

export function hasAuthenticated(object): boolean {//if class has @Authenticated
    return Reflect.hasMetadata("custom:annotation:rest-authenticated", object)
}

export function hasRestMethod(method: string, object, prototypeKey: string) { //if class has request method [get, post,delete, put]
    return Reflect.hasMetadata(`custom:annotation:rest-${method}`, object.prototype, prototypeKey)
}

export function getRestMethod(method: string, object, prototypeKey: string): string { //get path from RestMethod
    return Reflect.getMetadata(`custom:annotation:rest-${method}`, object.prototype, prototypeKey)
}

export function Get(path: string) {
    return (target: Object, propertyKey: string, descriptor: any) => {
        descriptor.value = processDescriptor(descriptor.value, target, propertyKey);//method param dependency injection
       return Reflect.defineMetadata("custom:annotation:rest-get", path, target, propertyKey);
    }
}

export function Put(path: string) {
    return (target: Object, propertyKey: string, descriptor: any) => {
        descriptor.value = processDescriptor(descriptor.value, target, propertyKey); //method param dependency injection
        return Reflect.defineMetadata("custom:annotation:rest-put", path, target, propertyKey);
    }
}

export function Post(path: string) {
    return (target: Object, propertyKey: string, descriptor: any) => {
        descriptor.value = processDescriptor(descriptor.value, target, propertyKey); //method param dependency injection
        return Reflect.defineMetadata("custom:annotation:rest-post", path, target, propertyKey);
    }
}

export function Delete(path: string) {
    return (target: Object, propertyKey: string, descriptor: any) => {
        descriptor.value = processDescriptor(descriptor.value, target, propertyKey); //method param dependency injection
        return Reflect.defineMetadata("custom:annotation:rest-delete", path, target, propertyKey);
    }
}


function processDescriptor(descriptionRef: any, target: Object, propertyKey: string) { // processing descriptor by setting new args, retrieved from higher order func linkParamDecorator
    return function(...args: any[]) {
        const newArgs = args.map(linkParamDecorator(args, target, propertyKey));
        return descriptionRef.apply(this, newArgs)
    }
}

function linkParamDecorator(args: any[], target: object, propertyKey: string) {// link params by decorators
    return function (arg, index) {
        let paramData;
        const responseDecorator = target['response-decorator'];
        if (responseDecorator && responseDecorator.findIndex(el => el.index === index && el.propertyKey === propertyKey) !== -1) {
            arg = args[1];
        }
        const bodyDecorator = target['body-decorator'];
        if (bodyDecorator && bodyDecorator.findIndex(el => el.index === index && el.propertyKey === propertyKey) !== -1) {
            arg = args[0].body;
        }
        const paramDecorator = target['param-decorator'];
        if (paramDecorator && typeof (paramData = paramDecorator.find(el => el.index === index && el.propertyKey === propertyKey)) !== "undefined") {
            arg = args[0].params[paramData.key]
        }
        const headerDecorator = target['header-decorator'];
        if (headerDecorator && typeof (paramData = headerDecorator.find(el => el.index === index && el.propertyKey === propertyKey)) !== "undefined") {
            arg = args[0].get(paramData.key)
        }
        return arg;
    }
}

function makeParamDecorator(metadataKey: string, key: any) {
    return function (target: any, propertyKey: string, index: number) {
        if (Array.isArray(target[metadataKey])) {
            target[metadataKey].push({index, key, propertyKey});
        }
        else {
            target[metadataKey] = [{index, key, propertyKey}];
        }
    }
}

export function param(key: string) {
    return makeParamDecorator('param-decorator', key);
}

export function header(key: string) {
    return makeParamDecorator('header-decorator', key);
}

export function response() {
    return makeParamDecorator('response-decorator', null);
}

export function body() {
    return makeParamDecorator('body-decorator', null);
}



export function RestRepository(): ClassDecorator {
    return target => Reflect.defineMetadata("custom:annotation:rest-repository", null, target);
}

export function InjectRepository(name: string) {
    return (target, key: string) => {
        return Reflect.defineMetadata("custom:annotation:rest-inject-repository", name, target, key);
    }
}

export function hasInjectRepository(object, key): boolean {
    return Reflect.hasMetadata(`custom:annotation:rest-inject-repository`, object, key)
}

export function getInjectRepository(object, key): string {
    return Reflect.getMetadata(`custom:annotation:rest-inject-repository`, object, key)
}