import { z } from "zod";

const name = z.string().min(1);
const price = z.number().positive();
const description = z.string().min(1);

export class ItemValidation {
  static readonly CREATE = z.object({
    name: name,
    price: price,
    description: description,
  });
  static readonly UPDATE = z.object({
    name: name,
    price: price,
    description: description,
  });
}

export type CreateItemInputType = z.infer<typeof ItemValidation.CREATE>;
export type UpdateItemInputType = z.infer<typeof ItemValidation.UPDATE>;
