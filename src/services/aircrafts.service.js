import AircraftsFactory from "../models/AircraftsFactory.js";


class AircraftsService {
    constructor() {
        this.model = AircraftsFactory.get(process.env.PERSISTENCE);
    }

    getAllAircrafts = async () => {
        const aircrafts = await this.model.getAllAircrafts();
        return aircrafts
    };

    postAircrafts = async (aircraft) => {
        const newAircraft = await this.model.postAircrafts(aircraft);
        return newAircraft
    };

    deleteAircrafts = async (identifier) => {
        const removedAircraft = await this.model.deleteAircrafts(identifier);
        return removedAircraft
    };


}

export default AircraftsService;