import { Request, Response } from "express";

import { IPostService } from "@src/service/postService";
import { IController } from "@src/types";
import { createErrorResponse, createSuccessResponse } from "@src/utils/createError";
import { ServiceError } from "@src/utils/Error";

export class PostController implements IController {
  constructor(private postService: IPostService) {}

  async create(req: Request, res: Response) {
    try {
      const { title, content, category } = req.body;
      const files = req.files;
      const post = await this.postService.createPost({
        header: req.headers["content-type"],
        user: req.user,
        data: { title, category, content, images: files },
      });

      return res.status(201).json(createSuccessResponse(201, post));
    } catch (error) {
      if (error instanceof ServiceError) {
        return res
          .status(error.statusCode)
          .json(createErrorResponse(error.statusCode, error.message));
      }

      return res.status(500).json(createErrorResponse(500, "Internal server error"));
    }
  }

  async read(req: Request, res: Response) {
    try {
      const posts = await this.postService.getPosts({ user: req.user });

      return res.status(200).json(createSuccessResponse(200, posts));
    } catch (error) {
      if (error instanceof ServiceError) {
        return res
          .status(error.statusCode)
          .json(createErrorResponse(error.statusCode, error.message));
      }

      return res.status(500).json(createErrorResponse(500, "Internal server error"));
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { title, content } = req.body;
      const files = req.files;
      const post = await this.postService.updatePost({
        postId: req.params.postId,
        header: req.headers["content-type"],
        user: req.user,
        data: { title, content, images: files },
      });

      return res.status(200).json(createSuccessResponse(200, post));
    } catch (error) {
      if (error instanceof ServiceError) {
        return res
          .status(error.statusCode)
          .json(createErrorResponse(error.statusCode, error.message));
      }

      return res.status(500).json(createErrorResponse(500, "Internal server error"));
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.postService.deletePost({
        postId: req.params.postId,
        user: req.user,
      });

      return res.status(200).json(createSuccessResponse(200, { isRemove: true }));
    } catch (error) {
      if (error instanceof ServiceError) {
        return res
          .status(error.statusCode)
          .json(createErrorResponse(error.statusCode, error.message));
      }

      return res.status(500).json(createErrorResponse(500, "Internal server error"));
    }
  }
}
