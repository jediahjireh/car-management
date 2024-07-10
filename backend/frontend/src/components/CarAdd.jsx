// CarAdd.jsx

// import React library and hook
import React, { useState } from "react";

// import component dealing with car data
import { addCar } from "./CarData";

// create CarAdd component
const CarAdd = ({ onCarAdded }) => {
  // state for new car form data
  const [newCarData, setNewCarData] = useState({
    make: "",
    model: "",
    seats: 0,
    imageUrl: "",
  });

  // function to handle car addition form submission data
  const handleSubmit = async (event) => {
    /** prevent default form submission behaviour
     * to allow custom handling of form data */
    event.preventDefault();

    // try-catch block
    try {
      // call function to add car item data
      const car = await addCar(newCarData);
      // trigger state update via communication of successful addition
      onCarAdded(car);
      // clear form data after adding car
      setNewCarData({ make: "", model: "", seats: 0, imageUrl: "" });
    } catch (error) {
      // log car item addition failure
      console.error("Error adding car:", error);
    }
  };

  return (
    // form for adding a new car item
    <form onSubmit={handleSubmit} className="centreForm">
      {/* submit button for adding new car (doubles as heading) */}
      <button type="submit" style={{ width: "100%" }}>
        Add A New Car
      </button>
      <br />
      <br />

      {/* label for car make input */}
      <label htmlFor="make">Make: </label>
      <br />
      {/* input field for car make */}
      <input
        type="text"
        id="make"
        name="make"
        value={newCarData.make}
        onChange={(e) => setNewCarData({ ...newCarData, make: e.target.value })}
        required
      />
      <br />

      {/* label for car model input */}
      <label htmlFor="model">Model: </label>
      <br />
      {/* input field for car model */}
      <input
        type="text"
        id="model"
        name="model"
        value={newCarData.model}
        onChange={(e) =>
          setNewCarData({ ...newCarData, model: e.target.value })
        }
        required
      />
      <br />

      {/* label for car seats input */}
      <label htmlFor="seats">Seats: </label>
      <br />
      {/* input field for car seats */}
      <input
        type="number"
        id="seats"
        name="seats"
        value={newCarData.seats}
        onChange={(e) =>
          setNewCarData({ ...newCarData, seats: parseInt(e.target.value) })
        }
        required
      />
      <br />

      {/* label for car image URL input */}
      <label htmlFor="imageUrl">Image URL: </label>
      <br />
      {/* input field for car image URL */}
      <input
        type="text"
        id="imageUrl"
        name="imageUrl"
        value={newCarData.imageUrl}
        onChange={(e) =>
          setNewCarData({ ...newCarData, imageUrl: e.target.value })
        }
        placeholder="https://"
        required
      />
      <br />
    </form>
  );
};

// export CarAdd component
export default CarAdd;
