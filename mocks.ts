import { Application, ContactPreference, LevelOfInterest } from "./types";

export const mockApplication: Application = {
  firstName: "Foo",
  lastName: "Bar",
  email: "foo@bar.com",
  phone: "0777 777 7777",
  includeAnswers: true,
  createdAt: new Date(1000000000).toISOString(),
  eventId: "123abc",
  discussionTopics: "",
  levelOfInterest: LevelOfInterest.Definitely,
  contactPreference: ContactPreference.Video,
};
