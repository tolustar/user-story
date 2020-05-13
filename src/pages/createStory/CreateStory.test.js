
import { validateStoryInput } from "./CreateStory";


describe("create story page", () => {
  
  test("if summary field is empty", () => {
    expect(validateStoryInput("","fixing bugs","bugfix","high","5","5")).toEqual("Summary field is empty")
  })

  test("if description field is empty", () => {
    expect(validateStoryInput("bugs","","bugfix","high","5","5")).toEqual("Description field is empty")
  })

  test("if type field is empty", () => {
    expect(validateStoryInput("bugs","fixing bugs","","high","5","5")).toEqual("Type field is empty")
  })

  test("if complexity field is empty", () => {
    expect(validateStoryInput("bugs","fixing bugs","bugfix","","5","5")).toEqual("Complexity field is empty")
  })

  test("if estimated hours field is empty", () => {
    expect(validateStoryInput("bugs","fixing bugs","bugfix","high","","5")).toEqual("Estimated Hours field is empty")
  })

  test("if cost field is empty", () => {
    expect(validateStoryInput("bugs","fixing bugs","bugfix","high","5","")).toEqual("Cost field is empty")
  })

  test("if complexity has invalid value", () => {
    expect(validateStoryInput("bugs","fixing bugs","bugfix","very high","5","5")).toEqual("Invalid complexity")
  })

  test("if type has invalid value", () => {
    expect(validateStoryInput("bugs","fixing bugs","bugfixes","very high","5","5")).toEqual("Invalid type")
  })

})