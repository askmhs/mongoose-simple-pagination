import {Student} from "../Model/Student";
import {InvalidException} from "../Exception/InvalidException";

export class CreateStudentCommand {
    constructor(student) {
        if (student instanceof Student) {
            this.student = student;
        } else {
            throw new InvalidException('student must be instanceof Student class!');
        }
    }
}