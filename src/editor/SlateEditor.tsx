import { useCallback, useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import renderElement from './renderElement';
import renderLeaf from './renderLeaf';

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'Hello Slate 👋' }],
  },
];

export default function SlateEditor() {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const [value, setValue] = useState<Descendant[]>(initialValue);

  const renderElementCallback = useCallback(renderElement, []);
  const renderLeafCallback = useCallback(renderLeaf, []);

  return (
    <div
      style={{
        maxWidth: 700,
        minWidth: 300,
        margin: '40px auto',
        background: '#f0f0f0',
        padding: 20,
      }}
    >
      <Slate editor={editor} initialValue={value} onChange={setValue}>
        <Editable
          renderElement={renderElementCallback}
          renderLeaf={renderLeafCallback}
          placeholder='Type something...'
          spellCheck
          autoFocus
        />
      </Slate>
    </div>
  );
}
