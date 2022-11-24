import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtPayload } from 'src/auth/jwtPayload.model';
import { Todo } from './todo.model';

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private readonly TodoModel: Model<Todo>) {};

  async getTodoList(token: JwtPayload) {
    try {
      const todoList = await this.TodoModel.find({
        author: token.sub,
      }).populate('author', '-password');
      return todoList;
    } catch (error) {
      console.log(error);
    }
  }

  async createTodo(content: string, token: JwtPayload) {
    try {
      const todo = await new this.TodoModel({
        content,
        author: token.sub,
      }).populate('author', '-password');
      const savedTodo = await todo.save();
      if (!savedTodo) throw new Error('Todo has not been added to database!');
      return savedTodo;
    } catch (error) {
      console.log(error);
    }
  }

  async updateTodo(todoId: string, content: string, token: JwtPayload) {
    try {
      const todo = await this.TodoModel.replaceOne(
        {
          _id: todoId,
          author: token.sub,
        },
        {
          content,
          author: token.sub,
        },
      );
      return todo;
    } catch (error) {}
  }

  async deleteTodo(todoId: string, token: JwtPayload) {
    try {
      const todo = await this.TodoModel.deleteOne({
        _id: todoId,
        author: token.sub,
      });
    } catch (error) {
      console.log(error);
    }
  }

}