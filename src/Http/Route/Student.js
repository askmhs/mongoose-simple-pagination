import {Decorator} from "../../Domain/Decorator";
import SuccessResponse from "../Response/SuccessResponse";
import StudentDB from "../../Domain/Student/Projection/StudentDB";
import InternalServerErrorResponse from "../Response/InternalServerErrorResponse";
import {CreateStudentCommand} from "../../Domain/Student/Command/CreateStudentCommand";
import {CreateStudentCommandHandler} from "../../Domain/Student/Handler/CreateStudentCommandHandler";
import {Student} from "../../Domain/Student/Model/Student";

module.exports = (server) => {

    const director = require('director.js');
    const promiseBus = director();

    server.post('/student/create', (req, res) => {
        CreateStudentCommand.prototype.ID = 'createStudentCommand';

        promiseBus.registry.register(CreateStudentCommand.prototype.ID, new CreateStudentCommandHandler());
        const bus = new Decorator(promiseBus);

        const data = new Student(req.body.name, req.body.address, req.body.classroom);

        bus.handle(new CreateStudentCommand(data)).then((result) => {
            SuccessResponse(res, 'Successfully create student!', result);
        }).catch((errCreated) => {
            console.log(errCreated);
            InternalServerErrorResponse(res, 'An error occurred!');
        });
    });

    server.get('/student/list', (req, res) => {
        /**
         * How many data would be displayed in one page
         * @type {Number|number}
         */
        const limit = parseInt(req.query.limit) || 10;

        /**
         * Which page would be displayed
         * @type {Number|number}
         */
        const page = parseInt(req.query.page) || 1;

        /**
         * Finding data
         */
        StudentDB.find().skip(limit * (page - 1)).limit(limit).lean().then((students) => {
            SuccessResponse(res, 'List student!', students);
        }).catch((errStudent) => {
            console.log(errStudent);
            InternalServerErrorResponse(res, 'An error occurred!');
        });
    });
};