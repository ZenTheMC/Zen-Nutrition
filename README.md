# Zen Nutrition

PROBLEM: Many people I've worked with have no idea how to construct their diet when they first came to me.



SOLUTION: I created a user-friendly and science-based responsive full-stack application:

|| A food logging database ||

**Link to project:**

[Zen Nutrition](<LIVE VERSION URL>)

![App Logo](https://drive.google.com/uc?export=view&id=1rJACkTCTARcP5WiBNMxjdwFxGOmQGMUn) ![App Screenshot](<DRIVE SCREENSHOT>)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, React, Node, Express, MongoDB, Vercel.

-Users can create an account.

-Authenticated users can log their food items into their daily intake forms.

-Custom food entries can also be added if you know the nutrition per serving.

-They can view their macros and calorie totals for the day.


## Optimizations (*Contributions Welcome*)

-Create toggle themes for Dark/Light Modes.

-Add a bodyweight tracking feature.

-Add a progress picture uploading feature.

-Add LLM with vision feature with to guess calories based on input picture.

-Suggest macros + calories based on inputted bw, steps, trends in bw with the current kcals.

## Lessons Learned:

-Monorepo format for vercel

-Deploying both a frontend and backend on vercel for serverless hosting(the backend url will show 404, which is normal, use the frontend url for the live site)

-Using vite to create a react app

-Monorepo serverless codebase structure being | DIFFERENT | than a standard MERN stack app that has a server.js, routes, and app.js