// CarList.jsx

// import React library
import React from "react";

// import component containing data concerning car items
import CarItem from "./CarItem";

// create CarList component
const CarList = ({ cars, onCarUpdated, onCarDeleted }) => {
  return (
    // unordered list for displaying cars
    <ul>
      {/* map through cars array and render each car item */}
      {cars.map((car) => (
        // car list item's data
        <CarItem
          // unique key for each car list item
          key={car.id}
          // car list item's associated data
          car={car}
          // pass callback function to CarItem for updating car data
          onCarUpdated={onCarUpdated}
          // pass callback function to CarItem for deleting a car item
          onCarDeleted={onCarDeleted}
        />
      ))}
    </ul>
  );
};

// export CarList component
export default CarList;
