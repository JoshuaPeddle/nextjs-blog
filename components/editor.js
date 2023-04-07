import dynamic from 'next/dynamic';
import { useState, useCallback, useRef } from 'react';
const SimpleMDEReact = dynamic(() => import('react-simplemde-editor'), { ssr: false });
import CDate from '../components/date';

import LeftRightButtons from './LeftRightButtons';

import 'easymde/dist/easymde.min.css';
import utilStyles from '../styles/utils.module.css';
import styles from './editor.module.css';

const MDEStyle = `
.CodeMirror {
  color: rgb(var(--colors-secondary-dark)) !important;
  border-radius: 8px !important;
  border-color: rgb(var(--border-color-line-dark)) !important;
  background-color: #11111A !important;
}
.editor-toolbar {
  color: #111 !important;
  border: none !important;
  background-color: rgb(var(--background-color-bg-white-dark)) !important;
  display: flex !important;
  justify-content: space-between !important;
}
`;
function NoteList({ allPostsData, setPost, deletePost }) {
  const  numPostsToShow = 6;
  const [ currentStartIndex, setCurrentStartIndex ] = useState(0);
  const [ currentEndIndex, setCurrentEndIndex ] = useState(currentStartIndex + numPostsToShow);
  const targetRef = useRef();
  return (
    <div className={styles.list}>
      <ul>
        {allPostsData && allPostsData.slice(currentStartIndex, currentEndIndex).map(({ id, date, title, content }) => (
          <li key={id}  ref={targetRef}>
            <span className={styles.accentText}>{title}</span>
            <small className={utilStyles.darkText}>
              <CDate dateString={date} />
            </small>
            <div className={styles.buttonContainer}>
              <button id='editButton' onClick={() => setPost({ id, title, content })}>
              Edit
              </button>
              <button id='deleteButton' onClick={() => deletePost({ id })}>
              Delete
              </button>
            </div>
          </li>
        ))}
        <LeftRightButtons currentStartIndex={currentStartIndex} currentEndIndex={currentEndIndex} setCurrentStartIndex={setCurrentStartIndex} setCurrentEndIndex={setCurrentEndIndex} numPostsToShow={numPostsToShow} allPostsData={allPostsData} />
      </ul>
    </div>
  );
}

export default function Editor({ allPostsData }) {
  const [ content, setContent ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ id, setId ] = useState(null);
  const [ postsData, setPostsData ] = useState(allPostsData);
  const onContentChange = useCallback((value) => {
    setContent(value);
  }, []);
  const onTitleChange = useCallback((value) => {
    setTitle(value.target.value);
  }, []);
  const clearEditor = useCallback(() => {
    setTitle('');
    setId(null);
    setContent('');
  }, []);
  const setPost = (value) => {
    setId(value.id);
    setTitle(value.title);
    setContent(value.content);
  };
  const deletePost = (value) => {
    const conf = confirm('Are you sure you want to delete this item?');
    if (!conf) return;
    fetch('/api/posts/' + value.id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setError(false);
          // Remove the post from the list
          const newPosts = postsData.filter((post) => post.id !== value.id);
          setPostsData(newPosts);
          clearEditor();
        } else {
          setError(true);
        }
      });
  };
  const [ error, setError ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  function saveNewPost() {
    fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        title: title,
        content: content
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          const date = new Date().toISOString().slice(0, 10);
          // Add the new post to the list
          response.json().then((data) => {
            // If note already exists, update it
            if (id) {
              const newPosts = postsData.map((post) => {
                if (post.id === id) {
                  post.title = title;
                  post.content = content;
                  post.date = date;
                }
                return post;
              });
              setPostsData(newPosts);
              clearEditor();
              setError(false);
              setErrorMessage('Successfully updated note');
              return;
            }
            console.log(data);
            const newPost = {
              key: data.id,
              id: data.id,
              title: title,
              content: content,
              date: date
            };
            setPostsData([ newPost, ...postsData ]);
            clearEditor();
            setError(false);
            setErrorMessage('Successfully saved new note');
          });
        } else {
          response.json().then((data) => {
            setError(true);
            setErrorMessage(data.error);
          });
        }
      });
  }

  return (
    <div>
      <div className={styles.editor}>
        <style suppressHydrationWarning>{MDEStyle}</style>
        <div className={styles.container}>
          <input placeholder="Title" type="text" id='titleInput' value={title} onChange={onTitleChange} />
        </div>
        <SimpleMDEReact placeholder="Body" value={content} onChange={onContentChange} style={{background:'#11111a'}} />
        <>
          {id ?(
            <>
              <button id='savePost' onClick={saveNewPost}>Save changes</button>
              <button id='clear' onClick={clearEditor}>clear</button>
            </>
          )  : 
            <button id='saveNewPost' onClick={saveNewPost}>Save new note</button>}
        </>
        {error ? <p>There was an error: {errorMessage}</p> : <p>{errorMessage}</p>}
        <NoteList setPost={setPost} deletePost={deletePost} allPostsData={postsData} />
      </div>
    </div>
  );
}