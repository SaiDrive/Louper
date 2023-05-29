import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Card from "./components/Card";
import io from "socket.io-client";

function App() {
  const [data, setData] = useState([
    {
      title: "test1",
      body:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil. lasdofiajsdofjaiosfjaoisdjfiojasdoifjaoisdj foiaj sdofij aosdijf oiajds oifj aosdijf oiajs dfoijasodijf oiasjd foij asdoifj oaisd jfoaijds foi jasdoifj aodisjf oiadsj foia jsdoif jaosdif oaidsj foij aiosdfj oaidsj foiaj sdfoij adsoifj oaisdj foia jsdoifjaods ifjo iadsfjioas dfoia sdjfoijasd oif jaodsijf oji ",
    },
    {
      title: "test2",
      body:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
    },
  ]);

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        const todosData = response.data;
        setTodos(todosData);
      })
      .catch((error) => {
        console.log("Error fetching todos:", error);
      });
  };

  const uploadData = () => {
    const combinedData = [...data, ...todos];
    axios
      .post("http://localhost:5000/data", combinedData)
      .then((response) => {
        window.alert("Data uploaded successfully!");
      })
      .catch((error) => {
        console.log("Error uploading data:", error);
      });
  };

  const handleSocketFetch = () => {
    const socket = io("http://localhost:5000");
    socket.emit("get-data");
  };

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("receive-data", (data) => {
      // Saves received data to a variable and render it in the frontend
      
    });

    return () => {
      // Cleans up socket event listener on component unmount
      socket.off("receive-data");
    };
  }, []);

  return (
    <>
      <button onClick={handleSocketFetch}
        className="m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Socket Fetch</button>
      <button
        onClick={uploadData}
        className="m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Upload
      </button>
      {data.map((e, i) => (
        <Card key={i} title={e.title} body={e.body} />
      ))}
      {todos.map((e, i) => (
        <Card key={i} title={e.title} body={e.body} />
      ))}
    </>
  );
}

export default App;
