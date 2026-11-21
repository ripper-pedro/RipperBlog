---
title: 'Implementing a chatbot in Unity'
date: '2026-11-15'
translationKey: 'chatbot-in-unity'
description: 'Yeah, LLMs are everywhere now...'
project_classifications: ['Artificial Intelligence']
stack: [Unity, Large Language Models]
---

This one was quick. I think the most time-consuming part here was waiting for Unity to create the project file, more so than making the chatbot itself. Other than that, all I had to do was download the LLMUnity repository, rack my brain over the hierarchy of each chat element, choose a model (Qwen 3.5 0.8B), have RAM to spare, and copy the C# script that connects the UI to the AI.

The final result was this:
{{< project-gallery layout="single" folder="chatbot-in-unity" images="chatbot.png" alts="Chatbot made in Unity responding to a test message" >}}

I know, it isn&#39;t acting like a common assistant... That&#39;s because I replaced the default System Prompt with one that makes it respond in an irritated, grumpy, and impatient way. The funny part is that when I entered a prompt asking it to behave like a &#34;rebellious AI&#34;, it said it couldn&#39;t. So I changed it to behave like a &#34;character AI&#34; (as in an RPG game) with those same traits, and it worked.
I made this project in a very simple way and with little ambition, but it made me think about what the future of video games might look like. The &#34;AI&#34; of NPCs already seems pretty good to me these days — just look at the recently released GTA VI and the technical masterpiece The Last of Us Part II — but it could become even more personalized and responsive to users&#39; actions and to the infinite possibilities within a game. Currently, if I am not mistaken, many actions are triggered by tree-based structures with &#34;if else&#34; style rules (classical AI). However, as the agentic, multimodal, context processing, and interaction capabilities of modern AIs increase, their applications in games become more and more promising. These days, it is already possible to talk to an LLM in an almost natural way, even by voice in real time, and to use personalized instances that act according to pre-determined premises. I mean, if there are already people who fall in love with ChatGPT, imagine what will happen when the characters are avatars controlled by AIs in virtual reality games? And that is without even mentioning the integration with brain-computer interfaces and sensory feedback...

{{< project-gallery layout="single" folder="chatbot-in-unity" images="sword-art-online.png" alts="Sword Art Online scene with three characters talking around a table" >}}

