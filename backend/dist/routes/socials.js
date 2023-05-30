"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const socials_1 = require("../controllers/socials");
const isAuth_1 = require("../middleware/isAuth");
const router = (0, express_1.Router)();
router.post('/follow-user/:id', isAuth_1.isAuth, socials_1.followUser);
router.post('/unfollow-user/:id', isAuth_1.isAuth, socials_1.unfollowUser);
exports.default = router;
