
import { validateInput } from "./Login";


describe("login page", () => {
  
  test("if email is empty", () => {
    expect(validateInput("","")).toEqual("Email is empty")
  })

  test("if email is valid", () => {
    expect(validateInput("hello", "")).toEqual("Email is invalid")
  })

  test("if password is empty", () => {
    expect(validateInput("hello@gmail.com", "")).toEqual("Password is empty")
  })

  test("if password length is short", () => {
    expect(validateInput("hello@gmail.com", "123")).toEqual("Password is less than the required characters of five(5)")
  })

  test("if input is valid", () => {
    expect(validateInput("hello@gmail.com", "123456")).toEqual("Input is valid")
  })


})