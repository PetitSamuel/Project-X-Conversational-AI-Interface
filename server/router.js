const express = require('express');
const router = express.Router();
const db_api_controller = require('./Api/db_api');
const db_helper_api_controller = require('./Api/db_helper_api');
const converter_api_controller = require('./Api/converter_api');

/*
    /api/.. endpoints.
*/
router.post('/intents', db_api_controller.post_intents);
router.post('/intents-generation', db_helper_api_controller.generate_intents);
router.post('/entities', db_api_controller.post_entities);
router.post('/entities-generation', db_helper_api_controller.generate_entities);
router.post('/upload-csv', converter_api_controller.post_upload_csv);

router.get('/intents', db_api_controller.get_intents);
router.get('/intents/:name', db_api_controller.get_intents);
router.get('/entities', db_api_controller.get_entities);
router.get('/entities/:name', db_api_controller.get_entities);
router.get('/intents-analytics', db_helper_api_controller.get_intents_analytics);
router.get('/entities-analytics', db_helper_api_controller.get_entities_analytics);
router.get('/download-md/:filename', converter_api_controller.get_download_md);

router.delete('/intents/:name', db_api_controller.remove_intent);
router.delete('/entities/:name', db_api_controller.remove_entity);

exports.router = router;