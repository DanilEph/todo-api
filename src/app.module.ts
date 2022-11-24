import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TodoController } from './todo/todo.controller';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    AuthModule,
    TodoModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:NPWvzI6k0Szw9XxO@cluster0.pyveg.mongodb.net/todo-db?retryWrites=true&w=majority',
    ),
  ],
  controllers: [],
})
export class AppModule {}
