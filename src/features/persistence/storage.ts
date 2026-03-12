import { Descendant } from "slate";

const STORAGE_KEY = "slate-content";

export function save (value: Descendant[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}