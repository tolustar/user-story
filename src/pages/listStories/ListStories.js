import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import "./ListStories.css";

import allActions from "./../../store/actions";
import LogoutButton from "./../../components/LogoutButton";

export const sortFunction = (array, key, order) => {
  let result = [];
  if (order === "Asc") {
    result = array.sort((a, b) => (a[key] > b[key] ? 1 : -1));
  } else {
    result = array.sort((a, b) => (b[key] > a[key] ? 1 : -1));
  }

  return result;
};

export const filterFunction = (array, value) => {
  return array.filter((item) =>
    item.type.toLowerCase().includes(value.toLowerCase())
  );
};

export default function ListStories() {
  const history = useHistory();

  const currentUser = useSelector((state) => state.currentUser);
  const allStories = useSelector((state) => state.stories);
  const dispatch = useDispatch();

  const [stories, setStories] = useState([]);
  const [tempStories, setTempStories] = useState([]);
  const [filter, setFilter] = useState("");

  const getAllStories = () => {
    axios
      .get("http://localhost:3000/api/v1/stories", {
        params: {},
        headers: {
          Authorization: `${currentUser.details.token}`,
        },
      })
      .then((response) => {
        setTempStories(response.data);
        setStories(response.data.sort((a, b) => a.id - b.id));

        dispatch(allActions.storyActions.createStory(response.data));
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const sortTableById = (event) => {
    let sortStories = "";

    sortStories = sortFunction(stories, "id", event.target.value);

    sortStories = JSON.parse(JSON.stringify(sortStories));
    setStories(sortStories);
  };

  const sortTableByComplexity = (event) => {
    let sortStories = "";

    sortStories = sortFunction(stories, "complexity", event.target.value);

    sortStories = JSON.parse(JSON.stringify(sortStories));
    setStories(sortStories);
  };

  const filterTable = (event) => {
    setFilter(event.target.value);

    let filterStories = filterFunction(tempStories, event.target.value);

    filterStories = filterStories.sort((a, b) => a.id - b.id);

    filterStories = JSON.parse(JSON.stringify(filterStories));
    setStories(filterStories);
  };

  const viewStory = (id) => {
    if (currentUser.details.role === "Admin") {
      history.push(`/stories/${id}`);
    }
  };

  useEffect(() => {
    if (allStories.length === 0 || currentUser.details.role === "user") {
      getAllStories();
    } else {
      setTempStories(allStories);
      setStories(allStories.sort((a, b) => a.id - b.id));
    }

    console.log(allStories);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="list-stories">
      <LogoutButton />
      <div className="container">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <div className="list-stories-table-container d-flex flex-column align-items-center ">
              <h3 className="mt-3">
                All Stories
                {currentUser.details.role === "user" && (
                  <span> available for review</span>
                )}
              </h3>
              {currentUser.details.role === "user" && (
                <Link to="/create-stories" className="mt-2 mb-3">
                  Create another Story
                </Link>
              )}

              <div className="row mb-3">
                <div className="col-md-4 mb-2">
                  Sort by ID:<br/>
                  <select onChange={sortTableById}>
                    <option>Asc</option>
                    <option>Desc</option>
                  </select>
                </div>

                <div className="col-md-4 mb-2">
                  Sort by Complexity: <br/>
                  <select onChange={sortTableByComplexity}>
                    <option>Asc</option>
                    <option>Desc</option>
                  </select>
                </div>

                <div className="col-md-4 mb-2">
                  Filter <br/>
                  <input
                    type="text"
                    placeholder="by type"
                    className="form-control"
                    value={filter}
                    onChange={filterTable}
                  />
                </div>
              </div>

              <table className="table list-stories-table table-responsive">
                <thead className="bg-light border">
                  <tr>
                    <th>ID</th>
                    <th>Summary</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Complexity</th>
                    <th>Estimated Hrs</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {stories.map((story, index) => {
                    let storyClass = "";

                    if (currentUser.details.role === "Admin") {
                      storyClass = "bg-dark text-white";

                      if (story.status === "accepted") {
                        storyClass = "bg-success text-white";
                      }

                      if (story.status === "rejected") {
                        storyClass = "bg-danger text-white";
                      }
                    }

                    return (
                      <tr
                        key={index}
                        onClick={() => viewStory(story.id)}
                        className={`${storyClass}`}>
                        <td>{story.id}</td>
                        <td>{story.summary}</td>
                        <td>{story.description}</td>
                        <td>{story.type}</td>
                        <td>{story.complexity}</td>
                        <td>{story.estimatedHrs}</td>
                        <td>{story.cost}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </div>
  );
}
