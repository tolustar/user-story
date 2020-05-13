const createStory = (story) => {
  return {
      type: "CREATE",
      payload: story
  }
}

const viewStories = () => {
  return {
      type: "VIEW"
  }
}

const acceptStory = (story) => {
  return {
      type: "ACCEPT",
      payload: story
  }
}

const rejectStory = (story) => {
  return {
      type: "REJECT",
      payload: story
  }
}

export default {
  createStory,
  viewStories,
  acceptStory,
  rejectStory,
}