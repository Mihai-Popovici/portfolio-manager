"use client";
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { useEffect, useState } from 'react';
import remarkDirective from 'remark-directive';
import remarkParse from 'remark-parse';
import { visit} from 'unist-util-visit';
import { MDXProvider } from '@mdx-js/react';
import ImgComp from './ImgComp';
import ImgGallery from './ImgGallery';

function imgCompDirective() {
  return (tree:any) => {
    visit(tree, 'leafDirective', (node) => {
      if (node.name !== 'imgComp') return;
      console.log(node);
      const data = node.data || (node.data = {});
      const hast = {
        type: 'element',
        tagName: 'ImgComp',
        properties: node.attributes,
        children: [],
      };
      data.hName = hast.tagName;
      data.hProperties = hast.properties;
    });
  }
}

function imgGalleryDirective() {
  return (tree:any) => {
    visit(tree, 'leafDirective', (node) => {
      if (node.name !== 'imgGallery') return;
      console.log(node);
      const data = node.data || (node.data = {});
      const hast = {
        type: 'element',
        tagName: 'ImgGallery',
        properties: node.attributes,
        children: [],
      };
      data.hName = hast.tagName;
      data.hProperties = hast.properties;
    });
  }
}

export const components = {
  ImgComp: ImgComp,
  ImgGallery: ImgGallery
}

export default function RenderProject({project}:{project:any}){
  const [mdxSource, setMdxSource] = useState<any>(null);

  async function setSource() {
    const source =  await serialize(project.content || '', {
      mdxOptions:{
        remarkPlugins:[
          remarkParse,
          remarkDirective,
          imgCompDirective,
          imgGalleryDirective
        ]
      }
    });
    setMdxSource(source);
  }

  useEffect(()=>{
    setSource();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <MDXProvider components={components}>
        {mdxSource && <MDXRemote {...mdxSource} components={components}/>}
      </MDXProvider>
    </>
  );
}