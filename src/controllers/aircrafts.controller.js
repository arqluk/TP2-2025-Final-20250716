import AircraftsService from "../services/aircrafts.service.js";

class AircraftsController {
    constructor() {
        this.service = new AircraftsService();
    }

    getAllAircrafts = async (req, res) => {
        const aircrafts = await this.service.getAllAircrafts();
        try {
            res.status(200).json({
                status: "Success",
                message: "Ok.",
                data: aircrafts,
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                data: error,
            });
        }
    };

    postAircrafts = async (req, res) => {
        const aircraft = req.body
        const newAircraft = await this.service.postAircrafts(aircraft);
        try {
            res.status(200).json({
                status: "Success",
                message: "Aircraft added ok",
                data: newAircraft,
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                data: error,
            });
        }
    };

    //  postEntities = async (req, res) => {
    //     const entity = req.body
    //     if( JSON.stringify(req.body) == "{}") {
    //     throw new Error("La entidad no tiene los parámetros válidos")
    // }
    //     const newEntity = await this.service.postEntities(entity)
    //     res.send(newEntity)
    // }

    deleteAircrafts = async (req, res) => {
        const { identifier } = req.params;
        const removedAircraft = await this.service.deleteAircrafts(identifier);
        try {
            res.status(200).json({
                status: "Success",
                message: removedAircraft,
            });
        } catch (error) {
            res.status(500).json({
                status: "Error",
                data: error,
            });
        }
    };

}

export default AircraftsController;
