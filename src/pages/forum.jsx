import { useState, useEffect } from "react";
import data from "../../data.json";

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");

  // Posts laden uit localStorage of fallback naar data.json
  useEffect(() => {
    fetch("https://vinyl.jverbeek.com/api/posts")
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  const addPost = () => {
    if (!text) return;
    fetch("https://vinyl.jverbeek.com/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    })
      .then(res => res.json())
      .then(newPost => {
        setPosts([...posts, newPost]);
        setText("");
      });
  };


  return (
    <section className="forum">
      <aside className="forum-sidebar">
        <h3>Categorieën</h3>
        <p>Algemeen</p>
        <p>Nieuwe platen</p>
        <p>Tips</p>
      </aside>

      <div className="forum-main">
        <div className="forum-posts">
          {posts.map((post) => (
            <div
              key={post.id}
              className={` ${post.author === "Guest" ? "guest-post" : "forum-post"}`}
            >
              <strong>{post.author}</strong>
              <p>{post.message}</p>
            </div>
          ))}
          <div className="forum-input">
            <input
              type="text"
              placeholder="Share your thoughts..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addPost();
                }
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Forum;
