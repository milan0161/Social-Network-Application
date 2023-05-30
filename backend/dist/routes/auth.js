"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const express_validator_1 = require("express-validator");
const validation_middleware_1 = require("../middleware/validation-middleware");
const router = (0, express_1.Router)();
router.post('/register', [
    (0, express_validator_1.body)('firstname')
        .isString()
        .isLength({ min: 2, max: 25 })
        .trim()
        .withMessage('Please enter a valid name, min 2 - max 25 characters'),
    (0, express_validator_1.body)('lastname')
        .isString()
        .isLength({ min: 3, max: 25 })
        .withMessage('Please enter a valid lastname, min 3 - max 25 characters')
        .trim(),
    (0, express_validator_1.body)('email').not().isEmpty().isEmail().withMessage('Please enter a valid email adress').trim(),
    (0, express_validator_1.body)('password').not().isEmpty().isString().isLength({ min: 5, max: 30 }).trim(),
], validation_middleware_1.validationMiddleware, auth_1.register);
router.post('/login', [(0, express_validator_1.body)('email').isEmail().trim().withMessage('Please enter a valid email adress')], validation_middleware_1.validationMiddleware, auth_1.login);
exports.default = router;
