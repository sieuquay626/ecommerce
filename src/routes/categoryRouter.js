const router = require('express').Router();
const categoryCtrl = require('../controllers/categoryCtrl');

router
  .route('/')
  .get(categoryCtrl.getCategories)
  .post(categoryCtrl.createCategory)
  .put(categoryCtrl.updateCategory)
  .delete(categoryCtrl.removeCategory);

module.exports = router;
