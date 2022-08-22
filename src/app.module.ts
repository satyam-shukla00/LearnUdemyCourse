import { Module } from '@nestjs/common';
import { StudentController } from './student/student.controller';
import { StudentService } from './student/student.service';
import { StudentModule } from './student/student.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from './student/schema/student.schema';


@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017",{dbName:"studentdb"}),
    StudentModule,
    MongooseModule.forFeature([{name:"Student",schema:StudentSchema}])

],
  controllers: [StudentController],
  providers: [StudentService],
})
export class AppModule {}
