const express = require('express');
const Joi = require('joi');
const router = express.Router();

const schema = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(30).required(),
  message: Joi.string().alphanum().min(3).max(5000).required(),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
  date: Joi.date(),

})

router.get('/', (req, res) => {
  res.json(['😀', '😳', '🙄']);
});

router.get('/', (req, res) => {
  
  res.json(['😀', '😳', '🙄']);
});

module.exports = router;
