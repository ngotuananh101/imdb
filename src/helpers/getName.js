import apiRequestRawHtml from "./apiRequestRawHtml";
import DomParser from "dom-parser";
import seriesFetcher from "./seriesFetcher";

export default async function getTitle(id) {
  const parser = new DomParser();
  const html = await apiRequestRawHtml(`https://www.imdb.com/name/${id}`);
  console.log(html);
  const dom = parser.parseFromString(html);
  const nextData = dom.getElementsByAttribute("id", "__NEXT_DATA__");
  const json = JSON.parse(nextData[0].textContent);

  const props = json.props.pageProps;

  const getDob = (lookFor) => {
    let day = lookFor.day;
    let month = lookFor.month;
    let year = lookFor.year;

    if (day && month && year) {
      day = day.toString().padStart(2, "0");
      month = month.toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  }

  return {
    id: id,
    imdb: `https://www.imdb.com/name/${id}`,
    name: props.aboveTheFold.nameText.text,
    bio: props.aboveTheFold.bio.text.plainText,
    birthDate: getDob(props.mainColumnData.birthDate.dateComponents),
    birthLocation: props.mainColumnData.birthLocation.text,
    image: props.aboveTheFold.primaryImage.url,
    images: props.mainColumnData.images.edges
      .filter((e) => e.__typename === "ImageEdge")
      .map((e) => e.node.url),
  };
}
