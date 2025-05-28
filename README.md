# How To Build A Widget Plugin For Strapi

In this post, we will take a look at how to build a widget plugin for Strapi. 

Strapi Widgets are a way to add custom widgets to the Strapi admin panel. They are a great way to add custom functionality to the admin panel.

Let's first take a look at what we will be building, then I will walk you through the steps on how to build it.

## What We Will Be Building

We will be building a widget that displays the number of content types in the Strapi application.

Here is what the widget will look like in the admin panel:

![Widget Preview](./public/widget-preview.png)

## Action Plan

1. Create a new Strapi application with sample data
2. Create a new Strapi plugin
3. Create and register a new widget
4. Create Frontend Component
5. Create Backend Controller
6. Create Backend Routes ( Admin and Content API )
7. Put everything together.

## Step 1: Create a new Strapi application with sample data

This step is very simple. We will use the Strapi CLI to create a new Strapi application with sample data.

```bash
npx create-strapi-app@latest my-strapi-app 
```

You will be guided through the process of creating the application. 


