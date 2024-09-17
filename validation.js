const { body, validationResult } = require('express-validator');

// Middleware to validate ticket creation
exports.validateCreateTicket = [
  body('title').isString().withMessage('Title is required'),
  body('description').isString().withMessage('Description is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Middleware to validate ticket update
exports.validateUpdateTicket = [
  body('title').optional().isString(),
  body('description').optional().isString(),
  body('status').optional().isIn(['open', 'in-progress', 'closed']),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
