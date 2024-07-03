// CarItem.jsx

// import React library and hooks
import React, { useEffect, useState } from "react";

// import from component dealing with car data
import { deleteCar, updateCar } from "./CarData";

// create CarItem component
const CarItem = ({ car, onCarUpdated, onCarDeleted }) => {
  // state to track edit mode for each car
  const [editMode, toggleEditMode] = useState(false);
  // temporary state for model during edit
  const [tempModel, setTempModel] = useState(car.model);
  // temporary state for seats during edit
  const [tempSeats, setTempSeats] = useState(car.seats);

  // useEffect to reset temporary variables when car prop changes
  useEffect(
    () => {
      // reset temporary model variable
      setTempModel(car.model);
      // reset temporary seats variable
      setTempSeats(car.seats);
    },
    // effect runs each time the car prop changes
    [car]
  );

  // function called if user saves their edits
  const handleSave = async () => {
    try {
      // call function to update car data
      const updatedCar = await updateCar(car.id, {
        ...car,
        model: tempModel,
        seats: tempSeats,
      });

      // trigger state update via communication of successful edit
      onCarUpdated(updatedCar);

      // toggle edit mode once data saved
      toggleEditMode(false);
    } catch (error) {
      // log error if update fails
      console.error("Error updating car:", error);
    }
  };

  // function to delete car item
  const handleDelete = async () => {
    try {
      await deleteCar(car.id);
      onCarDeleted(car.id);
    } catch (error) {
      // log error if deletion fails
      console.error("Error deleting car:", error);
    }
  };

  // function to handle seat count increment or decrement
  const handleSeatChange = (amount) => {
    // update temporary seats state by amount
    setTempSeats((prevSeats) => prevSeats + amount);
  };

  // function to handle cancelling of edit
  const handleCancel = () => {
    // reset temp model variable to current car model value
    setTempModel(car.model);
    // reset temp seats variable to current car seats value
    setTempSeats(car.seats);
    // toggle (turn off) edit mode state
    toggleEditMode(false);
  };

  // return car item data
  return (
    // there is a unique key for each car list item
    <li>
      {/* car make heading */}
      <h3>{car.make}</h3>
      {/* image tag for displaying car image */}
      <img
        src={car.imageUrl}
        alt={`${car.make} ${car.model}`}
        style={{ width: "100%" }}
      />
      {/* render edit mode based on editMode state */}
      {!editMode ? (
        // fragment for conditional rendering
        <>
          {/* non-editable view (default state) */}
          <p>
            {/* italicised model name */}
            <i>{car.model}</i>
          </p>
          {/* display number of seats */}
          <p>Seats: {car.seats}</p>
          {/* buttons to edit car information */}
          <div>
            {/* edit button to toggle edit mode */}
            <button onClick={() => toggleEditMode(true)}>Edit</button>
            &nbsp;
            {/* delete car button */}
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      ) : (
        // fragment for conditional rendering in edit mode
        <>
          {/* display edit mode field and buttons */}
          <p>
            {/* input field for editing model */}
            <input
              type="text"
              value={tempModel}
              onChange={(e) => setTempModel(e.target.value)}
            />
          </p>
          <p>
            Seats: {tempSeats}
            {/* button to increment seat count */}
            <button onClick={() => handleSeatChange(1)}> + </button>
            {/* button to decrement seat count */}
            <button onClick={() => handleSeatChange(-1)}> - </button>
          </p>
          {/* save button for saving edits */}
          <button onClick={handleSave}>Save</button>
          &nbsp;
          {/* cancel button to exit edit mode via toggle off */}
          <button onClick={handleCancel}>Cancel</button>
        </>
      )}
    </li>
  );
};

// export CarItem component
export default CarItem;
