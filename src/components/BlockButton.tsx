import { useSlate } from "slate-react"
import { toggleBlock } from "../features/elements/toggleBlock"
import { isBlockActive } from "../features/elements/isBlockActive"
import { isAlignActive } from "../features/elements/isAlignActive"
import { CustomBlockType, AlignType, TEXT_ALIGN_TYPES } from "../editor/custom-type"
import { PointerEvent } from "react"
import { Button, Icon } from "./index"

type Props = {
format: CustomBlockType | AlignType
  icon: string
}

export function BlockButton({ format, icon }: Props) {

  const editor = useSlate()
  
  const isAlign = TEXT_ALIGN_TYPES.includes(format as AlignType)

  return (
    <Button
      active={isAlign ? isAlignActive(editor, format as AlignType) : isBlockActive(editor, format as CustomBlockType)}
      onPointerDown={(event: PointerEvent<HTMLButtonElement>) =>
        event.preventDefault()
      }
      onClick={() => toggleBlock(editor, format)}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}