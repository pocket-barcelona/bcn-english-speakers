const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter Variable", "Inter", ...defaultTheme.fontFamily.sans],
      },
			fontSize: {
				"2xs": "0.625rem",
			},
			aspectRatio: {
				"4/3": "4 / 3",
				"3/4": "3 / 4",
				"16/9": "16 / 9",
				"9/16": "9 / 16",
				"21/9": "21 / 9",
				"9/21": "9 / 21",
				"1/1": "1 / 1",
				"3/2": "3 / 2",
				"2/3": "2 / 3",
			},
		},
	},
	plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
