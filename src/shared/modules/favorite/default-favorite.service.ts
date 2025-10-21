import { FavoriteService } from './favorite-service.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { FavoriteEntity } from './favorite.entity.js';
import { CreateOrDeleteFavoriteDto } from './dto/create-or-delete-favorite.dto.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';

@injectable()
export class DefaultFavoriteService implements FavoriteService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.FavoriteModel) private readonly favoriteModel: types.ModelType<FavoriteEntity>
  ) {}

  public async create(dto: CreateOrDeleteFavoriteDto): Promise<DocumentType<FavoriteEntity>> {
    const result = await this.favoriteModel.create(dto);
    this.logger.info(`Добавлено в избранное: user=${dto.userId}, offer=${dto.offerId}.`);

    return result.populate(['user', 'offer']);
  }

  public async delete(dto: CreateOrDeleteFavoriteDto): Promise<DocumentType<FavoriteEntity> | null> {
    return this.favoriteModel
      .findOneAndDelete(dto)
      .exec();
  }

  public async findByUser(userId: string): Promise<DocumentType<FavoriteEntity>[]> {
    return this.favoriteModel
      .find({ user: userId })
      .populate('offer')
      .exec();
  }

}
