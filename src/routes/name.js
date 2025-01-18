import { Hono } from "hono";
import { getSeason } from "../helpers/seriesFetcher";
import getName from "../helpers/getName";

const title = new Hono();

title.get("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const result = await getName(id);

    return c.json(result);
  } catch (error) {
    c.status(500);
    return c.json({
      message: error.message,
    });
  }
});
export default title;
