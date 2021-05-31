import CategoriesDb from "../../lib/CategoriesDb.js";
import * as categoriesController from './crudCategories.js'
import sequelize from '../../../database/index.js';

export default (app) => {
  const categoryData = new CategoriesDb();

  // get the categories
  app.get('/categories', async (req, res) => await categoriesController.getAllCategories(sequelize,req, res));

  app.get('/categories/:categoryId', async (req, res) => await categoriesController.getCategoryById(sequelize,req, res));

  //get one product by index
  app.get('/categories/:id/promo_products', async (req, res) => await categoriesController.getCategoryProducts(categoryData, req, res));
  app.get('/categories/:id/all_products', async (req, res) => await categoriesController.getCategoryAllProducts(categoryData, req, res));
  app.get('/categories/:categoryId/products/:tagId', async (req, res) => await categoriesController.getCategoryProductsTags(categoryData, req, res));
  app.get('/categories/:categoryId/products/promo/:promoId', async (req, res) => await categoriesController.getPromoProducts(categoryData, req, res));


} 