import Open from "../icons/Open";

interface Props {
  link: string;
}

const RedirectButton = ({ link }: Props) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-center gap-2 p-2"
    >
      <span className="sr-only">Open chat</span>
      <Open />
    </a>
  );
};

export default RedirectButton;
