import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

export const storyIds = [38464057,38470764]

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

      const storyPromises = storyIds.map((id) =>
        axios.get<Story>(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        )
      );

      Promise.all(storyPromises).then((response) => {
        const storyData = response.map((r) => r.data);
        setStories(storyData);
      });

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
