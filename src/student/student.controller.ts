import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Res } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService:StudentService){}

    @Post()
    async createStuent(@Res() response,@Body() createStudentDto:CreateStudentDto){
        try {
            const newStudent = await this.studentService.createStudent(createStudentDto)
            return response.status(HttpStatus.CREATED).json({
                message:"Student Created successfully",
                newStudent
            })
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                message:"Error! Student not Created",
                statusCode:400,
                error:'Bad Request'
            })
        }
    }


    @Put("/:id")
    async updateStudent(@Res() response ,@Param('id') studenId:string,@Body() updateStudentDto:UpdateStudentDto){
        try {
            const existingStudent = await this.studentService.updateStudent(studenId,updateStudentDto)
            return response.status(HttpStatus.OK).json({
                message:"User! updated successfully ",
                existingStudent
            })
        } catch (err) {
            return response.status(err.status).json(err.response)
        }
    }

    @Get("/:id")
    async getStudent(@Res() response,@Param('id') studentId:string){
        try {
            const existingStudent = await this.studentService.getStudent(studentId)
            response.status(HttpStatus.OK).json({
                message:`Student Found successfully`,
                existingStudent
            })
        } catch (err) {
            return response.status(err.status).json(err.response)
        }
    }


    @Delete("/:id")
    async deleteStudent(@Res() response,@Param('id') studentId:string){
        try {
            const deleteStudent = await this.studentService.deleteStudent(studentId);
            if(!deleteStudent){
                throw new NotFoundException(`Sorry! student not Found`)
            }
            response.status(HttpStatus.OK).json({
                message:`Successfully delelted this ${deleteStudent}`
            })
        } catch (err) {
            return response.status(err.status).json(err.response)
        }
    }
}
