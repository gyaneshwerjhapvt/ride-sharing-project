import express from "express";
import * as controller from "../controllers/rating.controller.js";

const router = express.Router();

router.post("/", controller.create_rating);
router.get("/", controller.list_ratings);
router.get("/ride/:ride_id", controller.list_ratings_by_ride);
router.get("/user/:user_id", controller.list_ratings_by_user);

export default router;
