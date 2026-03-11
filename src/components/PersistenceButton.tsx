import { Descendant } from "slate";
import { useSlate } from "slate-react";

type Props = {
  value: Descendant[];
  setValue: (value: Descendant[]) => void;
};

const STORAGE_KEY = "slate-content";

export default function PersistenceButtons({ value, setValue }: Props) {
  const editor = useSlate();

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  };

    const load = () => {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return;

        const parsed = JSON.parse(data);

        editor.children = parsed;
        editor.onChange();

        setValue(parsed);
    };

  return (
    <>
      <button onClick={save}>Save</button>
      <button onClick={load}>Load</button>
    </>
  );
}