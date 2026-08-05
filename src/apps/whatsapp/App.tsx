import { useState } from 'preact/hooks';
import Switch from '../../components/ui/switch';
import { TEMPLATES_MULTIPLE, TEMPLATES_SINGLE } from './data';
import MessageTemplate from './MessageTemplate';
import { interpolateTemplateMultiple } from './utils';

// Single place

// Multiple places
// "Tonight we have 2 options:" or "Which one do you prefer?" or "I like both of these"
// Option 1: El Ascensor / Gothic Quarter - https://maps.app.goo.gl/oYPp2tbZ5jdRPbgs7?g_st=ic
// Option 2: Plaça Reial: https://maps.app.goo.gl/REJ7RzxYKfmLFjfh9?g_st=ic

export default function App() {
  const [multiple, setMultiple] = useState(false);
  const [link, setLink] = useState<string[]>([]);
  const [selected, setSelected] = useState(-1);
  const templates = multiple ? TEMPLATES_MULTIPLE : TEMPLATES_SINGLE;

  const handleLinkChange = (e: Event, index: number) => {
    const linkValue = (e.target as HTMLInputElement).value.trim();
    setLink((prev) => {
      const newLinks = [...prev];
      newLinks[index] = linkValue;
      return newLinks;
    });
  };

  const handleChooseTemplate = (index: number) => {
    setSelected(index);
  };

  const handleSwitchChange = (checked: boolean) => {
    setMultiple(checked);
  };

  const messageTemplateString =
    selected === -1 ? '' : interpolateTemplateMultiple(templates[selected].copy, link);

  return (
    <div class="not-prose bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white p-4">
      <h2 class="text-4xl font-bold my-4 mb-8">Single or multiple places?</h2>
      <Switch label="Enable multiple" onCheckedChange={handleSwitchChange}></Switch>

      <h3 class="text-3xl font-bold my-4 mb-8">1. Add Google Maps share link/s</h3>
      <p class="italic">Note: you can get these from Google Maps share</p>
      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 ml-0 max-w-2xl">
        <div class="">
          <label for="link-text" class="block text-sm/6 font-medium">
            Maps link 1
          </label>
          <div class="mt-2">
            <input
              id="link-text"
              type="text"
              name="link-text"
              placeholder="https://maps.app.goo.gl/..."
              autocomplete="off"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              onChange={(event) => handleLinkChange(event, 0)}
            />
          </div>
        </div>

        <div class={multiple ? '' : 'hidden'}>
          <label for="link-text" class="block text-sm/6 font-medium">
            Maps link 2
          </label>
          <div class="mt-2">
            <input
              id="link-text-2"
              type="text"
              name="link-text-2"
              placeholder="https://maps.app.goo.gl/..."
              autocomplete="off"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              onChange={(event) => handleLinkChange(event, 1)}
            />
          </div>
        </div>
      </div>

      <hr class="border-b! border-black my-8" />

      <h3 class="text-3xl font-bold my-4">2. Choose WhatsApp message template</h3>
      <p class="my-0">
        <em>Note: Text can be edited later in Whatsapp</em>
      </p>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {templates.map((template, index) => (
          <MessageTemplate
            {...template}
            link={link[0] ?? 'https://maps.app.goo.gl/abc123def456'}
            onClick={() => handleChooseTemplate(index)}
            isSelected={selected === index}
          ></MessageTemplate>
        ))}
      </div>

      <hr class="border-b! border-black my-8" />

      <h3 class="text-3xl font-bold my-4 mb-8">3. Copy template code</h3>
      <p>Copy the below template code into WhatsApp and make any changes there.</p>

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
