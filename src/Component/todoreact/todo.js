import React, { useState, useEffect } from "react";
import "./style.css";

const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  const addItem = () => {
    if (!inputdata) {
      alert("Please fill the data");
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      );


      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
        completed: false,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => curElem.id === index);
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => curElem.id !== index);
    setItems(updatedItems);
  };

  const toggleCompleted = (index) => {
    setItems(
      items.map((curElem) => {
        if (curElem.id === index) {
          return { ...curElem, completed: !curElem.completed };
        }
        return curElem;
      })
    );
  };

  const removeAll = () => {
    setItems([]);
  };



  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/to.jpg" alt="todologo" />
            <figcaption>Vatsal To Do List🙍✌️</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="📝 Add Your Items Here ✍️"
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>
          <div className="showItems">
            {items.map((curElem) => (
              <div
                className={`eachItem ${curElem.completed ? "completed" : ""}`}
                key={curElem.id}
              >
                <h3>{curElem.name}</h3>
                <div className="todo-btn">
                  <i
                    className="far fa-edit add-btn"
                    onClick={() => editItem(curElem.id)}
                  ></i>
                  <i
                    className="far fa-trash-alt add-btn"
                    onClick={() => deleteItem(curElem.id)}
                  ></i>
                  <i
                    className={`fas fa-check add-btn ${curElem.completed ? "completed" : ""}`}
                    onClick={() => toggleCompleted(curElem.id)}
                    style={{ fontSize: "1.5em" }}
                  ></i>
                </div>
              </div>
            ))}
          </div>
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span> CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
