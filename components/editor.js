import dynamic from 'next/dynamic'
import { useState, useCallback, use } from 'react';
import "easymde/dist/easymde.min.css";
import styles from "./editor.module.css";
const SimpleMDEReact = dynamic(() => import('react-simplemde-editor'), { ssr: false })

/* This function could make a POST request to an API endpoint '/api/posts' */
// 



export default function Editor() {

    const [content, setContent] = useState("Body");
    const [title, setTitle] = useState("Title");
    const [id, setId] = useState("Id");

    const onContentChange = useCallback((value) => {
        setContent(value);
    }, []);

    const onIdChange = useCallback((value) => {
        setId(value.target.value);
    }, []);

    const onTitleChange = useCallback((value) => {
        setTitle(value.target.value);
    }, []);

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function saveNewPost() {
        console.log("Saving new post");
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
                    setErrorMessage("Successfully saved new note");
                } else {
                    response.json().then((data) => {
                        setError(true);
                        setErrorMessage(data.error);
                    });
                }
            })
    }

    return (
        <>
            <div className={styles.container}>
                <input type="text" value={id} onChange={onIdChange} />
                <input type="text" value={title} onChange={onTitleChange} />
                <SimpleMDEReact value={content} onChange={onContentChange} />
            </div>
            <button onClick={saveNewPost}>Log value</button>
            {error ? <p>There was an error: {errorMessage}</p> : <p>{errorMessage}</p>}
        </>
    );
}