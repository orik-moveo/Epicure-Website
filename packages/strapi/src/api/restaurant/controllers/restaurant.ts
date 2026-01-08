/**
 * restaurant controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::restaurant.restaurant', {
  async findOne(ctx) {
    // Override populate to include nested meal_types for dishes
    ctx.query = {
      ...ctx.query,
      populate: {
        image: true,
        chef: true,
        location: true,
        openingHours: true,
        dishes: {
          populate: {
            meal_types: true,
            ingredients: true,
            image: true,
          },
        },
      },
    };

    const response = await super.findOne(ctx);
    return response;
  },
});
