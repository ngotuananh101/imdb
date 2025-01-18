import { Hono } from "hono";
import { apiRequestJson } from "../helpers/apiRequestRawHtml";

const search = new Hono();

async function getFromYTS(query) {
    try {
        let data = await apiRequestJson(
            `https://yts.mx/api/v2/movie_details.json?imdb_id=${query}`
        );

        let isSuccess = data.status === 'ok' ? true : false;
        if (!isSuccess) {
            throw new Error("Cannot fetch data from YTS");
        }

        // try to get torrent
        let torrents = data.data.movie.torrents;
        if (!torrents || torrents.length == 0) {
            throw new Error("Cannot find torrent data");
        }
        torrents = torrents.map((torrent) => {
            return {
                type: "torrent",
                quality: `${torrent.quality} (${torrent.type})`,
                size: torrent.size,
                url: torrent.url,
            }
        });
        if (torrents.yt_trailer_code) {
            torrents.push({
                type: "trailer",
                url: `https://www.youtube.com/watch?v=${torrents.yt_trailer_code}`,
                quality: "multi",
            });
        }
        return torrents ?? [];
    } catch (error) {
        return [];
    }
}

search.get("/movie/:id", async (c) => {
    let query = c.req.param('id');
    let data = await getFromYTS(query);
    data.push({
        type: "embed",
        quality: "multi",
        url: `https://www.2embed.cc/embed/${query}`,
    });
    data.push({
        type: "embed",
        quality: "multi",
        url: `https://vidsrc.me/embed/movie?imdb=${query}`,
    });
    data.push({
        type: "embed",
        quality: "multi",
        url: `https://vidsrc.to/embed/movie/${query}`,
    });
    c.status(200);
    return c.json(data);
});

export default search;
