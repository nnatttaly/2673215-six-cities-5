import { DocumentType } from '@typegoose/typegoose';
import { CreateOrDeleteFavoriteDto } from './dto/create-or-delete-favorite.dto.js';
import { FavoriteEntity } from './favorite.entity.js';

export interface FavoriteService {
  create(dto: CreateOrDeleteFavoriteDto): Promise<DocumentType<FavoriteEntity>>;
  delete(dto: CreateOrDeleteFavoriteDto): Promise<DocumentType<FavoriteEntity> | null>;
  findByUser(userId: string): Promise<DocumentType<FavoriteEntity>[]>
}
