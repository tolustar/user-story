import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import allActions from "./../../store/actions";
import "./CreateStory.css";

export const validateStoryInput = (
  summary,
  description,
  type,
  complexity,
  estimatedHrs,
  cost,
) => {
  if (summary.length === 0) return "Summary field is empty";
  if (description.length === 0) return "Description field is empty";
  if (type.length === 0) return "Type field is empty";
  if (complexity.length === 0) return "Complexity field is empty";
  if (estimatedHrs.length === 0) return "Estimated Hours field is empty";
  if (cost.length === 0) return "Cost field is empty";

  let typeValue = {enhancement: true, bugfix: true, development: true,  qa: true};
  if(typeValue[type] !== true) return "Invalid type";

  let complexityValue = {low: true, mid: true, high: true}
  if(complexityValue[complexity] !== true) return "Invalid complexity";
 

  return "Story is valid";
};

export default function CreateStory() {
  const [story, setStory] = useState({
    summary: "",
    description: "",
    type: "enhancement",
    complexity: "low",
    estimatedHrs: "",
    cost: "",
  });

  const [errorMessage, displayErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);

  const createStory = (event) => {
    event.preventDefault();
    displayErrorMessage(null);
    setLoading(true);

    const getResult = validateStoryInput({story});

    if (getResult === "Story is valid") {
      
      axios
        .post("http://localhost:3000/api/v1/stories", story, {
          headers: {
            Authorization: `${currentUser.details.token}`
          }
        })
        .then((response) => {
          dispatch(allActions.storyActions.createStory(response.data));
          setLoading(false);
        })
        .catch((error) => {
          displayErrorMessage("An error occured, please try again");
          setLoading(false);
        });
    } else {
      displayErrorMessage(getResult);
      setLoading(false);
    }
  };

  return (
    <div className="create-story">
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="current-user text-center">
              Current User - {currentUser.details.firstName} {currentUser.details.lastName}
            </div>

            <div className="form-container">
              <h4 className="text-center">Create Story</h4>
              {errorMessage !== null && (
                <div className="bg-danger p-3 text-white text-center errorMessage">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={createStory}>
                <div className="summary-field">
                  <label htmlFor="summary">Summary</label>
                  <input
                    id="summary"
                    type="text"
                    className="form-control"
                    placeholder="I fixed a bug in the user dashboard"
                    value={story.summary}
                    onChange={(e) => {
                      setStory({ ...story, summary: e.target.value });
                    }}
                  />
                </div>

                <div className="description-field">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    type="text"
                    className="form-control"
                    placeholder="Please enter the description"
                    value={story.description}
                    onChange={(e) => {
                      setStory({ ...story, description: e.target.value });
                    }}
                  />
                </div>

                <div className="type-field">
                  <label htmlFor="type">Type</label>
                  <div>
                    <select
                      id="type"
                      onChange={(e) => {
                        setStory({ ...story, type: e.target.value });
                      }}>
                      <option>enhancement</option>
                      <option>bugfix</option>
                      <option>development</option>
                      <option>qa</option>
                    </select>
                  </div>
                </div>

                <div className="complexity-field">
                  <label htmlFor="complexity">Complexity</label>
                  <div>
                    <select
                      id="complexity"
                      onChange={(e) => {
                        setStory({ ...story, complexity: e.target.value });
                      }}>
                      <option>low</option>
                      <option>mid</option>
                      <option>high</option>
                    </select>
                  </div>
                </div>

                <div className="hrs-field">
                  <label htmlFor="hrs">Estimated Hours</label>
                  <input
                    id="hrs"
                    type="text"
                    className="form-control"
                    placeholder="5 hours"
                    value={story.estimatedHrs}
                    onChange={(e) => {
                      setStory({ ...story, estimatedHrs: e.target.value });
                    }}
                  />
                </div>

                <div className="cost-field">
                  <label htmlFor="cost">Cost</label>

                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">$</span>
                    </div>
                    <input
                      id="cost"
                      type="number"
                      className="form-control"
                      placeholder="80000"
                      value={story.cost}
                      onChange={(e) => {
                        setStory({ ...story, cost: e.target.value });
                      }}
                      aria-label="Amount (to the nearest dollar)"
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <button
                    disabled={loading}
                    className="btn btn-primary"
                    onClick={createStory}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
}
