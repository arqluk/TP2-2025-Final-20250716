import express from "express";
import AircraftsController from "../controllers/aircrafts.controller.js";
import validationMiddleware from "../middleware/validation.middleware.js";

class AircraftsRoutes {
    constructor() {
        this.router = express.Router();
        this.controller = new AircraftsController();
    }

    start() {
        this.router.get("/aircrafts", this.controller.getAllAircrafts);

        this.router.post("/aircrafts", validationMiddleware.validateId, validationMiddleware.validateCoordinates, this.controller.postAircrafts);
        // this.router.post("/aircrafts", this.controller.postAircrafts);

        this.router.delete("/aircrafts/delete/:identifier", this.controller.deleteAircrafts);

        return this.router;
    }
}

export default AircraftsRoutes;