import { useState, useEffect } from 'react';
import blogStyle from './BlogList.module.css';

export default function LeftRightButtons({ currentStartIndex, currentEndIndex, setCurrentStartIndex, setCurrentEndIndex, numPostsToShow, allPostsData }) {
  const [ totalPosts, setTotalPosts ] = useState(allPostsData.length);
  const [ atStart, setAtStart ] = useState(false);
  const [ atEnd, setAtEnd ] = useState(false);
  useEffect(() => {
    setTotalPosts(allPostsData.length);
  }, [ allPostsData ]);
  useEffect(() => {
    if ((currentStartIndex - numPostsToShow) < 0) {
      setAtStart(true);
    } else {
      setAtStart(false);
    }
  }, [ currentStartIndex, numPostsToShow ]);
  
  useEffect(() => {
    if ((currentStartIndex + numPostsToShow) >= totalPosts) {
      setAtEnd(true);
    } else {
      setAtEnd(false);
    }
  }, [ currentEndIndex, totalPosts, numPostsToShow ]);
  
  return (
    <div  id='test' className={blogStyle.buttonDiv}>
      {!atStart ?       <button  className={blogStyle.button} onClick={() => {
        if (currentStartIndex > 0) {
          setCurrentStartIndex(currentStartIndex - numPostsToShow);
          setCurrentEndIndex(currentEndIndex - numPostsToShow);
        }
      }}>Newer</button> : <button className={blogStyle.disabledButton} onClick={() => {
        if (currentStartIndex > 0) {
          setCurrentStartIndex(currentStartIndex - numPostsToShow);
          setCurrentEndIndex(currentEndIndex - numPostsToShow);
        }
      }}>Newer</button>}
  
      {!atEnd ?     <button className={blogStyle.button} onClick={() => {
        if (currentEndIndex < allPostsData.length) {
          setCurrentStartIndex(currentStartIndex + numPostsToShow);
          setCurrentEndIndex(currentEndIndex + numPostsToShow);
        }
      }}>Older</button> : <button className={blogStyle.disabledButton} onClick={() => {
        if (currentEndIndex < allPostsData.length) {
          setCurrentStartIndex(currentStartIndex + numPostsToShow);
          setCurrentEndIndex(currentEndIndex + numPostsToShow);
        }
      }}>Older</button>}
    </div>
  );
}