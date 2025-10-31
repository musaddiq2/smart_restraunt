import express from "express";
import { createRestaurant, updateRestaurant } from "../controllers/restaurantController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { restaurantSchema } from "../validations/restaurantValidation.js";


const router = express.Router();


router.post("/", validateRequest(restaurantSchema), createRestaurant);
router.put("/:id", validateRequest(restaurantSchema), updateRestaurant);


export default router;