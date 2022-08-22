import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { IStudent } from './interface/student.interface';

@Injectable()
export class StudentService {
    constructor(@InjectModel('Student') private studentModal:Model<IStudent>){}

    async createStudent(createStudentDto:CreateStudentDto):Promise<IStudent>{
        const newStudent = await this.studentModal.create(createStudentDto);
        return newStudent.save()
    }

    async updateStudent(studentId:string ,updateStudentSDto:UpdateStudentDto):Promise<IStudent>{
        const existingStudent = await this.studentModal.findByIdAndUpdate(studentId,updateStudentSDto,{new:true});
        if(!existingStudent) { throw new NotFoundException(`Opps! User of this Id${studentId} Not Found`)}
        return existingStudent;
    }
    
    async getAllStudent():Promise<IStudent[]>{
        const studentData = await this.studentModal.find().exec();
        if(!studentData && studentData.length === 0){
            throw new NotFoundException("Opps! Student data not Found!")
        }
        return studentData
    }


    async getStudent(studentId:string):Promise<IStudent>{
        const existingStudent = await this.studentModal.findById(studentId).exec();
        if(!existingStudent){
            throw new NotFoundException(`Sorry! Not Found this student with this Id ${studentId}`)
        }
        return existingStudent;
    }

    async deleteStudent(studentId:string):Promise<IStudent>{
        const existingStudent = await this.studentModal.findByIdAndDelete(studentId);
        if(!existingStudent){
            throw new NotFoundException(`Sorry! Not Found this student with this Id ${studentId}`)
        }
        return existingStudent;
    }
}
