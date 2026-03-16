import { Descendant } from "slate";
import { useSlate } from "slate-react";
import { save } from "../features/persistence/storage";
import { load } from "../features/persistence/load";
import { Button, Icon } from "./index";
import { PointerEvent } from 'react'

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
      <Button onClick={handleSave} 
        onPointerDown={(event: PointerEvent<HTMLButtonElement>) =>
          event.preventDefault()
        }><Icon>save</Icon>
      </Button>
      <Button onClick={handleLoad}  
        onPointerDown={(event: PointerEvent<HTMLButtonElement>) =>
              event.preventDefault()
        }><Icon>folder_open</Icon>
      </Button>
    </>
  );
}