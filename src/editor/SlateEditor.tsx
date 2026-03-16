import { useCallback, useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import {renderElement} from './renderElement';
import renderLeaf from './renderLeaf';
import EditToolbar from '../components/EditToolbar';

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'Hello Slate 👋' }, {text: 'write something.'}],
  },
];

export default function SlateEditor() {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const [value, setValue] = useState<Descendant[]>(initialValue);
  console.log("value: ", value)
  const renderElementCallback = useCallback(renderElement, []);
  const renderLeafCallback = useCallback(renderLeaf, []);

  return (
    
    <div
  style={{
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: 40
  }}
>
  <div
    style={{
      width: "100%",
      maxWidth: 700,
      background: "white",
      padding: 20,
      borderRadius: 4,
      boxShadow: "0 1px 3px rgba(0,0,0,.2)"
    }}
  >
    <Slate editor={editor} initialValue={value} onChange={setValue}>
      <EditToolbar value={value} setValue={setValue} />

      <Editable
        renderElement={renderElementCallback}
        renderLeaf={renderLeafCallback}
        placeholder="Type something..."
        spellCheck
        autoFocus
        style={{
          minHeight: 150,
          outline: "none"
        }}
      />
    </Slate>
  </div>
</div>

    
  );
}
