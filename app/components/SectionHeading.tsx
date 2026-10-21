import React from "react";

type SectionHeadingProps = {
  index: string;
  title: string;
  aside?: React.ReactNode;
};

const SectionHeading: React.FC<SectionHeadingProps> = ({ index, title, aside }) => (
  <div className="mb-8 flex items-center gap-4">
    <span className="font-mono text-xs text-muted-foreground">{index}</span>
    <h2 className="text-sm font-medium tracking-tight text-foreground">{title}</h2>
    <span className="h-px flex-1 bg-border" aria-hidden />
    {aside}
  </div>
);

export default SectionHeading;
