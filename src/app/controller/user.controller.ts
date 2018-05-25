import {RequestMapping, Get, Post, response, param} from '../../util/decorators/rest.decorator';

@RequestMapping("/")
export class UserController {

    @Get("test")
    test(req, res) {
        console.log("test");
        res.send('test function')
    }

    @Get("test2/:id")
    test2(@param('id') id: number, @response() res) {
        console.log(id);
        const object = {test: 1, gowno: "dwa"}
        res.send(object)
    }

    @Post("gowno")
    testPost(req, res) {
        console.log("test");
        res.send('test function')
    }


}