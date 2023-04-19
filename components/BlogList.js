import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Date from '../components/date';
import { useState, useRef, useEffect } from 'react';
import LeftRightButtons from './LeftRightButtons';

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
    const postsPerPage = Math.floor((pageHeight*.55) / postHight);
    setNumPostsToShow(postsPerPage);
    setCurrentEndIndex(currentStartIndex + postsPerPage);
  }, [ dimensions, pageHeight, currentStartIndex ]);

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