import { twMerge } from "tailwind-merge";
import bcnImage from '../../assets/barcelona-old-town.jpg';
import { interpolateTemplate } from "./utils";

type MessageTemplateCardProps = {
  name: string;
  copy: string;
  link?: string;
  isSelected?: boolean;
  onClick?: () => void;
};
export default function MessageTemplate({ name, copy, link, isSelected, onClick }: MessageTemplateCardProps) {
  return (
    <div class="flex flex-col gap-2">
      <h3 class="text-center text-lg font-semibold">{name}</h3>
      <button
        type="button"
        class={twMerge(
          'flex flex-col justify-start',
          'outline-0 h-full mx-auto my-0 text-left cursor-pointer border-4 rounded-2xl bg-[#264c39] hover:border-blue-400',
          isSelected ? 'border-blue-400 shadow-lg opacity-85' : 'border-transparent',
        )}
        onClick={onClick}
      >
        <div class="bg-[#1e3d2d] overflow-hidden rounded-xl flex flex-col relative">
          <img src={bcnImage.src} alt="" />
          {isSelected && (
            <div class="absolute top-4 right-4 rounded-full w-6 h-6 bg-white p-0.5 flex justify-center items-center">
              <div class="bg-blue-400 w-full h-full rounded-full"></div>
            </div>
          )}
          <div class="p-1.5">
            <p class="text-white text-sm font-semibold my-0.5! tracking-tight">
              Tapas Restaurant &middot; 4.6* (4532) &middot; Mediterranean restaurant &amp; bar
            </p>
            <p class="text-gray-400 text-sm font-semibold my-0.5! tracking-tight">
              Carrer de Sant Jaume, 1, Ciutat Vella, 08003 Barcelona
            </p>
          </div>
        </div>
        <p class="text-white text-base font-medium tracking-tight p-1 min-h-16 break-all">
          {interpolateTemplate(copy, link)}
        </p>
      </button>
    </div>
  );
}
