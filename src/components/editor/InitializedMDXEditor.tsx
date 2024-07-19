'use client';
// InitializedMDXEditor.tsx
import '@mdxeditor/editor/style.css';
import { useState, type ForwardedRef } from 'react';
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  diffSourcePlugin,
  BlockTypeSelect,
  DiffSourceToggleWrapper,
  imagePlugin,
  DirectiveDescriptor,
  directivesPlugin,
  usePublisher,
  insertDirective$,
} from '@mdxeditor/editor';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Images } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import ImgComp from '../home/ImgComp';

// Only import this to the next file
export default function InitializedMDXEditor({
  editorRef,
  diffMarkdown,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null, diffMarkdown:string } & MDXEditorProps) {
  const [content, setContent] = useState(props.markdown);

  const ImageComparatorDirectiveDescriptor: DirectiveDescriptor = {
    name: 'imgComp',
    testNode(node) {
      return node.name === 'imgComp';
    },
    // set some attribute names to have the editor display a property editor popup.
    attributes: ['First Image', 'Second Image'],
    // used by the generic editor to determine whether or not to render a nested editor.
    hasChildren: false,
    Editor: (props) => {
      if (props.mdastNode.attributes) {
        return (
          <ImgComp img1={props.mdastNode.attributes['img1'] || ''} img2={props.mdastNode.attributes['img2'] || ''}/>
        );
      }
      return null;
    },
  };

  const ImageComparatorButton = () => {
    // grab the insertDirective action (a.k.a. publisher) from the
    // state management system of the directivesPlugin
    const [file1, setFile1] = useState<null | File>(null);
    const [file2, setFile2] = useState<null | File>(null);

    const insertDirective = usePublisher(insertDirective$);

    function handleCancel() {
      setFile1(null);
      setFile2(null);
    }

    async function handleAdd() {
      if(!file1 || !file2){
        return;
      }
      let formData = new FormData();
      formData.append("file", file1);
      const res1 = await fetch('/api/upload', {
        method:'POST',
        body: formData
      })
      const url1 = await res1.json();
      formData = new FormData();
      formData.append("file", file2);
      const res2 = await fetch('/api/upload', {
        method:'POST',
        body: formData
      })
      const url2 = await res2.json();

      insertDirective({
        name: 'imgComp',
        type: 'leafDirective',
        attributes: {
          img1: url1,
          img2: url2,
        },
      });
      handleCancel();
    }

    return (
      <Tooltip delayDuration={0}>
        <AlertDialog>
          <TooltipTrigger asChild>
            <AlertDialogTrigger asChild>
              <button className="w-7 h-7 hover:bg-[var(--baseBgActive)] flex justify-center items-center rounded-sm">
                <Images className="w-5 h-5" />
              </button>
            </AlertDialogTrigger>
          </TooltipTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Image Comparator</AlertDialogTitle>
              <AlertDialogDescription>
                Add 2 images you want to compare
              </AlertDialogDescription>
            </AlertDialogHeader>
              <input
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setFile1(e.target.files[0]);
                  }
                }}
                type="file"
                accept="image/jpeg,image/png"
              />
              <input
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setFile2(e.target.files[0]);
                  }
                }}
                type="file"
                accept="image/jpeg,image/png"
              />
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancel}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleAdd}>Add</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <TooltipContent className='text-xs bg-[var(--baseText)] text-[var(--baseBase)] border-none'>
          Add Image Comparator
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <MDXEditor
      plugins={[
        directivesPlugin({
          directiveDescriptors: [ImageComparatorDirectiveDescriptor],
        }),
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        // markdownShortcutPlugin(),
        diffSourcePlugin({
          viewMode: 'rich-text',
          diffMarkdown: diffMarkdown,
          readOnlyDiff: true,
        }),
        imagePlugin({
          imageUploadHandler: () => {
            return Promise.resolve('https://picsum.photos/200/300');
          },
          imageAutocompleteSuggestions: [
            'https://picsum.photos/200/300',
            'https://picsum.photos/200',
          ],
        }),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {' '}
              <DiffSourceToggleWrapper>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <BlockTypeSelect />
                <ImageComparatorButton />
              </DiffSourceToggleWrapper>
            </>
          ),
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  );
}
