import { ItemService } from "../services/ItemService";
import { NextFunction, Request, Response } from "express";
import {
  CreateItemInputType,
  ItemValidation,
  UpdateItemInputType,
} from "../validations/ItemValidation";
import { APISuccessResponse } from "../utils/APISuccessReponse";
import { Item } from "../types/item";

export class ItemController {
  constructor(private service: ItemService = new ItemService()) {}

  async getAllItems(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.getAllItems();

      const response = new APISuccessResponse<Item[]>(
        "retrieve_all_items",
        "Successful retrieve all items",
        200,
        data
      );

      res.status(Number(response.statusCode)).json(response.toJSON());
    } catch (e) {
      next(e);
    }
  }

  async createItem(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedInput = ItemValidation.CREATE.parse(
        req.body as CreateItemInputType
      );

      const result = await this.service.createItem(validatedInput);
      const response = new APISuccessResponse<Item>(
        "successful_create_item",
        "Successful create new item",
        201,
        result
      );

      res.status(Number(response.statusCode)).json(response.toJSON());
    } catch (e) {
      next(e);
    }
  }

  async updateItem(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedInput = ItemValidation.UPDATE.parse(
        req.body as UpdateItemInputType
      );

      const { itemId } = req.params;

      const result = await this.service.updateItem(
        Number(itemId),
        validatedInput
      );
      const response = new APISuccessResponse<Item>(
        "successful_update_item",
        "Successful update an item",
        200,
        result
      );

      res.status(Number(response.statusCode)).json(response.toJSON());
    } catch (e) {
      next(e);
    }
  }

  async deleteItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { itemId } = req.params;

      const result = await this.service.deleteItem(Number(itemId));
      const response = new APISuccessResponse<null>(
        "successful_delete_item",
        "Successful delete an item",
        200
      );

      res.status(Number(response.statusCode)).json(response.toJSON());
    } catch (e) {
      next(e);
    }
  }
}
