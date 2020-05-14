const stories = (state = [], action) => {
  switch(action.type){
      case "VIEW":
          return [
            ...state,
          ]
      case "CREATE":
          return action.payload
      case "ACCEPT":
          return action.payload
          
      case "REJECT":
          return action.payload

      default: 
          return state
  }
}

export default stories