# ProseMirror Readonly Strings Test Project

A complete demonstration of implementing readonly text segments in ProseMirror using React, Vite, and TypeScript.

## Features

- ✅ Custom readonly mark implementation
- ✅ Transaction filtering to prevent editing readonly text
- ✅ Visual styling for readonly segments
- ✅ Markdown parsing with automatic readonly detection
- ✅ Built-in ProseMirror features utilized
- ✅ TypeScript support

## Setup

1. Extract the zip file
2. Navigate to the project directory
3. Install dependencies: `npm install`
4. Start development server: `npm run dev`
5. Open your browser to the displayed URL

## How it Works

1. **Schema Extension**: Adds a custom `readonly` mark to the ProseMirror schema
2. **Markdown Parsing**: Parses markdown content and automatically applies readonly marks to specified strings
3. **Transaction Filtering**: Prevents any edits to text marked as readonly
4. **Visual Feedback**: Styled readonly text with distinctive appearance

## Usage

The editor will load with sample content containing readonly strings. Try editing:
- Normal text (works fine)
- Readonly highlighted text (prevented)

## Readonly Strings

The current readonly strings are configured in `App.tsx`:
- "readonly"
- "sample document" 
- "protected content"
- "ProseMirror"

## Customization

To modify readonly strings, update the `readonlyStrings` array in `src/App.tsx`.

## Architecture

- `src/prosemirror/schema.ts` - Extended ProseMirror schema
- `src/prosemirror/plugins.ts` - Transaction filtering plugin
- `src/prosemirror/markdown.ts` - Markdown parsing with readonly detection
- `src/components/ProseMirrorEditor.tsx` - React wrapper component
```

## Instructions

1. Create a new folder called `prosemirror-readonly-test`
2. Copy each file above into the appropriate location in the folder structure
3. Open terminal in the project folder
4. Run `npm install` to install dependencies
5. Run `npm run dev` to start the development server
6. Open your browser to test the readonly functionality

The project demonstrates exactly what we discussed - using ProseMirror's built-in features with minimal manual work to create readonly text segments that cannot be edited while keeping the rest of the document editable.