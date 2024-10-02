import { http, HttpResponse } from "msw";
import { USERS } from "./user";
import { ESTIMATES_FIXTURE } from "./estimates";

export const handlers = [
  // get all users
  http.get("https://api.example.com/users", () => {
    return HttpResponse.json(USERS);
  }),
  // get user by id
  http.get("https://api.example.com/users/:id", ({ params }) => {
    const { id } = params;
    return HttpResponse.json(USERS.find(user => user.id === id));
  }),
  // get all estimates
  http.get("https://api.example.com/estimates", () => {
    return HttpResponse.json(ESTIMATES_FIXTURE);
  }),
  // find estimate by id
  http.get("https://api.example.com/estimate/:id", ({ params }) => {
    const { id } = params;
    return HttpResponse.json(ESTIMATES_FIXTURE.find(e => e.id === id));
  }),
  // delete estimate by id
  http.delete("https://api.example.com/estimate/:id", ({ params }) => {
    const { id } = params;
    return HttpResponse.json(ESTIMATES_FIXTURE.filter(e => e.id !== id));
  }),
];
