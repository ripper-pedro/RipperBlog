---
title: 'Implementando um chatbot no Unity'
date: '2026-11-15'
translationKey: 'chatbot-in-unity'
description: 'É, as LLMs estão em todo lugar agora...'
project_classifications: ['Inteligência Artificial']
stack: [Unity, Large Language Models]
---

Esse foi rápido. Acho que a parte mais demorada aqui foi esperar o Unity criar o arquivo do projeto, mais do que fazer o chatbot em si. De resto, eu só tive que baixar o repositório LLMUnity, quebrar a cabeça com a hierarquia de cada elemento do chat, escolher um modelo (Qwen 3.5 0.8B), ter memória RAM sobrando e copiar o script em C# que conecta a UI à IA.

O resultado final foi esse:
{{< project-gallery layout="single" folder="chatbot-in-unity" images="chatbot.png" alts="Chatbot feito no Unity respondendo a uma mensagem de teste" >}}

Eu sei, ela não está agindo como um assistente comum... Isso é porque eu troquei o System Prompt padrão por um que faz ela responder de maneira irritada, rabugenta e impaciente. A parte engraçada é que, quando eu coloquei um prompt pedindo para ela se comportar como uma &#34;IA rebelde&#34;, ela disse que não podia. Então eu troquei para que ela se comportasse como uma &#34;IA personagem&#34; com essas mesmas características e funcionou.

