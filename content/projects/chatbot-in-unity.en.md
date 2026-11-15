---
title: 'Implementing a chatbot in Unity'
date: '2026-11-15'
translationKey: 'chatbot-in-unity'
description: 'Yeah, LLMs are everywhere now...'
project_classifications: ['Artificial Intelligence']
stack: [Unity, Large Language Models]
---

That was quick. I think the most time&#45;consuming part here was waiting for Unity to create the project file, more so than making the chatbot itself. Other than that, all I had to do was download the LLMUnity repository, rack my brain over the hierarchy of each chat element, choose a model (Qwen 3.5 0.8B), have RAM to spare, and copy the C# script that connects the UI to the AI.

The final result was this:
{{< project-gallery layout="single" folder="chatbot-in-unity" images="chatbot.png" alts="Chatbot made in Unity responding to a test message" >}}

I know, it isn&#39;t acting like a common assistant... That&#39;s because I replaced the default System Prompt with one that makes it respond in an irritated, grumpy, and impatient way. The funny part is that when I entered a prompt asking it to behave like a &#34;rebellious AI&#34;, it said it couldn&#39;t. So I changed it to behave like a &#34;character AI&#34; with those same traits, and it worked.

