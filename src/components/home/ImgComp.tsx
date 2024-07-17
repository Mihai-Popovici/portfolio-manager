"use client";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";

export default function ImgComp({ img1, img2 }:{img1:string, img2:string}) {
  return (
    <ReactCompareSlider 
      itemOne={<ReactCompareSliderImage src={img1} alt="Image one" />}
      itemTwo={<ReactCompareSliderImage src={img2} alt="Image two" />}
    />
  );
}