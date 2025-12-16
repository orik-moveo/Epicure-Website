/**
 * homepage controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::homepage.homepage', {
  async find(ctx) {
    // Override populate to include all media fields
    ctx.query = {
      ...ctx.query,
      populate: {
        hero: {
          populate: {
            backgroundImage: true,
          },
        },
        popularRestaurants: {
          populate: {
            restaurants: {
              populate: {
                image: true,
                chef: {
                  populate: {
                    image: true,
                  },
                },
              },
            },
          },
        },
        popularDishes: {
          populate: {
            dishes: {
              populate: {
                image: true,
              },
            },
          },
        },
        chefOfWeek: {
          populate: {
            chef: {
              populate: {
                image: true,
                restaurants: {
                  populate: {
                    image: true,
                  },
                },
              },
            },
          },
        },
        about: true,
      },
    };

    const response = await super.find(ctx);
    return response;
  },
});
