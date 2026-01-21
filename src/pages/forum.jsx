import { useState, useEffect, useRef } from "react";

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

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
