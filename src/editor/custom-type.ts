import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

export type CustomText = {
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  code?: boolean
}

export type AlignType = 'left' | 'center' | 'right' | 'justify'

type BaseElement = {
  align?: AlignType
}

type ParagraphElement = BaseElement & {
  type: 'paragraph'
  children: CustomText[]
}

type HeadingElement = BaseElement & {
  type: 'heading-one' | 'heading-two' | 'heading-three'
  children: CustomText[]
}

type BlockQuoteElement = BaseElement & {
  type: 'block-quote'
  children: CustomText[]
}

type ListItemElement = BaseElement & {
  type: 'list-item'
  children: ParagraphElement[]
}

type ListElement = BaseElement & {
  type: 'bulleted-list' | 'numbered-list'
  children: ListItemElement[]
}

type TableCellElement = BaseElement & {
  type: 'table-cell'
  children: CustomElement[]
}

type TableRowElement = BaseElement & {
  type: 'table-row'
  children: TableCellElement[]
}

export type TableElement = BaseElement & {
  type: 'table'
  children: TableRowElement[]
}

export type CustomElement =
  | ParagraphElement
  | HeadingElement
  | BlockQuoteElement
  | ListElement
  | ListItemElement
  | TableElement
  | TableRowElement
  | TableCellElement

export type CustomBlockType = CustomElement['type']

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

export const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'] as const
export const LIST_TYPES: CustomBlockType[] = [
  'numbered-list',
  'bulleted-list',
]

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}