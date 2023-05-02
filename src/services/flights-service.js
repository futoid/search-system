const {FlightRespository, AirplaneRespository} = require('../repository/index');
const { compareTime } = require('../utils/helper');

class FlightService {
    constructor() {
        this.flightrespository = new FlightRespository();
        this.airplaneRespository = new AirplaneRespository();
    }
    async createFlight(data) {
        try {
            if(!compareTime(data.arrivalTime, data.departureTime)) {
                throw {error: 'Arrival time cannot be less than departure time'};
            }
            const airplane = await this.airplaneRespository.getAirplane(data.airplaneId);
            const flight = await this.flightrespository.createFlight({
                ...data, totalSeats:airplane.capacity 
            });
            return flight;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw {error};
        }
    }

    async getFlightData() {
        // todo
    }
}

module.exports = FlightService;