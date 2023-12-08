import { FC, useEffect, useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import './App.scss';

type Post = {
  id: string;
  title: string;
  content: string;
};

type PostList = {
  id: string;
  title: string;
  summary: string;
}[];

const LOREM_IPSUM = `Anim id laboris ipsum ex adipisicing eiusmod. Cillum aute ex consectetur velit ea eiusmod culpa ad aliqua eiusmod cupidatat sint. Et anim cupidatat sunt tempor. Est commodo ut in ad Lorem est. Laboris tempor commodo est ullamco. Quis culpa id Lorem ea sint mollit labore cillum ut ullamco ullamco consequat. Cupidatat sunt minim quis exercitation commodo cillum. Irure laboris mollit consectetur in.`;
const POSTS: Post[] = [
  { id: '1', title: 'Reprehenderit adipisicing cillum cillum.', content: LOREM_IPSUM },
  { id: '2', title: 'Cillum nostrud exercitation anim laborum nulla.', content: LOREM_IPSUM },
  { id: '3', title: 'Est Lorem esse enim ex mollit dolor officia.', content: LOREM_IPSUM },
  { id: '4', title: 'Ex proident laborum aliqua voluptate non magna cupidatat.', content: LOREM_IPSUM },
];

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getPost(postId: string): Promise<Post | undefined> {
  await delay(1000);
  return POSTS.find((post) => post.id === postId);
}

async function getPostList(): Promise<PostList> {
  await delay(1000);
  return POSTS.map((post) => ({
    id: post.id,
    title: post.title,
    summary: post.content.slice(0, 123) + '...',
  }));
}

function usePost({ postId }: { postId: string }) {
  const [data, setData] = useState<Post | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getPost(postId).then((post) => {
      setData(post);
      setIsLoading(false);
    });
  }, []);
  return { data, isLoading };
}

function usePostList() {
  const [data, setData] = useState<PostList | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getPostList().then((postList) => {
      setData(postList);
      setIsLoading(false);
    });
  }, []);
  return { data, isLoading };
}

const Post: FC = () => {
  const { postId } = useParams();
  if (!postId) {
    return <div>Post Not Found</div>;
  }
  const { data, isLoading } = usePost({ postId });
  return (
    <div>
      <Link to="/" className="block py-2 text-2xl">
        ⬅️ Back
      </Link>
      <h2 className="py-2 text-2xl font-bold">{data?.title}</h2>
      <p>{data?.content}</p>
      <div className="py-2 text-red-500">{isLoading && <div>Loading...</div>}</div>
    </div>
  );
};

const PostList: FC = () => {
  const { data, isLoading } = usePostList();
  return (
    <div>
      <h1 className="py-2 text-2xl font-bold">Posts</h1>
      <ul>
        {data?.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`} className="block py-2 text-2xl">
              {post.title}
            </Link>
            <p>{post.summary}</p>
          </li>
        ))}
      </ul>
      <div className="py-2 text-red-500">{isLoading && <div>Loading...</div>}</div>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<PostList></PostList>} />
      <Route path="/posts/:postId" element={<Post></Post>} />
    </Routes>
  );
}

export default App;
