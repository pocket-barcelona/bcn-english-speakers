import { useState } from "preact/hooks";
import { twMerge } from "tailwind-merge";
import bcnImage from "../../assets/barcelona-old-town.jpg";

// Single place

// Multiple places
// "Tonight we have 2 options:" or "Which one do you prefer?" or "I like both of these"
// Option 1: El Ascensor / Gothic Quarter - https://maps.app.goo.gl/oYPp2tbZ5jdRPbgs7?g_st=ic
// Option 2: Plaça Reial: https://maps.app.goo.gl/REJ7RzxYKfmLFjfh9?g_st=ic

const TEMPLATES: MessageTemplateCardProps[] = [
  {
    name: "Dinner tonight",
    copy: "I've booked this restaurant for dinner tonight at X.XXpm - {link}.",
  },
  {
    name: "Go here tonight?",
    copy: "Do you want to go here tonight? {link}",
  },
  {
    name: "Been before",
    copy: "Have you been here before? I would like to go. {link}",
  },
  {
    name: "Lunch",
    copy: "I was thinking to go here for lunch today/tomorrow. Would you like to come? {link}",
  },
];
const FAKE_LINK = "https://maps.app.goo.gl/a1b2c3d4e5f6";

const interpolateTemplate = (copy: string, link?: string) => {
  // if (selected === -1) return "";
  // const selectedTemplate = TEMPLATES[selected];
  // return selectedTemplate.copy.replace("{link}", FAKE_LINK);
  return copy.replace("{link}", link || FAKE_LINK);
};

export default function App() {
  const [link, setLink] = useState("");
  const [selected, setSelected] = useState(-1);

  const handleLinkChange = (e: Event) => {
    setLink((e.target as HTMLInputElement).value);
  };

  const handleChooseTemplate = (index: number) => {
    setSelected(index);
  };

  const messageTemplateString = selected === -1 ? '' : interpolateTemplate(TEMPLATES[selected].copy, link);

  return (
    <div class="not-prose bg-neutral-100 p-4">
      <h2 class="text-4xl font-bold my-4 mb-8">Single place</h2>

      <h3 class="text-3xl font-bold my-4 mb-8">
        1. Add Google Maps share link
      </h3>

      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-3">
          <label
            for="link-text"
            class="block text-sm/6 font-medium text-gray-900"
          >
            Maps link (you can get this from Google Maps share)
          </label>
          <div class="mt-2">
            <input
              id="link-text"
              type="text"
              name="link-text"
              placeholder="https://maps.app.goo.gl/..."
              autocomplete="off"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              onChange={handleLinkChange}
            />
          </div>
        </div>
      </div>

      <hr class="border-b! border-black my-8" />

      <h3 class="text-3xl font-bold my-4 mb-8">
        2. Choose WhatsApp message template
      </h3>

      <div class="grid grid-cols-3 gap-4">
        {TEMPLATES.map((template, index) => (
          <MessageTemplateCard
            {...template}
            link={link || "https://maps.app.goo.gl/abc123def456"}
            onClick={() => handleChooseTemplate(index)}
            isSelected={selected === index}
          ></MessageTemplateCard>
        ))}
      </div>

      <hr class="border-b! border-black my-8" />

      <h3 class="text-3xl font-bold my-4 mb-8">3. Copy template code</h3>
      <p>
        Copy the below template code into WhatsApp and make any changes there.
      </p>

      <textarea
        name=""
        readOnly
        class="max-w-xl border tracking-tight text-sm border-neutral-700 rounded-xl p-2 font-mono min-h-40"
      >
        {messageTemplateString}
      </textarea>
    </div>
  );
}

type MessageTemplateCardProps = {
  name: string;
  copy: string;
  link?: string;
  isSelected?: boolean;
  onClick?: () => void;
};
function MessageTemplateCard({
  name,
  copy,
  link,
  isSelected,
  onClick,
}: MessageTemplateCardProps) {
  return (
    <div class="flex flex-col gap-2">
      <h3 class="text-center text-lg font-semibold">{name}</h3>
      <button
        type="button"
        class={twMerge(
          "outline-0 h-full mx-auto my-0 text-left cursor-pointer border-4 rounded-2xl bg-[#264c39] hover:border-blue-400",
          isSelected ? "border-blue-400 shadow-lg" : "border-transparent",
        )}
        onClick={onClick}
      >
        <div class="bg-[#1e3d2d] overflow-hidden rounded-xl flex flex-col relative">
          <img src={bcnImage.src} alt="" />
          {isSelected && (
            <div class="absolute top-4 left-4 rounded-full w-6 h-6 bg-white p-0.5 flex justify-center items-center">
              <div class="bg-blue-400 w-full h-full rounded-full"></div>
            </div>
          )}
          <div class="p-1.5">
            <p class="text-white text-sm font-semibold my-0.5! tracking-tight">
              Tapas Restaurant &middot; 4.6* (4532) &middot; Mediterranean
              restaurant &amp; bar
            </p>
            <p class="text-gray-400 text-sm font-semibold my-0.5! tracking-tight">
              Carrer de Sant Jaume, 1, Ciutat Vella, 08003 Barcelona
            </p>
          </div>
        </div>
        <p class="text-white text-base font-medium tracking-tight p-1 min-h-16">
          {interpolateTemplate(copy, link)}
        </p>
      </button>
    </div>
  );
}
