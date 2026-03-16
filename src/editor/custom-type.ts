import { BaseEditor } from "slate"
import { ReactEditor } from "slate-react"
import { HistoryEditor } from "slate-history"

export type CustomText = {
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  code?: boolean
}

export type CustomTextKey = keyof Omit<CustomText, "text">

export type CustomElement =
  | { type: "paragraph"; align?: "left" | "center" | "right" | "justify"; children: CustomText[] }
  | { type: "heading-one"; align?: "left" | "center" | "right" | "justify"; children: CustomText[] }
  | { type: "heading-two"; align?: "left" | "center" | "right" | "justify"; children: CustomText[] }
  | { type: "heading-three"; align?: "left" | "center" | "right" | "justify"; children: CustomText[] }
  | { type: "block-quote"; align?: "left" | "center" | "right" | "justify"; children: CustomText[] }
  | { type: "bulleted-list"; align?: "left" | "center" | "right" | "justify"; children: CustomElement[] }
  | { type: "numbered-list"; align?: "left" | "center" | "right" | "justify"; children: CustomElement[] }
  | { type: "list-item"; align?: "left" | "center" | "right" | "justify"; children: CustomText[] }


export type CustomBlockType =
  | "paragraph"
  | "heading-one"
  | "heading-two"
  | "heading-three"
  | "block-quote"
  | "bulleted-list"
  | "numbered-list"
  | "list-item"

export type AlignType =
  | "left"
  | "center"
  | "right"
  | "justify"

export const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"] as const
export const LIST_TYPES: CustomBlockType[] = ["numbered-list", "bulleted-list"] as const


export type CustomEditor =
  BaseEditor & ReactEditor & HistoryEditor

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}