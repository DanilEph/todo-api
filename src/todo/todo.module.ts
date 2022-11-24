import * as common from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoController } from './todo.controller';
import { TodoSchema } from './todo.model';
import { TodoService } from './todo.service';

@common.Module({
  imports: [MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}