import { SVGProps } from 'react';

export function Menu(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="w-6 h-6 hover:text-green-700 transition"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="2em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M9 20h11q.825 0 1.413-.588T22 18v-2H9v4ZM2 8h5V4H4q-.825 0-1.413.588T2 6v2Zm0 6h5v-4H2v4Zm2 6h3v-4H2v2q0 .825.588 1.413T4 20Zm5-6h13v-4H9v4Zm0-6h13V6q0-.825-.588-1.413T20 4H9v4Z"
      ></path>
    </svg>
  );
}
