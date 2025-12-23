import type { Schema, Struct } from '@strapi/strapi';

export interface DishChangesOption extends Struct.ComponentSchema {
  collectionName: 'components_dish_changes_options';
  info: {
    displayName: 'ChangesOption';
  };
  attributes: {
    label: Schema.Attribute.String;
  };
}

export interface DishIngredient extends Struct.ComponentSchema {
  collectionName: 'components_dish_ingredients';
  info: {
    displayName: 'ingredient';
  };
  attributes: {
    ingredient: Schema.Attribute.String;
  };
}

export interface DishSideOption extends Struct.ComponentSchema {
  collectionName: 'components_dish_side_options';
  info: {
    displayName: 'SideOption';
    icon: 'plus';
  };
  attributes: {
    label: Schema.Attribute.String;
  };
}

export interface HomepageAboutSection extends Struct.ComponentSchema {
  collectionName: 'components_homepage_about_sections';
  info: {
    displayName: 'AboutSection';
  };
  attributes: {
    body: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface HomepageChefOfWeekSection extends Struct.ComponentSchema {
  collectionName: 'components_homepage_chef_of_week_sections';
  info: {
    displayName: 'ChefOfWeekSection';
  };
  attributes: {
    chef: Schema.Attribute.Relation<'oneToOne', 'api::chef.chef'>;
    title: Schema.Attribute.String;
  };
}

export interface HomepageHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_homepage_hero_sections';
  info: {
    displayName: 'HeroSection';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    searchPlaceholder: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface HomepagePopularDishesSection extends Struct.ComponentSchema {
  collectionName: 'components_homepage_popular_dishes_sections';
  info: {
    displayName: 'PopularDishesSection';
  };
  attributes: {
    dishes: Schema.Attribute.Relation<'oneToMany', 'api::dish.dish'>;
    title: Schema.Attribute.String;
  };
}

export interface HomepagePopularRestaurantsSection
  extends Struct.ComponentSchema {
  collectionName: 'components_homepage_popular_restaurants_sections';
  info: {
    displayName: 'PopularRestaurantsSection';
  };
  attributes: {
    restaurants: Schema.Attribute.Relation<
      'oneToMany',
      'api::restaurant.restaurant'
    >;
    title: Schema.Attribute.String;
  };
}

export interface RestaurantLocation extends Struct.ComponentSchema {
  collectionName: 'components_restaurant_locations';
  info: {
    displayName: 'Location';
  };
  attributes: {
    city: Schema.Attribute.String;
    lat: Schema.Attribute.Decimal;
    lng: Schema.Attribute.Decimal;
    title: Schema.Attribute.String;
  };
}

export interface RestaurantOpeningHours extends Struct.ComponentSchema {
  collectionName: 'components_restaurant_opening_hours';
  info: {
    displayName: 'OpeningHours';
  };
  attributes: {
    close: Schema.Attribute.String;
    day: Schema.Attribute.Enumeration<
      [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ]
    >;
    open: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'dish.changes-option': DishChangesOption;
      'dish.ingredient': DishIngredient;
      'dish.side-option': DishSideOption;
      'homepage.about-section': HomepageAboutSection;
      'homepage.chef-of-week-section': HomepageChefOfWeekSection;
      'homepage.hero-section': HomepageHeroSection;
      'homepage.popular-dishes-section': HomepagePopularDishesSection;
      'homepage.popular-restaurants-section': HomepagePopularRestaurantsSection;
      'restaurant.location': RestaurantLocation;
      'restaurant.opening-hours': RestaurantOpeningHours;
    }
  }
}
