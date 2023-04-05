import dynamic from 'next/dynamic';
import { useState, useCallback } from 'react';
import 'easymde/dist/easymde.min.css';
import styles from './editor.module.css';
const SimpleMDEReact = dynamic(() => import('react-simplemde-editor'), { ssr: false });
import Date from '../components/date';
import utilStyles from '../styles/utils.module.css';

function NoteList({ allPostsData, setPost, deletePost }) {
  return (
    <div className={styles.container}>
      <ul>
        {allPostsData.map(({ id, date, title, content }) => (
          <li key={id}>
            <span className={utilStyles.accentText}>{title}</span>
            <br />
            <button id='editButton' onClick={() => setPost({ id, title, content })}>
              Edit
            </button>
            <button id='deleteButton' onClick={() => deletePost({ id })}>
              Delete
            </button>
            <br />
            <small className={utilStyles.darkText}>
              <Date dateString={date} />
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Editor({ allPostsData }) {
  const [ content, setContent ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ id, setId ] = useState('');
  const onContentChange = useCallback((value) => {
    setContent(value);
  }, []);
  const onIdChange = useCallback((value) => {
    setId(value.target.value);
  }, []);
  const onTitleChange = useCallback((value) => {
    setTitle(value.target.value);
  }, []);
  const setPost = (value) => {
    setId(value.id);
    setTitle(value.title);
    setContent(value.content);
  };
  const deletePost = (value) => {
    confirm('Are you sure you want to delete this item?');
    fetch('/api/posts/' + value.id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setError(false);
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
          setError(false);
          setErrorMessage('Successfully saved new note');
        } else {
          response.json().then((data) => {
            setError(true);
            setErrorMessage(data.error);
          });
        }
      });
  }

  return (
    <>
      <div className={styles.container}>
        <input placeholder="New Note" type="text" value={id} onChange={onIdChange} disabled={true} />
        <input placeholder="Title" type="text" id='titleInput' value={title} onChange={onTitleChange} />
        <SimpleMDEReact placeholder="Body" value={content} onChange={onContentChange} />
      </div>
      <button id='saveNewPost' onClick={saveNewPost}>Save note</button>
      {error ? <p>There was an error: {errorMessage}</p> : <p>{errorMessage}</p>}
      <NoteList setPost={setPost} deletePost={deletePost} allPostsData={allPostsData} />
    </>
  );
}