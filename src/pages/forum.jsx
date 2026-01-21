import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

// Socket naar lokale backend
const socket = io("http://localhost:3000", { autoConnect: true });

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  // REST fetch
  useEffect(() => {
    fetch("http://localhost:3000/api/posts")
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  // Socket events
  useEffect(() => {
    socket.on("connect", () => console.log("✅ Socket connected", socket.id));
    socket.on("initPosts", (data) => setPosts(data));
    socket.on("newPost", (newPost) => setPosts((prev) => [...prev, newPost]));

    return () => {
      socket.off("connect");
      socket.off("initPosts");
      socket.off("newPost");
    };
  }, []);

  const addPost = () => {
    if (!text) return;
    fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    })
      .then(res => res.json())
      .then(newPost => {
        setPosts((prev) => [...prev, newPost]);
        setText("");
      });
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [posts]);

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
              className={post.author === "Guest" ? "guest-post" : "forum-post"}
            >
              <strong>{post.author}</strong>
              <p>{post.message}</p>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="forum-input">
          <input
            type="text"
            placeholder="Share your thoughts..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addPost()}
          />
          <button onClick={addPost}>Send</button>
        </div>
      </div>
    </section>
  );
};

export default Forum;
