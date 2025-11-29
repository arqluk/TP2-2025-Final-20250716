import AircraftsMemModel from "./DAO/aircrafts.mem.model.js";
import AircraftsFsModel from "./DAO/aircrafts.fs.model.js";

class AircraftsFactory {
    static get(persistence) {
        switch (persistence) {
            case "MEM":
                console.log("Persistiendo en la memoria del servidor.");
                return new AircraftsMemModel();
            case "FS":
                console.log("Persistiendo en File System.");
                return new AircraftsFsModel();
            default:
                console.log("Persistiendo en la memoria default.");
                return new AircraftsMemModel();
        }
    }
}

export default AircraftsFactory;