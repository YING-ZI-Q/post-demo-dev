import { defineMock } from "umi";
import { sub } from "date-fns"

export default defineMock({
  "/api/users": [
    {
      id: "1",
      name: "Tom"
    },
    {
      id: "2",
      name: 'Jane'
    }
  ],
});