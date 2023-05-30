"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuth_1 = require("../middleware/isAuth");
const images_1 = require("../controllers/images");
const router = (0, express_1.Router)();
router.get('/get-user-photos/:id', isAuth_1.isAuth, images_1.getPictures);
exports.default = router;
