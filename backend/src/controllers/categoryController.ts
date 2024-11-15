import { Request, Response } from "express";

import { ICategoryService } from "@src/services/categoryService";
import { createErrorResponse, createSuccessResponse } from "@src/utils/createError";
import { ServiceError } from "@src/utils/Error";
import { IController } from "@src/types";
import { Logger } from "@src/utils/Logger";

const isShowLog = !(process.env.SHOW_LOG && process.env.SHOW_LOG === "true");

export class CategoryController implements IController {
  constructor(private categoryService: ICategoryService) {}

  async create(req: Request, res: Response) {
    try {
      const category = await this.categoryService.createCategory({
        user: req.user,
        data: req.body,
      });

      return res.status(201).json(createSuccessResponse(201, category));
    } catch (error) {
      if (error instanceof ServiceError) {
        return res
          .status(error.statusCode)
          .json(createErrorResponse(error.statusCode, error.message));
      }
      Logger.error(error, isShowLog);

      return res.status(500).json(createErrorResponse(500, "Internal server error"));
    }
  }

  async read(req: Request, res: Response) {
    try {
      const categories = await this.categoryService.getCategories({ user: req.user });

      return res.status(200).json(createSuccessResponse(200, categories));
    } catch (error) {
      if (error instanceof ServiceError) {
        return res
          .status(error.statusCode)
          .json(createErrorResponse(error.statusCode, error.message));
      }
      Logger.error(error, isShowLog);

      return res.status(500).json(createErrorResponse(500, "Internal server error"));
    }
  }

  async update(req: Request, res: Response) {
    try {
      const category = await this.categoryService.updateCategory({
        categoryId: req.params.categoryId,
        user: req.user,
        data: req.body,
      });

      return res.status(200).json(createSuccessResponse(200, category));
    } catch (error) {
      if (error instanceof ServiceError) {
        return res
          .status(error.statusCode)
          .json(createErrorResponse(error.statusCode, error.message));
      }
      Logger.error(error, isShowLog);

      return res.status(500).json(createErrorResponse(500, "Internal server error"));
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.categoryService.deleteCategory({
        categoryId: req.params.categoryId,
        user: req.user,
      });

      return res.status(200).json(createSuccessResponse(200, { isRemove: true }));
    } catch (error) {
      if (error instanceof ServiceError) {
        return res
          .status(error.statusCode)
          .json(createErrorResponse(error.statusCode, error.message));
      }
      Logger.error(error, isShowLog);

      return res.status(500).json(createErrorResponse(500, "Internal server error"));
    }
  }

  async getPostListByCategory(req: Request, res: Response) {
    try {
      const categories = await this.categoryService.getCategoryWithPosts({
        categoryId: req.params.categoryId,
        user: req.user,
      });

      return res.status(200).json(createSuccessResponse(200, categories));
    } catch (error) {
      if (error instanceof ServiceError) {
        return res
          .status(error.statusCode)
          .json(createErrorResponse(error.statusCode, error.message));
      }
      Logger.error(error, isShowLog);

      return res.status(500).json(createErrorResponse(500, "Internal server error"));
    }
  }
}
