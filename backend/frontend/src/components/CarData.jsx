// CarData.jsx

// import fetch for making HTTP requests
import fetch from "isomorphic-fetch";

// function to fetch cars data from API
export const fetchCars = async () => {
  // try-catch block
  try {
    // fetch cars data from API
    const res = await fetch("/api");

    // parse response as JSON
    const data = await res.json();

    // return fetched data
    return data;
  } catch (error) {
    // log error if fetching fails
    console.error("Error fetching cars:", error);
  }
};

// function to new add car
export const addCar = async (newCarData) => {
  // try-catch block
  try {
    // send POST request to add new car
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCarData),
    });

    // parse response as JSON
    const data = await response.json();

    // return data to update cars state with new car data
    return data.car;
  } catch (error) {
    // log error if adding car fails
    console.error("Error adding car:", error);
  }
};

// function to update car data
export const updateCar = async (id, updatedCarData) => {
  // try-catch block
  try {
    // send PUT request to update car
    const response = await fetch(`/api/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCarData),
    });

    // parse response as JSON
    const data = await response.json();

    // return data to update cars state with updated car data
    return data.car;
  } catch (error) {
    // log error if updating car fails
    console.error("Error updating car:", error);
  }
};

// function to delete car
export const deleteCar = async (id) => {
  // try-catch block
  try {
    const response = await fetch(`/api/${id}`, {
      method: "DELETE",
    });

    // check if response is successful
    if (!response.ok) {
      // log error if car deletion fails
      console.error("Failed to delete car");
    }
  } catch (error) {
    // log error if car deletion fails due to error occurrence
    console.error("Error deleting car:", error);
  }
};
