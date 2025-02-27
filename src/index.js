import { Hono } from "hono";
import { cors } from "hono/cors";
import index from "./routes/index";
import reviews from "./routes/reviews";
import title from "./routes/title";
import cache from "./helpers/cache";
import search from "./routes/search";
import userRoutes from "./routes/user";
import name from "./routes/name";
import video from "./routes/video";

const app = new Hono();

app.use("*", cors());
app.use("*", cache);

app.route("/search", search);
app.route("/title", title);
app.route("/reviews", reviews);
app.route("/user", userRoutes);
app.route("/name", name);
app.route("/video", video);
app.route("/", index);

app.fire();
