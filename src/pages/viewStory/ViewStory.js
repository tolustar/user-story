import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./ViewStory.css";

import LogoutButton from "./../../components/LogoutButton";

import allActions from "./../../store/actions";

export const acceptOrRejectStory = (stories, value, id) => {
  let getIndex = stories.findIndex((item) => item.id === parseInt(id));
  stories[getIndex].status = value;

  return stories;
};

export default function ViewStory() {
  const history = useHistory();
  let { id } = useParams();

  const currentUser = useSelector((state) => state.currentUser);
  const allStories = useSelector((state) => state.stories);
  const dispatch = useDispatch();

  const [story, setStory] = useState([]);

  const getStory = () => {
    if (currentUser.details.role !== "Admin") {
      history.push("/");
    }

    let retrieveStory = allStories.filter(
      (item) => item.id === parseInt(id)
    )[0];

    setStory(retrieveStory);
  };

  const updateStory = (value) => {
    let result = acceptOrRejectStory(allStories, value, id);

    dispatch(
      allActions.storyActions.createStory(
        JSON.parse(JSON.stringify(result))
      )
    );

    history.push("/stories");
  };

  useEffect(() => {
    getStory();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="list-stories">
      <LogoutButton />
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="list-stories-table-container d-flex flex-column align-items-center">
              <h4 className="mt-2 mb-4">View Story - {story.summary} </h4>

              <div className="d-flex flex-column mb-3 mt-4">

                <div className="mb-3">
                  <strong>Summary</strong> - {story.summary}
                </div>
                <div className="mb-3">
                  <strong>Description</strong> - {story.description}
                </div>

                <div className="mb-3">
                  <strong>Type</strong> - {story.type}
                </div>

                <div className="mb-3">
                  <strong>Complexity</strong> - {story.complexity}
                </div>

                <div className="mb-3">
                  <strong>Estimated Hours</strong> -{story.estimatedHrs}
                </div>
                <div className="mb-3">
                  <strong>Cost</strong> - {story.cost}
                </div>
                <div className="mb-3">
                  <strong>Status</strong> - {story.status === null ? "Waiting for review" : story.status }
                </div>
              </div>

              <div>
                <button
                  className="btn btn-success mr-3"
                  onClick={() => updateStory("accepted")}>
                  Accept
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => updateStory("rejected")}>
                  Reject
                </button>
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
