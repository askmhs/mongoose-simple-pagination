import StudentDB from "../Projection/StudentDB";
import {InvalidException} from "../Exception/InvalidException";
import {CreateStudentCommand} from "../Command/CreateStudentCommand";
import {InternalServerErrorException} from "../Command/InternalServerErrorException";

export class CreateStudentCommandHandler {
    execute(command) {
        return new Promise((resolve, reject) => {
            if (command instanceof CreateStudentCommand) {
                this.command = command;

                this.createStudent().then((created) => {
                    resolve(created);
                }).catch((errCreated) => {
                    reject(new InternalServerErrorException(errCreated));
                });
            } else {
                reject(new InvalidException('command must be instanceof CreateStudentCommand!'));
            }
        });
    }

    createStudent() {
        return StudentDB.create(this.command.student);
    }
}