import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { CustomHttpException } from 'src/core/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CATEGORY_MODEL, CategoryDocument } from './entity/categeory';
import { SearchDto } from 'src/common/dto/pagnation.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(CATEGORY_MODEL)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.categoryModel.create({
        name: createCategoryDto.name,
        isActive: createCategoryDto.isActive ?? true,
      });

      return {
        message: 'Category created successfully',
        data: category,
      };
    } catch (error: Error | any) {
      throw new CustomHttpException(error.message, error.status);
    }
  }

  async getAllCategories(searchDto: SearchDto) {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        search,
        searchFields,
      } = searchDto || ({} as SearchDto);

      const match: Record<string, any> = {};

      if (search && searchFields) {
        const fields = searchFields.split(',').map((f) => f.trim());
        match.$or = fields.map((field) => ({
          [field]: { $regex: search, $options: 'i' },
        }));
      }

      const sort: Record<string, 1 | -1> = {
        [sortBy]: sortOrder === 'asc' ? 1 : -1,
      };
      const skip = (page - 1) * limit;

      const pipeline = [
        { $match: match },
        { $sort: sort },
        {
          $facet: {
            data: [{ $skip: skip }, { $limit: Number(limit) }],
            totalCount: [{ $count: 'count' }],
          },
        },
      ];

      const result = await this.categoryModel.aggregate(pipeline);

      const data: CategoryDocument[] = result[0]?.data || [];
      const total: number = result[0]?.totalCount?.[0]?.count || 0;
      const totalPages = Math.ceil(total / limit);

      return {
        data,
        meta: {
          page,
          limit,
          total,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      };
    } catch (error: any) {
      console.log(error);
      throw new CustomHttpException(error.message, error.status || 500);
    }
  }

  async getCategoryById(id: string) {
    try {
      const category = await this.categoryModel.findById(
        new Types.ObjectId(id),
      );

      if (!category) {
        throw new CustomHttpException('Category not found', 404);
      }

      return {
        message: 'Category retrieved successfully',
        data: category,
      };
    } catch (error: Error | any) {
      throw new CustomHttpException(error.message, error.status);
    }
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoryModel.findByIdAndUpdate(
        new Types.ObjectId(id),
        updateCategoryDto,
        { new: true, runValidators: true },
      );

      if (!category) {
        throw new CustomHttpException('Category not found', 404);
      }

      return {
        message: 'Category updated successfully',
        data: category,
      };
    } catch (error: Error | any) {
      throw new CustomHttpException(error.message, error.status);
    }
  }

  async updateCategoryStatus(id: string, updateStatusDto: UpdateStatusDto) {
    try {
      const category = await this.categoryModel.findByIdAndUpdate(
        new Types.ObjectId(id),
        { isActive: updateStatusDto.isActive },
        { new: true, runValidators: true },
      );

      if (!category) {
        throw new CustomHttpException('Category not found', 404);
      }

      return {
        message: `Category ${updateStatusDto.isActive ? 'activated' : 'deactivated'} successfully`,
        data: category,
      };
    } catch (error: Error | any) {
      throw new CustomHttpException(error.message, error.status);
    }
  }

  async deleteCategory(id: string) {
    try {
      const category = await this.categoryModel.findByIdAndDelete(
        new Types.ObjectId(id),
      );

      if (!category) {
        throw new CustomHttpException('Category not found', 404);
      }

      return {
        message: 'Category deleted successfully',
        data: category,
      };
    } catch (error: Error | any) {
      throw new CustomHttpException(error.message, error.status);
    }
  }
}
