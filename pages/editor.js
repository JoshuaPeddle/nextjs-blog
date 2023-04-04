import MDEeditor from "../components/editor";

export default function Editor() {
    return (
        <MDEeditor />  
    );
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