import { http, HttpResponse } from "msw";
import { USER_1, USER_2 } from "./user";
import { ESTIMATES_FIXTURE } from "./estimates";

export const handlers = [
  http.get("https://api.example.com/users", () => {
    return HttpResponse.json([USER_1, USER_2]);
  }),
  http.get("https://api.example.com/estimates/", ({ request }) => {
    const id = request.url.split("/").at(-1);
    return HttpResponse.json(ESTIMATES_FIXTURE.find(e => e.id === id));
  }),
];
