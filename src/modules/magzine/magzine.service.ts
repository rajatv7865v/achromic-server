import { Injectable } from '@nestjs/common';
import { CreateMagazineDto } from './dto/create-magazine.dto';
import { UpdateMagazineDto } from './dto/update-magazine.dto';
import { UpdateMagazineStatusDto } from './dto/update-status.dto';
import { CustomHttpException } from 'src/core/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MAGZINE_MODEL, MagzineDocument } from './entity/magzine.entity';
import { SearchDto } from 'src/common/dto/pagnation.dto';

@Injectable()
export class MagazineService {
  constructor(
    @InjectModel(MAGZINE_MODEL)
    private readonly magazineModel: Model<MagzineDocument>,
  ) {}

  async createMagazine(createMagazineDto: CreateMagazineDto) {
    try {
      const magazine = await this.magazineModel.create({
        title: createMagazineDto.title,
        month: createMagazineDto.month,
        year: createMagazineDto.year,
        description: createMagazineDto.description,
        coverImage: createMagazineDto.coverImage,
        downloadUrl: createMagazineDto.downloadUrl,
        categories:
          createMagazineDto.categories?.map((id) => new Types.ObjectId(id)) ||
          [],
        isActive: createMagazineDto.isActive ?? true,
      });

      return {
        message: 'Magazine created successfully',
        data: magazine,
      };
    } catch (error: Error | any) {
      throw new CustomHttpException(error.message, error.status);
    }
  }

  async getAllMagazines(searchDto: SearchDto) {
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
          $lookup: {
            from: 'categories',
            localField: 'categories',
            foreignField: '_id',
            as: 'categories',
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            month: 1,
            year: 1,
            description: 1,
            coverImage: 1,
            downloadUrl: 1,
            isActive: 1,
            createdAt: 1,
            categories: {
              $map: {
                input: '$categories',
                as: 'cat',
                in:
                  '$$cat.name',
              
              },
            },
          },
        },
        {
          $facet: {
            data: [{ $skip: skip }, { $limit: Number(limit) }],
            totalCount: [{ $count: 'count' }],
          },
        },
      ];

      const result = await this.magazineModel.aggregate(pipeline);

      const data: MagzineDocument[] = result[0]?.data || [];
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

  async getMagazineById(id: string) {
    try {
      const magazine = await this.magazineModel
        .findById(new Types.ObjectId(id))
        .populate('categories');

      if (!magazine) {
        throw new CustomHttpException('Magazine not found', 404);
      }

      return {
        message: 'Magazine retrieved successfully',
        data: magazine,
      };
    } catch (error: Error | any) {
      throw new CustomHttpException(error.message, error.status);
    }
  }

  async updateMagazine(id: string, updateMagazineDto: UpdateMagazineDto) {
    try {
      const updateData: any = { ...updateMagazineDto };

      if (updateMagazineDto.categories) {
        updateData.categories = updateMagazineDto.categories.map(
          (id) => new Types.ObjectId(id),
        );
      }

      const magazine = await this.magazineModel
        .findByIdAndUpdate(new Types.ObjectId(id), updateData, {
          new: true,
          runValidators: true,
        })
        .populate('categories');

      if (!magazine) {
        throw new CustomHttpException('Magazine not found', 404);
      }

      return {
        message: 'Magazine updated successfully',
        data: magazine,
      };
    } catch (error: Error | any) {
      throw new CustomHttpException(error.message, error.status);
    }
  }

  async updateMagazineStatus(
    id: string,
    updateStatusDto: UpdateMagazineStatusDto,
  ) {
    try {
      const magazine = await this.magazineModel
        .findByIdAndUpdate(
          new Types.ObjectId(id),
          { isActive: updateStatusDto.isActive },
          { new: true, runValidators: true },
        )
        .populate('categories');

      if (!magazine) {
        throw new CustomHttpException('Magazine not found', 404);
      }

      return {
        message: `Magazine ${updateStatusDto.isActive ? 'activated' : 'deactivated'} successfully`,
        data: magazine,
      };
    } catch (error: Error | any) {
      throw new CustomHttpException(error.message, error.status);
    }
  }

  async deleteMagazine(id: string) {
    try {
      const magazine = await this.magazineModel.findByIdAndDelete(
        new Types.ObjectId(id),
      );

      if (!magazine) {
        throw new CustomHttpException('Magazine not found', 404);
      }

      return {
        message: 'Magazine deleted successfully',
        data: magazine,
      };
    } catch (error: Error | any) {
      throw new CustomHttpException(error.message, error.status);
    }
  }

  async getMagazinesByCategory(categoryId: string) {
    try {
      const magazines = await this.magazineModel
        .find({ categories: new Types.ObjectId(categoryId) })
        .populate('categories')
        .sort({ createdAt: -1 });

      return {
        message: 'Magazines retrieved successfully',
        data: magazines,
      };
    } catch (error: Error | any) {
      throw new CustomHttpException(error.message, error.status);
    }
  }
}
