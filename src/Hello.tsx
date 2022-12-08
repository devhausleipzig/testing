import axios from "axios";
import { useEffect, useState } from "react";
import { p } from "vitest/dist/index-81973d31";

type Post = {
  id: number;
  title: string;
  body: string;
};

export function Hello() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.data)
      .then((res) => setPosts(res))
      .catch((e) => {
        console.log(e);
        setError(e);
      });
  }, []);
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li data-testid="post" key={post.id}>
            {post.title}
          </li>
        ))}
      </ul>
      {error && <p data-testid="custom-error">Something went wrong</p>}
    </div>
  );
}
