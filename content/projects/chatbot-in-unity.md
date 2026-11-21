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

Eu sei, ela não está agindo como um assistente comum... Isso é porque eu troquei o System Prompt padrão por um que faz ela responder de maneira irritada, rabugenta e impaciente. A parte engraçada é que, quando eu coloquei um prompt pedindo para ela se comportar como uma &#34;IA rebelde&#34;, ela disse que não podia. Então eu troquei para que ela se comportasse como uma &#34;IA personagem&#34; (como em um jogo de RPG) com essas mesmas características e funcionou.

Eu fiz esse projeto de maneira bem simples e com pouca ambição, mas ele me fez refletir sobre como vai ser o futuro dos videogames. A &#34;IA&#34; dos NPCs hoje em dia já me parece bem boa — vide o recém-lançado GTA VI e a obra-prima técnica The Last of Us Part II —, mas ela pode se tornar ainda mais personalizada e responsiva às ações dos usuários e às infinitas possibilidades dentro de um jogo. Atualmente, se não me engano, muitas das ações são ativadas por estruturas em árvore com regras no estilo &#34;if else&#34; (IA clássica), porém, à medida que aumentam as capacidades agênticas, multimodais, de absorção de contexto e de interação das IAs modernas, suas aplicações em jogos se tornam cada vez mais promissoras. Hoje, já é possível conversar com uma LLM de maneira quase natural, inclusive por voz em tempo real, e usar instâncias personalizadas para agirem conforme premissas pré-determinadas. Oras, se agora existem pessoas que se apaixonam pelo ChatGPT, imagina o que não vai acontecer quando os personagens forem avatares controlados por IAs dentro de jogos de realidade virtual? E isso porque eu ainda nem citei a integração com as interfaces cérebro-máquina e com o feedback sensorial...

{{< project-gallery layout="single" folder="chatbot-in-unity" images="sword-art-online.png" alts="Cena de Sword Art Online com três personagens conversando ao redor de uma mesa" >}}

