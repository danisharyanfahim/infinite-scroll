This is mainly just a text document to state all the things I need to do in order to get every single one of my web apps running:
Once I have a better grasp of how to use Docker and Docker compose I don't think most of these will be necessary

Initialize App---------------------------------------------------------------------------------------------------------------------------

1) Create the project folder:

CLI Commands:
-cd (project folder)
-mkdir (project )
-npx create-next-app (project name)



2) Open Project Folder, the path is usually C:\Users\(username)\nextjs-projects\(project-name)



3) Delete Unneeded files



4) Restructure directory by moving folders and files and adding new ones, here is the current structure I use with all potential folders:

-app
    -(pages)
    -components
        -ui
        -layout
        -content 
        -containers
    -context (context files go in here)
    -hooks (custom hooks go in here)
    -global (global values go in here)
    -lib (libraries folder)
    -interface (interface folder for typescript interfaces)
    -types (types folder for typescript types)
    -logs (logs and other txt files, including README's go in here)
    -test (tests go in here)
    -api (api folder for storing )
    -store (redux stores go in here)
    -config (config files and .env files go in here)
    -utils (global functions, which are utilized around the entire app go in here)
    -json (Non package related json files go in here)
    -styles (global sass and css files go in here)
        -partials (partial styles go in here)
    -auth (anything related to authentication goes in here)
    -classes (classes go in here)
    -database (databases go in here if necessary)
    layout.tsx
    icon.ico(favicon)
-public
    -static or assets
        -videos
        -images
        -fonts
        -icons
        -svg
        -audio




5) Install Dependencies/modules

-npm i (dependency name and version) --save-dev(if it's a dev dependency)
-sass 
-next-themes (Theme selector for nextJS)
-sanity@latest (CMS client) (Ignore this for now)
-react-icons (icons)
-react-syntax-highlighter (code highlighter based on prismJS for react)



6) Replace layout.tsx file in the app directory with the following code:

import "./styles/globals.scss";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
 {return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="keywords"
          content="keyword-1, keyword-2, ...keyword-n"
        />
        <meta name="description" content="website-description" />
        <meta name="author" content="Danish Fahim" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Website-Title</title>
        {/* < http-equiv="refresh" content="60"/> */} //If I need the page to refresh at a constant interval
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
            <Suspense fallback={<LoaderComponent/>}>
                <Navbar />
                <div className='page'>
                    {children}
                    <Footer />
                </div>
            </Suspense>
        </ThemeProvider>
      </body>
    </html>);
}



7) Change favicon to the icon of my choice



8) Next Config, copy and paste:

import type { NextConfig } from "next";
import { ThemeProvider } from "./context/ThemeProvider";
import Navbar from "./components/layout/nav/Navbar";
import Footer from "./components/layout/Footer";
import { Suspense } from "react";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", port: "" },
    ],
  }, //If working with sanity
  reactStrictMode: false, //disable reactStrictMode
  eslint: { //Ignore eslint errors during vercel deployment
    ignoreDuringBuilds: true,
  },
  typescript: { //Ignore typescript errors during vercel deployment
    ignoreBuildErrors: true,
  },
};

export default nextConfig;



9) Initialize and connect project to Git: 

-Create github folder (Can make it either public or private)
-git init
-git commit -m 'first commit'
-git branch -M main (optional if I want the branch to be called main, but I have mine set to master as default)
-git remote add origin https://github.com/danisharyanfahim/'repository-name'
-git push -u origin master or git push -f origin master (if it doesn't work)


Updating Project:
-git add .
-git commit -m 'describe any changes made'
-git push -u origin master or git push -f origin master (if it doesn't work)ush 


10) Global Styles

Copy and paste into either globals.css or globals.scss 

-(Add the css after)

11) Utility functions

Start/Stop App---------------------------------------------------------------------------------------------------------------------------

Running) Run project by typing npm run dev into the CLI

Stopping) Holding Ctrl + C into the terminal running the app (The one where I typed npm run dev)

Notes:
-Good practice to have multiple terminals open, this way I can install things if I need them while keeping the app running

Sanity-----------------------------------------------------------------------------------------------------------------------------------

1) Create Sanity Folder

CLI commands:
-npm create sanity@latest -- --template clean --create-project "project-name" --dataset production --typescript --output-path sanity

Would you like to add configuration files for a sanity project on this Next.js folder? 
-n

2) Packages to Install to Sanity:

CLI commands:
-npm i (dependency name)

    a)Project directory
    -@sanity/image-url
    -@sanity/client
    b)Sanity directory
    -@sanity/code-input (Code highlighter for sanity studio)
    -sanity-plugin-mux-input (Video plugin for sanity studio)

3) Copy and paste/replace the following lines of code into the sanity.config file:

  import {codeInput} from '@sanity/code-input'
  import {muxInput} from 'sanity-plugin-mux-input'
  
  plugins: [structureTool(), visionTool(), codeInput(), muxInput()], 


4) Add .vercelignore and paste '-sanity' into it

5) Run sanity studio dev version:

  1) Open a new terminal 
  
  CLI commands:
    -cd sanity (Go into the sanity folder for the project)
    -npm run dev (Start the dev server within the sanity folder) 

  2) Go to localhost:3333, and login into sanity through github

6) To deploy to sanity.io:

  1) Open a new terminal 
  
  CLI commands:
    -cd sanity (Go into the sanity folder for the project)
    -npm run deploy (Deploy sanity studio within the sanity folder) 

    create new build (project name)?
    -y

  2) Login into sanity through github

7) Updating existing build, repeat the same steps as if you were deploying for the first time,
but when it asks to create a new build it will ask if you want to select from an existing build, 
then you select the build for your project and continue with the same steps
