import React from "react";
import "../styles/quote.scss";
import "../styles/themes.scss";
import fetchQuotes from "../fetch/fetch-quotes";
import { useQuery } from "@tanstack/react-query";
import { getTumblrUrl, getTweetUrl } from "../getUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faTumblr } from "@fortawesome/free-brands-svg-icons";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

function Quote() {
  const quotesQuery = useQuery({
    queryKey: ["quotes"],
    queryFn: fetchQuotes,
    staleTime: Infinity,
  });

  const [theme, setTheme] = React.useState(getRandomInt(1, 10));
  const [fade, setFade] = React.useState(true);
  const [index, setIndex] = React.useState(getRandomInt(0, 10));
  const { quote, author } = quotesQuery.isSuccess
    ? quotesQuery.data.quotes[index]
    : {};

  const shareData = {
    quote,
    author,
    hashtags: ["quotes", "freeCodeCamp"],
  };
  const tweetHref = getTweetUrl(shareData);
  const tumblrHref = getTumblrUrl(shareData);

  function setRandomQuote(quotes) {
    setFade(false);
    setTimeout(() => {
      setTheme(getRandomInt(1, 10));
      setIndex(getRandomInt(0, quotes.length - 1));
      setFade(true);
    }, 500);
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <div className={`background theme-${theme}`}>
      <section id="quote-box" className="quote-container">
        <p id="text" className={`quote-text ${fade ? "fade-in" : "fade-out"}`}>
          <FontAwesomeIcon
            icon={faQuoteLeft}
            size="lg"
            className="quote-icon"
          />
          {quote}
        </p>
        <p
          id="author"
          className={`quote-author ${fade ? "fade-in" : "fade-out"}`}
        >
          - {author}
        </p>
        <div className="quote-actions">
          <a id="tweet-quote" href={tweetHref} className="icon">
            <FontAwesomeIcon icon={faTwitter} size="lg" color="#f5f5f5" />
          </a>
          <a id="tumblr-quote" href={tumblrHref} className="icon">
            <FontAwesomeIcon icon={faTumblr} size="lg" color="#f5f5f5" />
          </a>
          <button
            id="new-quote"
            className="quote-button"
            disabled={!quotesQuery.isSuccess}
            onClick={() => {
              setRandomQuote(quotesQuery.data?.quotes);
            }}
          >
            New quote
          </button>
        </div>
      </section>
    </div>
  );
}

export default Quote;
