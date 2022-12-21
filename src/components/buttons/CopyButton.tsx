import { useState } from "react";
import Check from "../icons/Check";
import Copy from "../icons/Copy";

interface Props {
  link: string;
}

const CopyButton = ({ link }: Props) => {
  const [copied, setCopied] = useState<boolean>(false);
  const copyToClipboard = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <button
      onClick={() => copyToClipboard(link)}
      className="flex items-center justify-center gap-2 p-2"
    >
      <span className="sr-only">Copy link</span>
      {copied ? <Check /> : <Copy />}
    </button>
  );
};

export default CopyButton;
