import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const URL = "https://api.airtable.com/v0/appr3HquTZkYJZxod/Table%201";
const KEY = "keyTdtSrExEdcEV7r";
export default function ShowItem() {
  const params = useParams();
  const { id } = params;
  const [todoItem, setTodoItem] = useState({});
  const [input, updateInput] = useState("");

  const makeRequest = async () => {
    let res = await axios(`${URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${KEY}`,
      },
    });
    setTodoItem(res.data);
  };

  useEffect(() => {
    makeRequest();
  }, []);

  useEffect(() => {
    if (todoItem.hasOwnProperty("fields")) updateInput(todoItem.fields.item);
  }, [todoItem.fields]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await axios.patch(
      `${URL}/${id}`,
      {
        fields: { item: input },
      },
      {
        headers: {
          Authorization: `Bearer ${KEY}`,
        },
      }
    );
    setTodoItem(res.data);
  };

  console.log(params);
  if (!todoItem.hasOwnProperty("fields")) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>{todoItem.fields.item}</div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          value={input}
          placeholder="update Item"
          onChange={(e) => updateInput(e.target.value)}
        />
      </form>
    </div>
  );
}
