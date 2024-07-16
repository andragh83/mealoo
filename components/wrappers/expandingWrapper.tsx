import * as React from "react";
import AnimateHeight from "react-animate-height";

export default function ExpandingWrapper({
  isOpen,
  children,
}: {
  children?: React.ReactNode;
  isOpen: boolean;
}) {
  return (
    <div style={{ width: "100%" }}>
      <AnimateHeight duration={200} height={isOpen ? "auto" : 0}>
        {children}
      </AnimateHeight>
    </div>
  );
}
