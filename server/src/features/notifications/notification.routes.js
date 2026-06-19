const express = require('express');
const router = express.Router();
const notificationController = require('./notification.controller');

router.get('/', notificationController.getNotifications);
router.put('/mark-read', notificationController.markAsRead);

module.exports = router;
