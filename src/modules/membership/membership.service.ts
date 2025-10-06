import { Injectable } from '@nestjs/common';
import { AddMembershipDto } from './dto/add-membership.dto';
import { CustomHttpException } from 'src/core/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  MEMBERSHIP_MODEL,
  MembershipDocument,
} from './entity/membership.entity';

@Injectable()
export class MembershipService {
  constructor(
    @InjectModel(MEMBERSHIP_MODEL)
    private readonly membershipModel: Model<MembershipDocument>,
  ) {}

  async addMembership(addMembershipDto: AddMembershipDto) {
    try {
      await this.membershipModel.create({
        name: addMembershipDto.name,
        amount: addMembershipDto.amount,
        strikeAmount: addMembershipDto.strikeAmount,
        duration: addMembershipDto.duration,
        benefits: addMembershipDto.benefits,
      });

      return {
        message: 'Membership added successfully',
        data: addMembershipDto,
      };
    } catch (error: Error | any) {
      throw new CustomHttpException(error.message, error.status);
    }
  }
  async getMembership() {
    try {
      const memberships = await this.membershipModel.find();

      if (!memberships) {
        throw new CustomHttpException('Memberships not found', 404);
      }

      return {
        message: 'Memberships retrieved successfully',
        data: memberships,
      };
    } catch (error: Error | any) {
      throw new CustomHttpException(error.message, error.status);
    }
  }
  async deleteMembership(id: string) {
    try {
      const membership = await this.membershipModel.findByIdAndDelete(
        new Types.ObjectId(id),
      );

      if (!membership) {
        throw new CustomHttpException('Membership not found', 404);
      }

      return {
        message: 'Membership deleted successfully',
        data: membership,
      };
    } catch (error: Error | any) {
      throw new CustomHttpException(error.message, error.status);
    }
  }
}
