"use client";
import { CSSProperties, FC, HtmlHTMLAttributes, ReactElement, useState } from "react";
import { ReactCompareSlider, ReactCompareSliderHandleProps, ReactCompareSliderImage } from "react-compare-slider";
import { Button } from "../ui/button";
import { UnfoldHorizontal, UnfoldVertical } from "lucide-react";
export const ReactCompareSliderHandle: FC<
  ReactCompareSliderHandleProps & HtmlHTMLAttributes<HTMLDivElement>
> = ({
  className = '__rcs-handle-root',
  disabled,
  buttonStyle,
  linesStyle,
  portrait,
  style,
  ...props
}): ReactElement => {
  const _style: CSSProperties = {
    display: 'flex',
    flexDirection: portrait ? 'row' : 'column',
    placeItems: 'center',
    height: '100%',
    cursor: disabled ? 'not-allowed' : portrait ? 'ns-resize' : 'ew-resize',
    pointerEvents: 'none',
    color: '#fff',
    border: '1px white dashed',
    ...style,
  };

  const _linesStyle: CSSProperties = {
    flexGrow: 1,
    height: portrait ? 0 : '100%',
    width: portrait ? '100%' : 0,
    backgroundColor: 'transparent',
    pointerEvents: 'auto',
    ...linesStyle,
  };

  return (
    <div {...props} className={className} style={_style}>
      <div style={_linesStyle} />
    </div>
  );
};
export default function ImgComp({ img1, img2 }:{img1:string, img2:string}) {
  const [portrait, setPortrait] = useState(false);
  return (
    <div className="w-full relative">
      <div className="absolute z-10 top-0 right-0 p-5">
        <Button variant="ghost" className="border-2 border-white text-white" size="icon" onClick={(e)=>{e.preventDefault();setPortrait((prev)=>!prev)}}>
          {portrait ? <UnfoldHorizontal/> : <UnfoldVertical/>}
        </Button>
      </div>
      <ReactCompareSlider className="my-5 img-comp" handle={<ReactCompareSliderHandle portrait={portrait}/>} portrait={portrait}
        itemOne={<ReactCompareSliderImage src={img1} alt="Image one" />}
        itemTwo={<ReactCompareSliderImage src={img2} alt="Image two" />}
      />
    </div>
  );
}