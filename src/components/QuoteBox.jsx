import React, { useEffect, useState } from "react";
import styles from "./QuoteBox.module.css";
import { generateColor } from "../_helper/colorGenerator";
import Card from "../UI/Card";

const QuoteBox = () => {
  const [quote, setQuote] = useState([]);
  const [newQuote, setNewQuote] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [color, setColor] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchQuotes = async () => {
      setColor(generateColor());
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://api.quotable.io/quotes/random");

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const data = await response.json();
        setQuote(data[0]);
        console.log(data[0]);
      } catch (error) {
        setError(error.message);
        console.log(error.message);
      }
      setLoading(false);
    };
    fetchQuotes();
  }, [newQuote]);

  useEffect(() => {
    document.body.style.backgroundColor = "#" + color;
    document.getElementById("card").style.color = "#" + color;
    document.getElementById("tweet").style.backgroundColor = "#" + color;
    document.getElementById("newQuote").style.backgroundColor = "#" + color;
  }, [color]);

  return (
    <Card>
      <div className={styles.quoteCard} id="card">
        {error ? (
          <h2>{error}</h2>
        ) : (
          <div className={styles.top}>
            <div className={styles.quote}>
              {loading && <h2>Loading...</h2>}

              {!loading && (
                <h2>
                  <i className="fa-solid fa-quote-left"></i>&nbsp;
                  {quote.content}
                </h2>
              )}
            </div>
            {!loading && <div className={styles.author}>- {quote.author}</div>}
          </div>
        )}
        <div className={styles.bottom}>
          <button id="tweet" className={styles.tweet}>
            <a
              href={`https://twitter.com/intent/tweet?hashtags=quotes&text=${quote.content}%20${quote.author}.`}
            >
              <i className="fa-brands fa-twitter"></i>
            </a>
          </button>

          <button
            id="newQuote"
            className={styles.newQuote}
            onClick={() => setNewQuote((quote) => !quote)}
          >
            New quote
          </button>
        </div>
      </div>
    </Card>
  );
};

export default QuoteBox;
