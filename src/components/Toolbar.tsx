import { Descendant } from "slate";
import PersistenceButtons from "./PersistenceButton";

type Props = {
  value: Descendant[];
  setValue: (value: Descendant[]) => void;
};

const Toolbar = ({ value, setValue }: Props) => {
  return (
    <div style={{ padding: 20 }}>
      <PersistenceButtons value={value} setValue={setValue} />
    </div>
  );
};

export default Toolbar;