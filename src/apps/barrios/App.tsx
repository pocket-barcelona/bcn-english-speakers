import type { PageContext } from "../_common/types";

interface Props extends PageContext {}

export default function App({ barrios }: Props) {
  
  return (
    <div>
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base/7 font-semibold text-gray-900">
          Personal Information
        </h2>
        <p class="mt-1 text-sm/6 text-gray-600">
          Use a permanent address where you can receive mail.
        </p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label
              for="search-text"
              class="block text-sm/6 font-medium text-gray-900"
            >
              Search
            </label>
            <div class="mt-2">
              <input
                id="search-text"
                type="text"
                name="search-text"
                autocomplete="off"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label
              for="country"
              class="block text-sm/6 font-medium text-gray-900"
            >
              Country
            </label>
            <div class="mt-2 grid grid-cols-1">
              <select
                id="country"
                name="country"
                autocomplete="country-name"
                class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
              <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                data-slot="icon"
                aria-hidden="true"
                class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
              >
                <path
                  d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          {/* 
          <div class="sm:col-span-3">
            <label
              for="last-name"
              class="block text-sm/6 font-medium text-gray-900"
            >
              Last name
            </label>
            <div class="mt-2">
              <input
                id="last-name"
                type="text"
                name="last-name"
                autocomplete="family-name"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div class="sm:col-span-4">
            <label
              for="email"
              class="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div class="mt-2">
              <input
                id="email"
                type="email"
                name="email"
                autocomplete="email"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div> */}
        </div>

        <div class="mt-10 space-y-10">
          <fieldset>
            <legend class="text-sm/6 font-semibold leading-6 text-gray-900">
              Barrios
            </legend>
            <div class="mt-6 space-y-6 flex flex-col gap-y-1">
              {barrios.map((district) => (
                <details key={district.id} class="flex flex-col items-stretch my-0">
                  <summary class="text-sm/6 font-medium leading-6 text-gray-900 cursor-pointer bg-olive-300 py-1 px-4 rounded-md">
                    {district.bar} {district.children?.length ? `(Barrios ${district.children.length})` : ""}
                  </summary>
                  {district.children?.map((barrio) => (
                    <div key={barrio.id} class="flex items-center py-1 px-4 gap-x-3">
                      <input
                        id={`barrios-${barrio.id}`}
                        name="barrios"
                        type="radio"
                        value={barrio.id}
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        for={`barrios-${barrio.id}`}
                        class="block text-sm/6 font-medium leading-6 text-gray-900"
                      >
                        {barrio.bar}
                      </label>
                    </div>
                  ))}
                  
                </details>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          class="text-sm/6 font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </div>
  );
}
