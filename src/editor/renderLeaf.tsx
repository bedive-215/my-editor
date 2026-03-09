import { RenderLeafProps } from 'slate-react';

export default function renderLeaf(props: RenderLeafProps) {
  const { attributes, children, leaf } = props;

  let el = children;

  if (leaf.bold) {
    el = <strong>{el}</strong>;
  }

  if (leaf.italic) {
    el = <em>{el}</em>;
  }

  return <span {...attributes}>{el}</span>;
}
