"use client";
import { useState } from "react";
import PhotoAlbum, { Photo } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";

import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

export default function ImgGallery({ photos }:{photos:Photo[]|string}) {
  const [index, setIndex] = useState(-1);
  if (typeof photos === 'string'){
    const parsedPhotos:Photo[] = JSON.parse(photos);
    photos = parsedPhotos;
  }
  return (
    <>
      <PhotoAlbum photos={photos} layout="rows" padding={0} spacing={20} targetRowHeight={350} onClick={({ index }) => setIndex(index)} />

      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        // enable optional lightbox plugins
        plugins={[Fullscreen, Thumbnails, Zoom]}
      />
    </>
  );
}