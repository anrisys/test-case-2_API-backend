import { BusinessLogicError } from "../error/CustomError";
import { ItemRepository } from "../repositories/ItemRepository";
import { Item } from "../types/item";
import {
  CreateItemInputType,
  UpdateItemInputType,
} from "../validations/ItemValidation";

export class ItemService {
  constructor(private repository: ItemRepository = new ItemRepository()) {}

  async getAllItems(): Promise<Item[]> {
    return await this.repository.findAll();
  }

  async createItem(data: CreateItemInputType): Promise<Item> {
    return await this.repository.create(data);
  }

  async updateItem(itemId: number, data: UpdateItemInputType): Promise<Item> {
    const foundItem = await this.repository.findById(itemId);

    return await this.repository.update(foundItem.id, data);
  }

  async deleteItem(itemId: number): Promise<void> {
    const foundItem = await this.repository.findById(itemId);

    await this.repository.delete(foundItem.id);
  }

  async isItemExist(id: number): Promise<Item> {
    const foundItem = await this.repository.findById(id);

    if (!foundItem) {
      throw new BusinessLogicError("Item found not", "item_not_found");
    }

    return foundItem;
  }
}
