export function RequestMapping(path: string): ClassDecorator {
        return target => Reflect.defineMetadata("custom:annotation:rest-request-mapping", path, target);
}

export function Get(path: string) {
    return  (target: Object, propertyKey: string | symbol, descriptor: any) => {
        descriptor.value = processDescriptor(descriptor.value, target);
       return Reflect.defineMetadata("custom:annotation:rest-get", path, target, propertyKey);
    }
}

export function Put(path: string) {
    return  (target: Object, propertyKey: string | symbol, descriptor: any) => {
        descriptor.value = processDescriptor(descriptor.value, target);
        return Reflect.defineMetadata("custom:annotation:rest-put", path, target, propertyKey);
    }
}

export function Post(path: string) {
    return  (target: Object, propertyKey: string | symbol, descriptor: any) => {
        descriptor.value = processDescriptor(descriptor.value, target);
        return Reflect.defineMetadata("custom:annotation:rest-post", path, target, propertyKey);
    }
}

export function Delete(path: string) {
    return  (target: Object, propertyKey: string | symbol, descriptor: any) => {
        descriptor.value = processDescriptor(descriptor.value, target);
        return Reflect.defineMetadata("custom:annotation:rest-delete", path, target, propertyKey);
    }
}


function processDescriptor(descriptionRef: any, target: Object) {
    return function(...args: any[]) {
        const newArgs = args.map(linkParamDecorator(args, target));
        return descriptionRef.apply(this, newArgs)
    }
}

function linkParamDecorator(args: any[], target: object) {
    return function (arg, index) {
        const responseDecorator = target['response-decorator'];
        if (responseDecorator.findIndex(el => el.index === index) !== -1) {
            arg = args[0].res;
        }
        const paramDecorator = target['param-decorator'];
        if(paramDecorator.findIndex(el => el.index === index) !== -1) {
            arg = args[1].req.params['id']
        }
        return arg;
    }
}

function makeParamDecorator(metadataKey: string, key: any) {
    return function (target: any, propertyKey: string, index: number) {
        if (Array.isArray(target[metadataKey])) {
            target[metadataKey].push({index, key});
        }
        else {
            target[metadataKey] = [{index, key}];
        }
    }
}

export function param(key: string) {
    return makeParamDecorator('param-decorator', key);
}

export function response() {
    return makeParamDecorator('response-decorator', null);
}
