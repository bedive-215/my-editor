import { Descendant, Editor } from "slate";

const STORAGE_KEY = "slate-content";

export function load (editor: Editor): Descendant[] | null {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;

  const parsed = JSON.parse(data) as Descendant[];

  editor.children = parsed;
  editor.onChange();

  return parsed;
}