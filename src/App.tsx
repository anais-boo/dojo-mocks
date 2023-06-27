import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

interface Story {
  title: string;
  url: string;
  score: number;
}

function App() {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    getTopStories();
  }, []);

  const getTopStories = async () => {
    try {
      const res = await axios.get<number[]>(
        "https://hacker-news.firebaseio.com/v0/topstories.json"
      );

      if (res && res.data) {
        const storyIds = res.data.slice(0, 10); // Get the top 10 story IDs

        const storyPromises = storyIds.map((id) =>
          axios.get<Story>(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`
          )
        );

        Promise.all(storyPromises).then((response) => {
          const storyData = response.map((r) => r.data);
          setStories(storyData);
        });
      }
    } catch (error) {
      console.error("Error fetching top stories:", error);
    }
  };

  return (
    <div className="App">
      <h1>Top Stories from Hacker News</h1>
      {stories.map((story, idx) => (
        <div key={idx} className="story a">
          <h2>
            {story.score > 100 ? "🔥" : ""} {story.title}
          </h2>
          <a href={story.url}>Read More</a>
        </div>
      ))}
    </div>
  );
}

export default App;
