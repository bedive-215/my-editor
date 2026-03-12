import { Descendant } from "slate";
import { useSlate } from "slate-react";
import { save } from "../features/persistence/storage";
import { load } from "../features/persistence/load";

type Props = {
  value: Descendant[];
  setValue: (value: Descendant[]) => void;
};

export default function PersistenceButtons({ value, setValue }: Props) {
  const editor = useSlate();

  const handleSave = () => {
    save(value);
  };

  const handleLoad = () => {
    const parsed = load(editor);
    if (!parsed) return;

    editor.children = parsed;
    editor.onChange();
    setValue(parsed);
  };

  return (
    <>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleLoad}>Load</button>
    </>
  );
}