import prisma from "../lib/prisma";
import { Item } from "../types/item";
import {
  CreateItemInputType,
  UpdateItemInputType,
} from "../validations/ItemValidation";

export class ItemRepository {
  async create(data: CreateItemInputType): Promise<Item> {
    return await prisma.item.create({ data });
  }

  async findAll(): Promise<Item[]> {
    return await prisma.item.findMany();
  }

  async findById(id: number): Promise<Item> {
    return await prisma.item.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: UpdateItemInputType): Promise<Item> {
    return await prisma.item.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.item.delete({
      where: {
        id: id,
      },
    });
  }
}
