const router = require('express').Router();
const brandCtrl = require('../controllers/brandCtrl');


router
  .route('/')
  .get(brandCtrl.getBrands)
  .post(brandCtrl.createBrand)
  .put(brandCtrl.updateBrand)
  .delete(brandCtrl.removeBrand);

module.exports = router;
