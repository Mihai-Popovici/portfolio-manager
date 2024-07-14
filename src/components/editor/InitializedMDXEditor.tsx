'use client'
// InitializedMDXEditor.tsx
import '@mdxeditor/editor/style.css';
import { useState, type ForwardedRef } from 'react'
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  diffSourcePlugin,
  BlockTypeSelect,
  ChangeAdmonitionType,
  ChangeCodeMirrorLanguage,
  CodeToggle,
  CreateLink,
  DiffSourceToggleWrapper,
  InsertAdmonition,
  InsertCodeBlock,
  InsertFrontmatter,
  InsertSandpack,
  InsertTable,
  InsertImage,
  InsertThematicBreak,
  ListsToggle,
  ShowSandpackInfo,
  linkDialogPlugin,
  setMarkdown$
} from '@mdxeditor/editor'

// Only import this to the next file
export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  const [content, setContent] = useState(props.markdown)
  return (
    <>
    <textarea id='content' name='content' value={content} hidden readOnly/>
    <MDXEditor
    onChange={(markdown)=>setContent(markdown)}
    className='dark-editor'
      plugins={[
        // Example Plugin Usage
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        diffSourcePlugin({
          viewMode: 'rich-text',
          diffMarkdown:props.markdown,
          readOnlyDiff: true
        }),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {' '}
              <DiffSourceToggleWrapper>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <BlockTypeSelect/>
              </DiffSourceToggleWrapper>
            </>
          )
        }),
      ]}
      {...props}
      ref={editorRef}
    />
    </>
  )
}