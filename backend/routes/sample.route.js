const express = require('express');
const router = express.Router();
const {sampleController} = require('../controllers/sample.controller');

router.get('/', sampleController);