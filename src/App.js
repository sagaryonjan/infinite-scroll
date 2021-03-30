import logo from './logo.svg';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css';
import { useEffect, useState } from 'react';
import {getPostList, getSecondPostList} from './postList';

const App = () => {

  const style = {
    height: 250,
    border: "1px solid green",
    margin: 6,
    padding: 8
  };
  
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [counter, setCounter] = useState(1);


  useEffect(() => {
        setPosts(getPostList());
  }, []);

  const fetchData = () => {
    setCounter(counter + 1);
    if(counter  == 2){
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      setPosts([...posts,...getSecondPostList()]);
    }, 4000);
  };

 

  return (
    <div>
      <InfiniteScroll
        dataLength={posts?.length} //This is important field to render the next data
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {posts &&
          posts.map((post, index) => (
            <div style = {style}>
              <h4>{post.title}</h4>
              <p>{post.description}</p>
            </div>
          ))}
      </InfiniteScroll>
    </div>
  );
};

export default App;
