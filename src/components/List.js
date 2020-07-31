import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const URL = "https://api.airtable.com/v0/appr3HquTZkYJZxod/Table%201";
const KEY = "keyTdtSrExEdcEV7r";

export default function List() {
  const [todoList, updateTodoList] = useState([]);
  const [input, updateInput] = useState("");

  useEffect(() => {
    makeRequest();
  }, []);

  const makeRequest = async () => {
    try {
      let res = await axios(URL, {
        headers: { Authorization: `Bearer ${KEY}` },
      });
      updateTodoList(res.data.records);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    let res = await axios.post(
      URL,
      { records: [{ fields: { item: input } }] },
      { headers: { Authorization: `Bearer ${KEY}` } }
    );
    updateTodoList([...todoList, ...res.data.records]);
  };

  return (
    <div>
      <ul>
        {todoList.map((todoItem) => {
          return (
            <li>
              <Link to={`/item/${todoItem.id}`}>{todoItem.fields.item}</Link>
            </li>
          );
        })}
      </ul>

      <form onSubmit={(e) => handleCreate(e)}>
        <input
          type="text"
          value={input}
          placeholder="Create a todo item"
          onChange={(e) => updateInput(e.target.value)}
        />
        <button type="submit">Create Item</button>
      </form>
    </div>
  );
}
