import fs from "fs";

class AircraftsFsModel {
    constructor() {
        this.filePath = "./aircrafts.json";
        this.initializeFile();
    }

    // constructor() {
    //     this.entities = "aircrafts.json"
    // }

    initializeFile = async () => {
        try {
            await fs.promises.access(this.filePath);
        } catch {
            await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 2));
        }
    };

    getAllAircrafts = async () => {
        const aircraftsJs = await fs.promises.readFile(this.filePath, "utf-8");
        return JSON.parse(aircraftsJs);
    };

    postAircrafts = async (aircraft) => {
        const aircrafts = await fs.promises.readFile(this.filePath, "utf-8");
        let aircraftsJs = JSON.parse(aircrafts)
        
        const {id, xa, ya, za} = aircraft
        const index = aircraftsJs.findIndex((a) => a.id == id)
        const collisions = this.checkCollisions(aircraft)
        if (index === -1) {
            aircraftsJs.push({id, xa, ya, za})
        } else {
            aircraftsJs[index] = {id, xa, ya, za}
        }

        await fs.promises.writeFile(aircrafts, JSON.stringify(entitiesJs, null, 2))

        return {
            aircraft: {id, xa, ya, za},
            collisions: collisions
        }
    };

    deleteAircrafts = async (identifier) => {
        const aircrafts = await fs.promises.readFile(this.filePath, "utf-8");
        let aircraftsJs = JSON.parse(aircrafts)
        const index = aircraftsJs.findIndex((a) => a.id === identifier)
        let msg = ""
        if (index === -1) {
            msg = "Aircratf inexistent"
        }
        else {
            aircraftsJs.splice(index, 1)
            await fs.promises.writeFile(aircrafts, JSON.stringify(entitiesJs, null, 2))
            msg = "Aircratf removed ok."
        }
        return msg
    };

    checkCollisions = (newAircraft) => {
        const collisionsIds = []

        if (this.aircrafts.length !== 0) {
            for (const aircraft of this.aircrafts) {
                if (aircraft.id === newAircraft.id) {
                    continue
                }
                const distance = this.calculateDistance(newAircraft, aircraft)
                if (distance < 500) {
                    collisionsIds.push(aircraft.id)
                }
            }
        }

        // for (const aircraft of this.aircrafts) {
        //     if (aircraft.id === newAircraft.id) {
        //         continue
        //     }
        //     const distance = this.calculateDistance(newAircraft, aircraft)
        //     if (distance < 500) {
        //         collisionsIds.push(aircraft.id)
        //     }
        // }

        return collisionsIds
    }


    calculateDistance = (aircraft1, aircraft2) => {
        const dx = aircraft1.xa - aircraft2.xa;
        const dy = aircraft1.ya - aircraft2.ya;
        const dz = aircraft1.za - aircraft2.za;
        return Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2);
    }


}

export default AircraftsFsModel;