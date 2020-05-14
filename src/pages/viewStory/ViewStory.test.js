import { acceptOrRejectStory } from "./ViewStory";

describe("View story page", () => {
  test("I can accept a story", () => {
    let stories = [
      {
        id: 1,
        summary: "A test summary",
        description: "A test description",
      },
      {
        id: 2,
        summary: "Another test summary",
        description: "Another test description",
      },
    ];

    expect(acceptOrRejectStory(stories, "accepted", 1)).toEqual([
      {
        id: 1,
        summary: "A test summary",
        description: "A test description",
        status: "accepted",
      },
      {
        id: 2,
        summary: "Another test summary",
        description: "Another test description",
      },
    ]);
  });

  test("I can reject a story", () => {
    let stories = [
      {
        id: 1,
        summary: "A test summary",
        description: "A test description",
      },
      {
        id: 2,
        summary: "Another test summary",
        description: "Another test description",
      },
    ];

    expect(acceptOrRejectStory(stories, "rejected", 2)).toEqual([
      {
        id: 1,
        summary: "A test summary",
        description: "A test description",
      },
      {
        id: 2,
        summary: "Another test summary",
        description: "Another test description",
        status: "rejected",
      },
    ]);
  });
});
