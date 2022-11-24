import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/jwtPayload.model';
import { TodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiTags('Todo')
@Controller('api/v1/todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getTodos(@Req() req: Request) {
    const foundTodos = this.todoService.getTodoList(req.user as JwtPayload);
    return foundTodos;
  }

  @Post()
  createTodo(@Req() req: Request, @Body() dto: TodoDto) {
    const savedTodo = this.todoService.createTodo(
      dto.content,
      req.user as JwtPayload,
    );

    return savedTodo;
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
  })
  deleteTodo(@Param('id') id: string, @Req() req: Request) {
    this.todoService.deleteTodo(id, req.user as JwtPayload);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    required: true,
  })
  updateTodo(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() dto: TodoDto,
  ) {
    this.todoService.updateTodo(id, dto.content, req.user as JwtPayload);
  }
}
