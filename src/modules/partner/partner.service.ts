import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PARTNER_MODEL, PartnerDocument } from './entity/partner.entity';
import { Model, Types } from 'mongoose';
import { CustomHttpException } from 'src/core/exceptions';
import { AddPartnerDto } from './dto/add-partner.dto';
import { SearchDto } from 'src/common/dto/pagnation.dto';

@Injectable()
export class PartnerService {
  constructor(
    @InjectModel(PARTNER_MODEL) private partnerModel: Model<PartnerDocument>,
  ) {}

  async addPartner(addPartnerDto: AddPartnerDto): Promise<PartnerDocument> {
    try {
      const newPartner =  await this.partnerModel.create({...addPartnerDto,name:addPartnerDto.companyName,isActive:true});
      return newPartner;
    } catch (error) {
      console.log("err", error);
      throw new CustomHttpException(error.message, error.status);
    }
  }
  async getPartner(eventId:string,searchDto:SearchDto): Promise<any> {
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

      if (eventId) match.eventId = new Types.ObjectId(eventId);

      // Optional search filter
      if (search && searchFields) {
        const fields = searchFields.split(',').map((f) => f.trim());
        match.$and = match.$and || []; // ensure we can combine multiple conditions
        match.$and.push({
          $or: fields.map((field) => ({
            [field]: { $regex: search, $options: 'i' },
          })),
        });
      }

      const sort: Record<string, 1 | -1> = {
        [sortBy]: sortOrder === 'asc' ? 1 : -1,
      };
      const skip = (page - 1) * limit;

      const pipeline = [
        { $match: match },
        { $sort: sort },

        {
          $project: {
            _id: 1,
            name: 1,
            designation: 1,
            company: 1,
            country: 1,
            avatar: 1,
            organization: 1,
            linkedinUrl: 1,
            isActive: 1,
            createdAt: 1,
          },
        },
        {
          $facet: {
            data: [{ $skip: skip }, { $limit: Number(limit) }],
            totalCount: [{ $count: 'count' }],
          },
        },
      ];

      const result = await this.partnerModel.aggregate(pipeline);

      const data: PartnerDocument[] = result[0]?.data || [];
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
  async deletePartner(id: Types.ObjectId): Promise<any[]> {
    try {
      return this.partnerModel.findByIdAndDelete(id);
    } catch (error) {
      throw new CustomHttpException(error.message, error.status);
    }
  }
}
