"use client";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
export default function Indicator(){
  return (
    <ProgressBar
      height="4px"
      color="#111827"
      options={{ showSpinner: true }}
      shallowRouting
    />
  );
}