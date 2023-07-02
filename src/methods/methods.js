import axios from "axios";
import { message } from "antd";

const loadStates = (setStates) => {
    axios
        .get("http://localhost:3001/state")
        .then((response) => {
            setStates(response.data);
        })
        .catch((error) => {
            message.error("An error occurred!");
        });
};

const loadCities = (setCities) => {
    axios
        .get("http://localhost:3001/city")
        .then((response) => {
            setCities(response.data);
        })
        .catch((error) => {
            message.error("An error occurred!");
        });
};

const loadClasses = (setClasses) => {
    axios.get("http://localhost:3001/class").then((response)=>{
        setClasses(response.data)
    }).catch((error) => {
        message.error("An error occured!")
    })
}

const loadCompanies = (setCompanies) => {
    axios.get("http://localhost:3001/company").then((response)=>{
        setCompanies(response.data)
    }).catch((error) => {
        message.error("An error occured!")
    })
}

const loadModels = (setModels) => {
    axios.get("http://localhost:3001/model").then((response)=>{
        setModels(response.data)
    }).catch((error) => {
        message.error("An error occured!")
    })
}

const loadVehicles = (setVehicles) => {
    axios.get("http://localhost:3001/vehicle").then((response)=>{
        setVehicles(response.data)
    }).catch((error) => {
        message.error("An error occured!")
    })
}

const loadReservations = (setReservations) => {
    axios.get("http://localhost:3001/reservations").then((response)=>{
        setReservations(response.data)
    }).catch((error) => {
        message.error("An error occured!")
    })
}

export { loadCities, loadStates, loadClasses, loadCompanies, loadModels, loadVehicles, loadReservations };
