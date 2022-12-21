import { useState, useEffect } from "react";
import { getList } from "country-list-with-dial-code-and-flag";
import { useForm, SubmitHandler } from "react-hook-form";
import { replaceLinks, savedLink, saveLink } from "./utils/saveLinks";
import Open from "./components/icons/Open";
import CopyButton from "./components/buttons/CopyButton";
import DeleteButton from "./components/buttons/DeleteButton";
import RedirectButton from "./components/buttons/RedirectButton";

type Inputs = {
  countryCode: string;
  phoneNumber: number;
};

function App() {
  const [link, setLink] = useState<string>("");
  const [savedLinks, setSavedLinks] = useState<savedLink[]>();

  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const createdLink = `https://web.whatsapp.com/send?phone=${
      data.countryCode + data.phoneNumber
    }`;
    const date = new Date(Date.now());
    const fullDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    setLink(createdLink);
    saveLink(createdLink, data.countryCode + data.phoneNumber, fullDate);

    window.open(createdLink, "_blank");
  };

  const countries = getList();

  useEffect(() => {
    setSavedLinks(JSON.parse(window.localStorage.getItem("links") || "null"));
  }, [link]);
  console.log(link);

  return (
    <main className="flex flex-col items-center w-full h-full p-4">
      <div className="w-full max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <h1 className="font-bold text-gray-700">Insert WhatsApp number</h1>
            <div className="flex items-end justify-between w-full">
              <select
                {...register("countryCode")}
                id="country"
                className="pr-4 border w-36 rounded-l-md focus:ring-0"
              >
                {countries.map((country, i) => (
                  <option
                    key={`${country.dial_code}${i}`}
                    value={country.dial_code.slice(1)}
                  >
                    {country.flag} {country.code} {country.dial_code}
                  </option>
                ))}
              </select>
              <input
                {...register("phoneNumber", {
                  required: true,
                  minLength: 6,
                  maxLength: 12,
                })}
                type="number"
                id="phone"
                min={0}
                className="w-full pr-4 -ml-px border focus:ring-0 placeholder:text-gray-400"
                placeholder="Example: 1234567890"
              />
              <button
                type="submit"
                className="h-full p-2 -ml-px text-white border border-cyan-500 rounded-r-md bg-cyan-500"
              >
                <span className="sr-only">Open chat</span>
                <Open />
              </button>
            </div>
            <p className="text-xs text-gray-600">Select country code</p>
          </div>
        </form>
        {savedLinks && savedLinks.length > 0 && (
          <h2 className="mt-4 font-semibold text-cyan-800">Recent chats</h2>
        )}
      </div>
      <div className="flex-1 w-full max-w-sm my-4 space-y-2 overflow-y-scroll">
        {savedLinks
          ?.map(({ link, phone, date }: savedLink) => {
            const onDelete = () => {
              const newLinks = savedLinks.filter((l) => l.link !== link);
              setSavedLinks(newLinks);
              replaceLinks(newLinks);
            };
            return (
              <div
                className="flex items-center justify-between pb-2"
                key={link}
              >
                <div>
                  <p className="font-bold">{phone}</p>
                  <p className="text-xs">{date}</p>
                </div>
                <div className="flex items-center">
                  <RedirectButton link={link} />
                  <CopyButton link={link} />
                  <DeleteButton onDelete={onDelete} />
                </div>
              </div>
            );
          })
          .reverse()}
      </div>
      <div className="flex justify-between w-full max-w-sm text-xs bg-white">
        <a
          href="https://www.buymeacoffee.com/codewithgaston"
          target={"_blank"}
          rel="noreferrer"
          className="underline text-cyan-500"
        >
          Support me
        </a>
        <p>
          Made by{" "}
          <a
            href="https://www.codewithgaston.com"
            target={"_blank"}
            rel="noreferrer"
            className="underline text-cyan-500"
          >
            Gaston
          </a>
        </p>
      </div>
    </main>
  );
}

export default App;
