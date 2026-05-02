import { Editor, Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { TableCellElement } from "../../types/custom-type";

export const startResizeCol = (
  e: React.MouseEvent<HTMLDivElement>,
  editor: Editor,
  element: TableCellElement
) => {
  e.preventDefault();
  e.stopPropagation();

  const startX = e.clientX;
  const path = ReactEditor.findPath(editor, element);

  const colIndex = path[path.length - 1];
  const tablePath = path.slice(0, -2);

  const [table] = Editor.node(editor, tablePath);
  const tableNode = table as any;

  const startWidth = element.width || 120;

  let frame: number;

  const onMouseMove = (event: MouseEvent) => {
    cancelAnimationFrame(frame);

    frame = requestAnimationFrame(() => {
      const newWidth = Math.max(
        50,
        startWidth + (event.clientX - startX)
      );

      tableNode.children.forEach((row: any, rowIndex: number) => {
        const cellPath = [...tablePath, rowIndex, colIndex];

        Transforms.setNodes(
          editor,
          { width: newWidth },
          { at: cellPath }
        );
      });
    });
  };

  const onMouseUp = () => {
    cancelAnimationFrame(frame);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
};

export const startResizeRow = (
  e: React.MouseEvent<HTMLDivElement>,
  editor: Editor,
  element: TableCellElement
) => {
  e.preventDefault();
  e.stopPropagation();

  const startY = e.clientY;
  const path = ReactEditor.findPath(editor, element);

  const rowIndex = path[path.length - 2];
  const tablePath = path.slice(0, -2);

  const [table] = Editor.node(editor, tablePath);
  const tableNode = table as any;

  const startHeight = element.height || 40;

  let frame: number;

  const onMouseMove = (event: MouseEvent) => {
    cancelAnimationFrame(frame);

    frame = requestAnimationFrame(() => {
      const newHeight = Math.max(
        30,
        startHeight + (event.clientY - startY)
      );

      // update tất cả cell trong row
      tableNode.children[rowIndex].children.forEach(
        (_: any, colIndex: number) => {
          const cellPath = [...tablePath, rowIndex, colIndex];

          Transforms.setNodes(
            editor,
            { height: newHeight },
            { at: cellPath }
          );
        }
      );
    });
  };

  const onMouseUp = () => {
    cancelAnimationFrame(frame);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
};