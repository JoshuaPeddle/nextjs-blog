import dynamic from 'next/dynamic'
import { useState, useCallback } from 'react';
import "easymde/dist/easymde.min.css";
const SimpleMDEReact = dynamic(() => import('react-simplemde-editor'), { ssr: false })

export default function Editor() {

    const [value, setValue] = useState("Initial value");

    const onChange = useCallback((value) => {
      setValue(value);
    }, []);
  
    return <SimpleMDEReact value={value} onChange={onChange} />;
}



/*import ReactDOMServer from "react-dom/server";

export const CustomPreview = () => {
  const customRendererOptions = useMemo(() => {
    return {
      previewRender() {
        return ReactDOMServer.renderToString(
          <ReactMarkdown
            source={text}
            renderers={{
              CodeBlock: CodeRenderer,
              Code: CodeRenderer,
            }}
          />
        );
      },
    } as SimpleMDE.Options;
  }, []);

  return (
    <div>
      <h4>Custom preview</h4>
      <SimpleMdeReact options={customRendererOptions} />
    </div>
  );
};
*/