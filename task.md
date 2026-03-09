# Slate Editor Mini Project

## 1. Target UI

The final editor UI should look like this:

---

## | B | I | Heading ▼ | • List | Save | Load |

Heading 1

This is a paragraph text.

• List item 1  
• List item 2

### Toolbar Actions

| Button        | Action                                |
| ------------- | ------------------------------------- |
| **B**         | Toggle bold                           |
| **I**         | Toggle italic                         |
| **Heading ▼** | Select heading level (H1 → H6)        |
| **• List**    | Toggle bullet list                    |
| **Save**      | Save editor content to localStorage   |
| **Load**      | Load editor content from localStorage |

### Heading Dropdown

The heading dropdown should contain:

- Paragraph
- Heading 1
- Heading 2
- Heading 3
- Heading 4
- Heading 5
- Heading 6

Example editor data:

```json
[
  {
    "type": "heading",
    "level": 1,
    "children": [{ "text": "Title" }]
  },
  {
    "type": "paragraph",
    "children": [{ "text": "Content here" }]
  }
]
```

## 2. Tasks

### a. Text formatting:

- Scope:

```
features/formatting
components/MarkButton
```

- Tasks:

```
Implement toggleMark
Implement isMarkActive
Create MarkButton
Implement Bold
Implement Italic
Connect buttons to toolbar: [B] [I]
```

### b. Block elements

- Scope:

```
features/elements
components/BlockButton
```

- Tasks:

```
Implement toggleBlock
Implement heading levels (H1–H6)
Implement bullet list
Create heading dropdown
Update renderElement
```

### c. Persistence

- Scope:

```
features/persistence
```

- Tasks:

```
Implement save function
Implement load function
Store editor content in localStorage
Add Save / Load buttons to toolbar
```
