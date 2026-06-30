"use client";

import katex from "katex";

interface MathBlockProps {
  math: string;
  display?: boolean;
}

export function MathBlock({ math, display = false }: MathBlockProps) {
  let html: string;
  try {
    html = katex.renderToString(math, {
      displayMode: display,
      throwOnError: false,
      trust: true,
      strict: false,
    });
  } catch {
    html = `<span class="text-red-400">${math}</span>`;
  }

  return display ? (
    <div
      className="block my-6 overflow-x-auto text-center"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  ) : (
    <span dangerouslySetInnerHTML={{ __html: html }} />
  );
}
