import { useSlate } from 'slate-react'
import { CustomTextKey } from '../types/custom-type'
import { isMarkActive } from '../features/formatting/isMarkActive'
import { toggleMark } from '../features/formatting/toggleMark'
import { PointerEvent } from 'react'
import { Button, Icon } from './index'

type MarkButtonProps = {
    format: CustomTextKey,
    icon: string
}

export const MarkButton = ({ format, icon }: MarkButtonProps) => {
  const editor = useSlate()

  return (
    <Button
      active={isMarkActive(editor, format)}
      onPointerDown={(event: PointerEvent<HTMLButtonElement>) =>
        event.preventDefault()
      }
      onClick={() => toggleMark(editor, format)}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}