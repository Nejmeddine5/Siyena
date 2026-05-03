const asyncHandler = require('../utils/asyncHandler');
const Alert = require('../models/Alert');

exports.receiveChatbotAlert = asyncHandler(async (req, res, next) => {
  const { clientName, printerModel, issue, severity, confidence, conversation } = req.body;
  
  const alert = await Alert.create({
    clientName,
    printerModel,
    issue,
    severity,
    confidence,
    conversation
  });

  // Emitting the event for real-time update
  const io = req.app.get('socketio');
  if (io) {
    io.emit('newAlert', alert);
  }

  res.status(201).json({
    status: 'success',
    data: alert
  });
});

exports.getAllAlerts = asyncHandler(async (req, res, next) => {
  const alerts = await Alert.find().sort({ createdAt: -1 });
  res.status(200).json({
    status: 'success',
    results: alerts.length,
    data: alerts
  });
});

exports.updateAlertStatus = asyncHandler(async (req, res, next) => {
  const alert = await Alert.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.status(200).json({ status: 'success', data: alert });
});
