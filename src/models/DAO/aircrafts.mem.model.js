class AircraftsMemModel {
    constructor() {
        this.aircrafts = [
            { id: "AAB123", xa: 7500, ya: 6200, za: 1000 },
            { id: "BBG456", xa: 8000, ya: 7000, za: 1200 },
        ];
    }

    getAllAircrafts = async () => {
        return await this.aircrafts
    };

    postAircrafts = async (aircraft) => {
        const {id, xa, ya, za} = aircraft
        const index = this.aircrafts.findIndex((a) => a.id == id)
        const collisions = this.checkCollisions(aircraft)
        if (index === -1) {
            this.aircrafts.push({id, xa, ya, za})
        } else {
            // this.aircrafts[index] = {id, xa, ya, za}

            this.aircrafts[index] = {
            ...this.aircrafts[index], // conserva propiedades previas
            id,
            xa,
            ya,
            za
        };

        }
        return {
            aircraft: {id, xa, ya, za},
            collisions: collisions
        }
    };

    deleteAircrafts = async (identifier) => {
        const index = this.aircrafts.findIndex((a) => a.id == identifier)
        let msg = ""
        if (index === -1) {
            msg = "Aircratf inexistent"
        } else {
            this.aircrafts.splice(index, 1)
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

        return collisionsIds
    }


    calculateDistance = (aircraft1, aircraft2) => {
        const dx = aircraft1.xa - aircraft2.xa;
        const dy = aircraft1.ya - aircraft2.ya;
        const dz = aircraft1.za - aircraft2.za;
        return Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2);
    }

}

export default AircraftsMemModel  