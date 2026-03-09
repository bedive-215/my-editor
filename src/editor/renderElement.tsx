import { RenderElementProps } from 'slate-react';

export default function renderElement(props: RenderElementProps) {
  const { attributes, children, element } = props;

  switch (element.type) {
    case 'heading':
      return <h1 {...attributes}>{children}</h1>;
    default:
      return <p {...attributes}>{children}</p>;
  }
}
