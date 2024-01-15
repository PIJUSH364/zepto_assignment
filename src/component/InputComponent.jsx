import React, { useEffect, useState } from "react";

export default function InputComponent() {
  // State variables
  const [searchText, setSearchText] = useState("");
  const [chipComponents, setChipComponents] = useState([]);
  const [listOfNames, setListOfNames] = useState([
    // Initial list of names
    "Aarav Sharma",
    "Sanya Patel",
    "Rahul Singh",
    "Ananya Kapoor",
    "Karan Verma",
    "Pooja Gupta",
    "Arjun Reddy",
    "Neha Yadav",
    "Vikram Chauhan",
    "Meera Khanna",
  ]);

  function debounce(func, delay) {
    let timeoutId;

    return function (...args) {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  const delayedFunction = debounce((event) => {
    setSearchText(event.target.value.trim());
  }, 500);

  // Create a chip component from a name
  const handleCreateChipComponent = (name) => {
    // Add the name to chip components and remove it from the list of names
    setChipComponents((prevValue) => [...prevValue, name]);
    setListOfNames((prevValue) => prevValue.filter((item) => item !== name));
  };

  // Remove a chip component
  const handleRemoveChipComponent = (name) => {
    // Add the name back to the list of names and remove it from chip components
    setListOfNames((prevValue) => [...prevValue, name]);
    setChipComponents((prevValue) => prevValue.filter((item) => item !== name));
  };

  useEffect(() => {}, [searchText]);

  // JSX for the component
  return (
    <div
      style={{
        padding: "1rem",
        width: "50rem",
      }}
    >
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {/* Display chip components */}
        {chipComponents &&
          chipComponents.map((name, key) => (
            <button key={key} style={chipComponentStyle}>
              <span
                style={{
                  ...iconStyle,
                  color: getRandomColor(),
                  background: getRandomColor(),
                }}
              >
                {name[0]}
              </span>
              {name}{" "}
              <span
                style={cancelIconStyle}
                onClick={() => handleRemoveChipComponent(name)}
              >
                X
              </span>
            </button>
          ))}
      </div>
      <div style={{ maxWidth: "50%" }}>
        <div style={{ borderBottom: "2px solid blue", paddingTop: "0.5rem" }}>
          {/* Input for searching */}
          <input
            type="text"
            placeholder="search..."
            onChange={(event) => delayedFunction(event)}
            style={inputFieldStyle}
          />
        </div>
        {listOfNames.filter((name) =>
          name.toLowerCase().includes(searchText.toLowerCase())
        ).length > 0 && (
          <div
            style={{
              backgroundColor: "whitesmoke",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              padding: "1rem 2rem",
              width: "fit-content",
            }}
          >
            {/* Display names based on the search */}
            {listOfNames &&
              listOfNames
                .filter((name) =>
                  name.toLowerCase().includes(searchText.toLowerCase())
                )
                .map((name, key) => (
                  <button
                    style={{
                      ...chipComponentStyle,
                      width: "fit-content",
                      cursor: "pointer",
                    }}
                    key={key}
                    onClick={() => handleCreateChipComponent(name)}
                  >
                    <span
                      style={{
                        ...iconStyle,
                        color: getRandomColor(),
                        background: getRandomColor(),
                      }}
                    >
                      {name[0]}
                    </span>
                    {name}
                  </button>
                ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Styles
const inputFieldStyle = {
  width: "100%",
  outline: "none",
  border: "none",
};

const iconStyle = {
  borderRadius: "50%",
  padding: "0.3rem 0.45rem",
  marginRight: "0.2rem",
};

const cancelIconStyle = {
  borderRadius: "50%",
  padding: "0.3rem 0.45rem",
  color: "red",
  marginRight: "0.2rem",
  cursor: "pointer",
};

const chipComponentStyle = {
  backgroundColor: "gainsboro",
  borderRadius: "15px",
  padding: "0.4rem",
  border: "none",
  whiteSpace: "nowrap",
};

// Function to generate a random RGB color
const getRandomColor = () => {
  const randomR = Math.floor(Math.random() * 256);
  const randomG = Math.floor(Math.random() * 256);
  const randomB = Math.floor(Math.random() * 256);

  return `rgb(${randomR}, ${randomG}, ${randomB})`;
};
