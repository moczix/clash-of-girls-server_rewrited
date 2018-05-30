Clash of girls Rewrite

this app is rewrited from first version in my github. The first version was developed for node.js and currently it cant be run on newest node.js version.
So to raise my dev skills i will rewrite the app to nowest standards.

In first version i used express.js and sequelize.js.

##In this version i will use:
- typescript
- express.js
- typeorm
- my own @decorators to write less code.

###decorators
- @RequestMapping(path: string) use on controller class, i pick the idea from java spring
- @Get(path: string), @Post(path: string), @Put(path: string), @Delete(path: string) use on method of controller
- @param(name: string), use on param of function to retrieve param from req.
- @Response(), use on param of function to retrieve res
- @RestRepository() use on repository class, pick also from java spring jpa, to mark repository class for further injection
- @InjectRepository(name: string), use on property of class to inject dependency to property. Name is class Name of repository. i use the spring way, so property must by initialized as null or whatever cuz typescript transpiler remove property from class body if they aren't init. The other way would be angular way - injection in class constructor
- @Authenticated, use on controller class which should be authenticated request

