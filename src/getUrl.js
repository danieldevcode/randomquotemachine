export function getTweetUrl({ quote, author, hashtags }) {
  const content = `"${quote}" ${author}.`;
  const tags = hashtags.join(",");
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    content
  )}&hashtags=${tags}`;
}

export function getTumblrUrl({ quote, author, hashtags }) {
  const tags = hashtags.join(",");
  return `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=${tags}&caption=${author}&content=${encodeURIComponent(
    quote
  )}&canonicalUrl=${encodeURIComponent("https://freecodecamp.com")}`;
}
