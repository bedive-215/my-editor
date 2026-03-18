import { RenderLeafProps } from 'slate-react';

export default function renderLeaf(props: RenderLeafProps) {
  const { attributes, children, leaf } = props;
  // console.log('Props render leaf: ',props);
  let el = children;

  if (leaf.bold) {
    el = <strong>{el}</strong>;
  }

  if (leaf.italic) {
    el = <em>{el}</em>;
  }

  if (leaf.underline) {
    el = <u>{el}</u>
  }

  if (leaf.code) {
    el = <code>{el}</code>
  }
  return <span {...attributes}>{el}</span>;
}
