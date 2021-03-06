import Express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import registerProductsEndpoints from './api/controllers/products/productsEndpoints.js';
import registerCategoriesEndpoints from './api/controllers/categories/categoriesEndpoints.js';
import registerPromoEndpoints from './api/controllers/promo/promoEndpoints.js';
import registerTagsEndpoints from './api/controllers/tags/tagsEndpoints.js';
import registerUsersEndpoints from './api/controllers/users/usersEndpoints.js';

import registerReviewsEndpoints from './api/controllers/reviews/reviewsEndpoints.js'
import registerWishListEndpoints from './api/controllers/wishlist/wishListEndpoints.js';

import registerCartEndpoints from './api/controllers/cart/cartEndpoints.js';
import registerOrdersEndpoints from './api/controllers/orders/ordersEndpoints.js';

import authenticate from './api/controllers/auth/index.js';
import auth from './api/middleware/auth.js';
import { swaggerSpec } from './api/middleware/swagger.middleware.js';



//init dotenv 
dotenv.config();

//create a new express application
const app = Express();

const NODE_ENV = process.env.NODE_ENV;
//add json body-parser 
app.use(bodyParser.json());

// add cors
app.use(cors());

// register the endpoints
registerProductsEndpoints(app);
registerCategoriesEndpoints(app);
registerPromoEndpoints(app);
registerTagsEndpoints(app);

//registerUsersEndpoints(app);
app.use('/users' ,auth, registerUsersEndpoints);
app.use('/auth', authenticate);
app.use('/reviews', auth, registerReviewsEndpoints);
app.use('/wishlist', auth, registerWishListEndpoints);
app.use('/cart', auth, registerCartEndpoints);
app.use('/orders', auth, registerOrdersEndpoints);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//open the application
if(NODE_ENV  !== 'test') {
  app.listen(process.env.PORT, () => {
    console.log(`Server is listening to port ${process.env.PORT}`);
  })
  console.log('Starting the server...');
}
export { app };
