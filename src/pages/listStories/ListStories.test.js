import { sortFunction, filterFunction } from "./ListStories";

describe("List stories page", () => {
  test("I can sort a story by id in ascending order", () => {
    let stories = [
      {
        id: 1,
        summary: "A test summary",
        description: "A test description",
        complexity: "low",
        type: "bugfix",
      },
      {
        id: 4,
        summary: "User admin summary",
        description: "Another test description",
        complexity: "high",
        type: "development",
      },
      {
        id: 2,
        summary: "Another test summary",
        description: "Another test description",
        complexity: "high",
        type: "development",
      },
    ];

    expect(sortFunction(stories, "id", "Asc")).toEqual([
      {
        id: 1,
        summary: "A test summary",
        description: "A test description",
        complexity: "low",
        type: "bugfix",
      },
      {
        id: 2,
        summary: "Another test summary",
        description: "Another test description",
        complexity: "high",
        type: "development",
      },
      {
        id: 4,
        summary: "User admin summary",
        description: "Another test description",
        complexity: "high",
        type: "development",
      },
    ]);
  });

  test("I can sort a story by id in descending order", () => {
    let stories = [
      {
        id: 1,
        summary: "A test summary",
        description: "A test description",
        complexity: "low",
        type: "bugfix",
      },
      {
        id: 4,
        summary: "User admin summary",
        description: "Another test description",
        complexity: "high",
        type: "development",
      },
      {
        id: 2,
        summary: "Another test summary",
        description: "Another test description",
        complexity: "high",
        type: "development",
      },
    ];

    expect(sortFunction(stories, "id", "Desc")).toEqual([
      {
        id: 4,
        summary: "User admin summary",
        description: "Another test description",
        complexity: "high",
        type: "development",
      },
      {
        id: 2,
        summary: "Another test summary",
        description: "Another test description",
        complexity: "high",
        type: "development",
      },
      {
        id: 1,
        summary: "A test summary",
        description: "A test description",
        complexity: "low",
        type: "bugfix",
      },
    ]);
  });

  test("I can sort a story by complexity in ascending order", () => {
    let stories = [
      {
        id: 4,
        summary: "User admin summary",
        description: "Another test description",
        complexity: "high",
        type: "development",
      },
      {
        id: 1,
        summary: "A test summary",
        description: "A test description",
        complexity: "low",
        type: "bugfix",
      },
      {
        id: 2,
        summary: "Another test summary",
        description: "Another test description",
        complexity: "high",
        type: "development",
      },
    ];

    expect(sortFunction(stories, "complexity", "Asc")).toEqual([
      {
        id: 2,
        summary: "Another test summary",
        description: "Another test description",
        complexity: "high",
        type: "development",
      },
      {
        id: 4,
        summary: "User admin summary",
        description: "Another test description",
        complexity: "high",
        type: "development",
      },
      {
        id: 1,
        summary: "A test summary",
        description: "A test description",
        complexity: "low",
        type: "bugfix",
      },
    ]);
  });

  test("I can sort a story by complexity in descending order", () => {
    let stories = [
      {
        id: 1,
        summary: "A test summary",
        description: "A test description",
        complexity: "low",
        type: "bugfix",
      },
      {
        id: 4,
        summary: "User admin summary",
        description: "Another test description",
        complexity: "high",
        type: "development",
      },
      {
        id: 2,
        summary: "Another test summary",
        description: "Another test description",
        complexity: "high",
        type: "development",
      },
    ];

    expect(sortFunction(stories, "complexity", "Desc")).toEqual([
      {
        id: 1,
        summary: "A test summary",
        description: "A test description",
        complexity: "low",
        type: "bugfix",
      },
      {
        id: 2,
        summary: "Another test summary",
        description: "Another test description",
        complexity: "high",
        type: "development",
      },
      {
        id: 4,
        summary: "User admin summary",
        description: "Another test description",
        complexity: "high",
        type: "development",
      },
    ]);
  });

  test("I can sort a filer a story by type", () => {
    let stories = [
      {
        id: 1,
        summary: "A test summary",
        description: "A test description",
        complexity: "low",
        type: "bugfix",
      },
      {
        id: 4,
        summary: "User admin summary",
        description: "Another test description",
        complexity: "high",
        type: "development",
      },
      {
        id: 2,
        summary: "Another test summary",
        description: "Another test description",
        complexity: "high",
        type: "development",
      },
    ];

    expect(filterFunction(stories, "development")).toEqual([
      {
        id: 4,
        summary: "User admin summary",
        description: "Another test description",
        complexity: "high",
        type: "development",
      },
      {
        id: 2,
        summary: "Another test summary",
        description: "Another test description",
        complexity: "high",
        type: "development",
      },
    ]);
  });
});
