import { defineMock } from "umi";
import { sub } from "date-fns"

export default defineMock({
  "/api/posts": [
    {
      id: "1",
      title: "test",
      content: "dev",
      user: "1",
      date: sub(new Date(), { minutes: 10 }).toISOString(), 
      reactions: {}
    },
    {
      id: "2",
      title: "test2",
      content: "dev2",
      user: "1",
      date: sub(new Date(), { minutes: 5 }).toISOString(), 
      reactions: {}
    }
  ],
});