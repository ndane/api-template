import mongoose from 'mongoose';

export default class BaseSchema extends mongoose.Schema {
  constructor(params) {
    super(params);

    // Default transformations
    this.set('toJSON', {
      virtuals: true,
      versionKey: false,
      transform: function transform(doc, ret) {
        const model = ret;

        // Transform data
        // eslint-disable-next-line no-underscore-dangle
        delete model._id;
        delete model.password; // We will never want to show 'password'

        return model;
      },
    });
  }
}
