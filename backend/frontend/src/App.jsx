// import React library and hooks
import React, { useEffect, useState } from "react";

// import function from module to fetch car data
import { fetchCars } from "./components/CarData";

// import component for adding new cars
import CarForm from "./components/CarAdd";

// import component for displaying the list of cars
import CarList from "./components/CarList";

// define App component
const App = () => {
  // state to store list of cars
  const [cars, setCars] = useState([]);

  // useEffect to load cars data on component mount
  useEffect(
    () => {
      // define async function to fetch and set cars data
      const loadCars = async () => {
        // try-catch block
        try {
          // call fetchCars function to get car data
          const data = await fetchCars();
          // update cars state with fetched data
          setCars(data);
        } catch (error) {
          // log error if fetching cars data fails
          console.error("Error loading cars:", error);
        }
      };

      // call loadCars function to fetch cars data
      loadCars();
    },
    // empty dependency array to ensure that this runs once (on mount)
    []
  );

  // function to handle adding a new car
  const handleCarAdded = (car) => {
    // add new car to the cars state
    setCars([...cars, car]);
  };

  // function to handle updating a car
  const handleCarUpdated = (updatedCar) => {
    // update cars state with the updated car data
    setCars(cars.map((car) => (car.id === updatedCar.id ? updatedCar : car)));
  };

  // function to handle deleting a car
  const handleCarDeleted = (id) => {
    // remove car with the specified id from cars state
    setCars(cars.filter((car) => car.id !== id));
  };

  // return JSX for rendering the component
  return (
    <div className="App">
      {/* heading for cars list */}
      <h1>Cars List</h1>
      {/* component to display the list of cars */}
      <CarList
        // pass current car list for rendering
        cars={cars}
        // call function to update component's state when car item is edited
        onCarUpdated={handleCarUpdated}
        // call function to delete car item from component's state when triggered
        onCarDeleted={handleCarDeleted}
      />
      {/* component for adding new car items */}
      <CarForm
        // call function to add a new car item to component's state when invoked
        onCarAdded={handleCarAdded}
      />
    </div>
  );
};

// export App component to be rendered by main.jsx
export default App;
