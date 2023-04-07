import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Date from '../components/date';
import { useState, useRef, useEffect } from 'react';
import blogStyle from './BlogList.module.css';

function LeftRightButtons({ currentStartIndex, currentEndIndex, setCurrentStartIndex, setCurrentEndIndex, numPostsToShow, allPostsData }) {
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
    if ((currentStartIndex + numPostsToShow) > totalPosts) {
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

export default function BlogList({ allPostsData }) {
  const [ numPostsToShow, setNumPostsToShow ] = useState(2);
  const [ currentStartIndex, setCurrentStartIndex ] = useState(0);
  const [ currentEndIndex, setCurrentEndIndex ] = useState(currentStartIndex + numPostsToShow);
  const targetRef = useRef();
  const [ dimensions, setDimensions ] = useState({ width:0, height: 0 });
  const [ pageHeight, setPageHeight ] = useState(0);
  useEffect(() => {
    if (targetRef.current) {
      var body = document.body,
        html = document.documentElement;
      var height = Math.max( body.scrollHeight, body.offsetHeight, 
        html.clientHeight, html.scrollHeight, html.offsetHeight );
      setPageHeight(height);
      console.log(height);
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight
      });
    }
  }, [ targetRef ]);

  // set the number of posts to show based on the height the page
  useEffect(() => {
    const postHight = dimensions.height;
    const postsPerPage = Math.floor((pageHeight*.50) / postHight);
    setNumPostsToShow(postsPerPage);
    setCurrentEndIndex(currentStartIndex + postsPerPage);
  }, [ dimensions, pageHeight ]);

  return (
    <>
      <ul className={utilStyles.list} >
        {allPostsData && allPostsData.slice(currentStartIndex, currentEndIndex).map(({ id, date, title, contentHtml }) => (
          <li className={utilStyles.listItem} key={id} ref={targetRef}>
            <Link href={{pathname:`/posts/${id}`, query: {id, date, title, contentHtml}}}>{title}</Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
        ))}
        <LeftRightButtons currentStartIndex={currentStartIndex} currentEndIndex={currentEndIndex} setCurrentStartIndex={setCurrentStartIndex} setCurrentEndIndex={setCurrentEndIndex} numPostsToShow={numPostsToShow} allPostsData={allPostsData} />
      </ul>
    </>
  );
}