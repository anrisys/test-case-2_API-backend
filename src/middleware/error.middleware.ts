import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/ResponseError";
import { ValidationError } from "../error/CustomError";
import {
  PrismaClientKnownRequestError,
  PrismaClientInitializationError,
} from "@prisma/client/runtime/library";
import handlePrismaError from "../utils/handlePrismaError";

export default function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Handle know error types
  if (error instanceof ResponseError) {
    res.status(error.statusCode).json(error.toJSON());
  }

  // Zod Validation Errors
  if (error instanceof ZodError) {
    const details = error.errors.reduce<Record<string, string[]>>(
      (acc, err) => {
        const field = err.path.join(".");
        acc[field] = acc[field] || [];
        acc[field].push(err.message);
        return acc;
      },
      {}
    );

    res.status(400).json(
      new ValidationError(
        "Validation failed",
        details,
        "invalid_input" // Custom code
      ).toJSON()
    );
  }

  // Prisma Errors
  if (error instanceof PrismaClientKnownRequestError) {
    const prismaError = handlePrismaError(error); // Extract to a helper function
    res.status(prismaError.statusCode).json(prismaError.toJSON());
  }

  // Database Connection Errors
  if (error instanceof PrismaClientInitializationError) {
    res
      .status(503)
      .json(
        new ResponseError(
          "database",
          "Database connection failed",
          503,
          "database_unavailable"
        ).toJSON()
      );
  }

  // Fallback: Unexpected Errors
  res
    .status(500)
    .json(
      new ResponseError(
        "internal",
        "An unexpected error occurred",
        500,
        "server_error"
      ).toJSON()
    );
}
