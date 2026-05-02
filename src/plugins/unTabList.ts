import { Editor, Element as SlateElement, Transforms, Path } from "slate";

export const unTabList = (editor: Editor) => {
  const listItemEntry = Editor.above(editor, {
    match: n =>
      SlateElement.isElement(n) && n.type === "list-item",
  });

  // console.log("listItemEntry", listItemEntry);
  if (!listItemEntry) return;

  const [, listItemPath] = listItemEntry;

  let parentEntry;
  try {
    parentEntry = Editor.parent(editor, listItemPath);
  } catch {
    return;
  }

  const [, parentPath] = parentEntry;

  let grandParentEntry;
  try {
    grandParentEntry = Editor.parent(editor, parentPath);
  } catch {
    return; // ben ngoai la editor thi thoat
  }

  const [grandNode, grandPath] = grandParentEntry;

  if (
    SlateElement.isElement(grandNode) &&
    grandNode.type === "list-item"
  ) {
    Transforms.moveNodes(editor, {
      at: listItemPath,
      to: Path.next(grandPath),
    });

    Transforms.removeNodes(editor, {
      at: parentPath,
    });
  }
};