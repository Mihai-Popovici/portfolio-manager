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
  markdownShortcutPlugin,
  InsertTable,
  tablePlugin,
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
import { BookImage, Images } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import ImgComp from '../home/ImgComp';
import ImgGallery from '../home/ImgGallery';
import { Photo } from 'react-photo-album';
import { getMeta } from '@/lib/utils';
import { Input } from '../ui/input';
import SelectOne from '../admin/File/SelectOne';
import SelectMany from '../admin/File/SelectMany';

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

  const ImageGalleryDirectiveDescriptor: DirectiveDescriptor = {
    name: 'imgGallery',
    testNode(node) {
      return node.name === 'imgGallery';
    },
    // set some attribute names to have the editor display a property editor popup.
    attributes: ['Photos'],
    // used by the generic editor to determine whether or not to render a nested editor.
    hasChildren: false,
    Editor: (props) => {
      if (props.mdastNode.attributes && props.mdastNode.attributes['photos']) {
        const photos:Photo[] = JSON.parse(props.mdastNode.attributes['photos']);
        return (
          <ImgGallery photos={photos}/>
        );
      }
      return null;
    },
  };

  const ImageComparatorButton = () => {
    // grab the insertDirective action (a.k.a. publisher) from the
    // state management system of the directivesPlugin
    const [file1, setFile1] = useState<null | string>(null);
    const [file2, setFile2] = useState<null | string>(null);

    const insertDirective = usePublisher(insertDirective$);

    function handleCancel() {
      setFile1(null);
      setFile2(null);
    }

    async function handleAdd() {
      if(!file1 || !file2){
        return;
      }
      const url1 = `https://portfolio-manager.s3.tebi.io/${file1}`;
      const url2 = `https://portfolio-manager.s3.tebi.io/${file2}`;

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
              <SelectOne onChange={(filename)=>setFile1(filename)}/>
              <SelectOne onChange={(filename)=>setFile2(filename)}/>
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

  const ImageGalleryButton = () => {
    const [uploading, setUploading] = useState(false);
    const [photos, setPhotos] = useState<Photo[]|[]>([]);
    const insertDirective = usePublisher(insertDirective$);
    function handleCancel() {
      
    }
    async function handleAddImgs(filenames:string[]){
      setPhotos([]);
      filenames.forEach((filename)=>{
        const url = `https://portfolio-manager.s3.tebi.io/${filename}`;
        getMeta(url, (err, img) => {
          const width = img.naturalWidth;
          const height = img.naturalHeight;
          setPhotos((photos:Photo[])=>[...photos, {src:url, width, height}]);
        });
      })
    }
    function handleAdd() {
      insertDirective({
        name: 'imgGallery',
        type: 'leafDirective',
        attributes: {
          photos: JSON.stringify(photos),
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
                <BookImage className="w-5 h-5" />
              </button>
            </AlertDialogTrigger>
          </TooltipTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Image Gallery</AlertDialogTitle>
              <AlertDialogDescription>
                Add images you want to add to the gallery
              </AlertDialogDescription>
            </AlertDialogHeader>
            <SelectMany onChange={(filenames)=>{handleAddImgs(filenames)}}/>
              <div className='flex flex-wrap gap-2 w-full h-fit'>
                {photos.map((photo)=>(
                  // eslint-disable-next-line
                  <img className='object-cover' key={photo.key} width={80} height={80} src={photo.src} alt=''/> 
                ))}
              </div>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancel}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction disabled={uploading} onClick={handleAdd}>Add</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <TooltipContent className='text-xs bg-[var(--baseText)] text-[var(--baseBase)] border-none'>
          Add Image Gallery
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <MDXEditor
      plugins={[
        directivesPlugin({
          directiveDescriptors: [ImageComparatorDirectiveDescriptor, ImageGalleryDirectiveDescriptor],
        }),
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        tablePlugin(),
        diffSourcePlugin({
          viewMode: 'rich-text',
          diffMarkdown: diffMarkdown,
          readOnlyDiff: true,
        }),
        imagePlugin({
          imageUploadHandler: async (value) => {
            let formData = new FormData();
            formData.append("file", value);
            const upload = await fetch('/api/files/upload', {
              method:'POST',
              body: formData
            });
            const url = await upload.json();
            return Promise.resolve(url);
          }
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
                <ImageGalleryButton />
                <InsertTable/>
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
