import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/index.js';
import { UserEntity } from '../user/index.js';
import { MIN_RATING, MAX_RATING } from '../../constants/index.js';

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})

export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public text: string;

  @prop({
    ref: OfferEntity,
    required: true
  })
  public offerId: Ref<OfferEntity>;

  @prop({ required: true, })
  public postDate: Date;

  @prop({
    required: true,
    min: [MIN_RATING, `Рейтинг не может быть меньше ${MIN_RATING}.`],
    max: [MAX_RATING, `Рейтинг не может быть больше ${MAX_RATING}.`],
  })
  public rating: number;

  @prop({
    ref: 'UserEntity',
    required: true,
  })
  public userId: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
