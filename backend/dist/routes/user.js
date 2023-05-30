"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const express_validator_1 = require("express-validator");
const isAuth_1 = require("../middleware/isAuth");
const validation_middleware_1 = require("../middleware/validation-middleware");
const images_1 = require("../controllers/images");
const router = (0, express_1.Router)();
router.post('/add-informations', [
    (0, express_validator_1.check)('age', 'Age must be at least 18.').optional({ checkFalsy: false, nullable: true }).isInt({ min: 18 }),
    (0, express_validator_1.check)('city', 'Enter a valid City Name')
        .optional({ checkFalsy: false, nullable: true })
        .isString()
        .isLength({ min: 1, max: 50 }),
    (0, express_validator_1.check)('phoneNumber', 'Please enter a valid phone number')
        .optional({ checkFalsy: false, nullable: true })
        .isInt()
        .isLength({ min: 6, max: 20 }),
    (0, express_validator_1.check)('employed', 'Check true or False').optional({ checkFalsy: false, nullable: true }).isBoolean(),
    (0, express_validator_1.check)('workPlace', 'Enter a valid work place')
        .optional({ checkFalsy: false, nullable: true })
        .isString()
        .isLength({ min: 3, max: 50 }),
], isAuth_1.isAuth, validation_middleware_1.validationMiddleware, user_1.addInformations);
router.patch('/update-informations', [
    (0, express_validator_1.check)('age', 'Age must be at least 18.').optional({ checkFalsy: false, nullable: true }).isInt({ min: 18 }),
    (0, express_validator_1.check)('city', 'Enter a valid City Name')
        .optional({ checkFalsy: false, nullable: true })
        .isString()
        .isLength({ min: 1, max: 50 }),
    (0, express_validator_1.check)('phoneNumber', 'Please enter a valid phone number')
        .optional({ checkFalsy: false, nullable: true })
        .isInt()
        .isLength({ min: 6, max: 20 }),
    (0, express_validator_1.check)('employed', 'Check true or False').optional({ checkFalsy: false, nullable: true }).isBoolean(),
    (0, express_validator_1.check)('workPlace', 'Enter a valid work place')
        .optional({ checkFalsy: false, nullable: true })
        .isString()
        .isLength({ min: 3, max: 50 }),
], isAuth_1.isAuth, validation_middleware_1.validationMiddleware, user_1.updateInformations);
router.get('/get-user-info/:id', isAuth_1.isAuth, user_1.getUserInformations);
router.post('/set-profile-picture/:imageId', isAuth_1.isAuth, images_1.setProfilePicture);
router.get('/get-profile-picture', isAuth_1.isAuth, images_1.getProfilePicture);
router.get('/single-user/:id', isAuth_1.isAuth, user_1.getSingleUser);
router.get('/get-all', isAuth_1.isAuth, user_1.getAllUnfollowed);
router.get('/get-all-users', isAuth_1.isAuth, user_1.getAllUsers);
router.get('/get-followers/:id', isAuth_1.isAuth, user_1.getFollowers);
router.get('/get-following/:id', isAuth_1.isAuth, user_1.getFollowing);
exports.default = router;
