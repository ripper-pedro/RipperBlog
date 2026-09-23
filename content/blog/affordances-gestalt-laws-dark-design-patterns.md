---
title: 'Affordances, Leis da Gestalt e Dark Patterns'
title_html: '<em>Affordances</em>, Leis da Gestalt e <em>Dark Patterns</em>'
date: '2026-10-04'
description: 'Uma pequena introdução, com exemplos próprios, a três conceitos de design aplicáveis à Interação Humano-Computador.'
tags: [Course notes, Design]
blog_classifications: ['Interação Humano-Computador']
toc: true
---
Com um nome tão rebuscado quanto &#34;Interação Humano-Computador&#34;, quem escuta pela primeira vez pode até pensar que se trata de *sci-fi* ou futurologia. O conceito, porém, é bem direto: IHC é o estudo de como humanos interagem com computadores. É, eu disse que era direto... Mas isso não exclui o fato de que a área ainda engloba sistemas como o J.A.R.V.I.S. do Homem de Ferro. Afinal, o Tony Stark é um humano e sua armadura é um computador, não? Apesar de estarmos caminhando para uma realidade na qual cada um também terá sua própria IA pessoal (vide o novo Muse da Meta) em um futuro não tão distante — oras, estou fazendo um mestrado justamente em Realidade Virtual e Aumentada — o importante, em se tratando de IHC, é manter o pé no chão, porque o que se busca é a intuitividade.

Um exemplo de quem fez esse trabalho bem feito foi a Apple — sempre a Apple, quando falamos de *design* — ao lançar o primeiro iPhone, ou até antes, com o Macintosh. Na época, computadores pessoais ou portáteis não eram comuns, então as pessoas ainda não sabiam como usá-los. Por isso ela adotou o esqueumorfismo, outra palavra difícil mas com uma ideia simples: fazer objetos digitais ou modernos imitarem a aparência ou funcionalidade das suas versões originais, apenas para torná-los mais familiares e fáceis (intuitivos!) de usar, mesmo que isso não traga qualquer outro benefício (ou que traga até &#34;pioras&#34;, em alguns casos). Por exemplo, o &#34;*slide to unlock*&#34; imita uma tranca de porta por ferrolho; o barulho de *click* e a piscada da tela ao tirar uma foto imitam o obturador de uma câmera analógica se fechando; e os ícones de lixeira, pastas e bloco de notas imitam esses mesmos objetos no mundo real, mas não precisavam dessas analogias para entregar suas funções. De qualquer forma, apesar de tudo isso ser &#34;desnecessário&#34;, de um ponto de vista puramente pragmático, essa manobra foi absolutamente necessária para popularizar os primeiros computadores entre os humanos há alguns anos.

A primeira regra da IHC é:

> &#34;Uma boa interface é uma não interface.&#34;

Ou seja, o ideal é que as pessoas não precisem pensar em como se usa uma interface; elas devem interagir naturalmente com ela, preferencialmente sem nem perceber. Então, vamos analisar três conceitos de *design* que nos ajudam a pensar sobre essa regra: *Affordances*, Leis da Gestalt e *Dark Patterns*.

#### *Affordances*

Do verbo inglês &#34;*to afford*&#34;, que significa &#34;ter os meios&#34;, &#34;oferecer&#34; ou &#34;proporcionar&#34;, o termo *affordances* não costuma ser muito traduzido no português, mas tem a ver com a capacidade de um objeto de indicar, por si só, como se deve interagir com ele, sem a necessidade de nenhuma explicação explícita. Ou seja, é quase como uma medida de intuitividade: o quão fácil é utilizar um objeto sem precisar de um manual de instruções para ele? 

Eu já dei o exemplo de uma boa *affordance* aqui. Os primeiros *designs* de *softwares* da Apple, conforme a imagem ilustrativa abaixo:

<img class="post-illustration" src="https://static1.squarespace.com/static/50144a1784ae6db4b48e7f3d/t/51d71c39e4b0909bfe451577/1373051966361/Apple+Skeuomorphic+Designs.001.png" alt="Exemplos de aplicativos da Apple com design esqueumórfico" loading="lazy" decoding="async">

Todos esses aplicativos têm boas *affordances* porque, ao replicar o jeito que as coisas funcionam no mundo real, ficou intuitivo usá-las no mundo digital, mesmo que, para a época, esse mundo fosse completamente novo. Hoje em dia, o *design* dessas mesmas funcionalidades está muito mais minimalista, mas isso raramente afeta alguém, porque nós nos acostumamos com as mudanças graduais e agora sabemos usar um celular moderno instintivamente. Porém, muitas pessoas idosas têm dificuldades que provavelmente não teriam no iOS 1, por exemplo. Isso está relacionado com como o próprio conceito de *affordances* mudou: originalmente ele era definido como uma propriedade real e objetiva de um objeto, independentemente de quem interage com ele, porém, é evidente que o contexto cultural, social e psicológico de cada indivíduo dá a essa propriedade uma qualidade subjetiva também.

Já um exemplo de uma *affordance* ruim são as janelas europeias. Todo brasileiro que foi para a Europa e tentou abrir uma janela sabe do que eu estou falando:

<img class="post-illustration" src="https://aprodoor.com/wp-content/uploads/2025/05/Tilt-and-turn-window-partially-open-indoors-1024x683.webp" alt="Janela europeia com abertura basculante superior" loading="lazy" decoding="async">

Acontece mais ou menos assim: a primeira coisa que você vê é que ela tem uma maçaneta — sim, como se fosse uma porta! —, mas que não dá para puxar nem empurrar. Então você percebe que é porque a janela está travada, e isso só pode ter a ver com a tal da maçaneta! Logo, você tenta girá-la e funciona. Você rapidamente aprende: para baixo trava e para o lado destrava. Até aí tudo bem... O problema é que você não pôde deixar de notar que, quando girou a maçaneta, ela não foi até o final. Ela ainda poderia girar mais: para cima! Por que ela giraria para cima??? Por pura e genuína curiosidade, que é da sua natureza humana, você se coloca na triste situação de tentar descobrir o que essa terceira posição da maçaneta faz. Você nunca poderia adivinhar o que estava por vir: a janela te pega desprevenido! Ela abre apenas por cima, tombando, e por um momento você tem certeza de que ela vai cair em você, que instintiva e vergonhosamente ainda tenta segurá-la... Ou pior: quando é outro modelo, ainda mais traiçoeiro, que, pasmem, tomba para fora! Nessa situação, durante um longo milésimo de segundo, você acha que vai matar alguém, porque, de repente, a janela estava caindo do prédio!

Como meu professor quer que eu sugira uma melhoria no *design* de má *affordance* da janela europeia, acho que ela poderia ser simplesmente como as brasileiras (de correr ou empurrar, sem puxadores articulados) ou então ter um ferrolho para destravar, em vez de girar para o lado. Acho que assim os desavisados, como eu, nem iriam supor que dá para girar para cima, poupando-nos de uma terrível primeira experiência...

#### Leis da Gestalt

Você pode estar se perguntando: por que &#34;Leis **da** Gestalt&#34; e não &#34;**de** Gestalt&#34;? Acontece que Gestalt não é um psicanalista alemão ou algo do gênero, mas é, na verdade, uma escola de psicologia do início do século XX. Em resumo, a teoria da Gestalt diz que o nosso cérebro é preguiçoso — no bom sentido. Tudo na evolução se trata de como otimizar o ganho e o gasto calórico, e o cérebro é ótimo em economizar energia — não é à toa que nós consumimos apenas 20 Watts para pensar, enquanto uma IA consome milhões para &#34;pensar&#34;. Então, em vez de processar cada pequeno detalhe do mundo ao nosso redor, nosso cérebro busca constantemente por padrões, agrupando elementos visuais para criar um sentido maior. A regra é: &#34;o todo é diferente da soma de suas partes&#34;. É a máxima filosófica que vem da ciência dos fenômenos emergentes: o processo pelo qual propriedades complexas surgem a partir de interações simples entre componentes individuais, sendo que essas novas propriedades não existem e não podem ser previstas analisando-se as partes isoladamente. Um exemplo de um fenômeno emergente é justamente o cérebro humano, no qual surgem consciência e pensamentos a partir da interação de neurônios individuais, sem consciência ou capacidade de pensar.

Existem várias &#34;leis&#34; da Gestalt (Proximidade, Similaridade, Continuidade...), mas, para o exemplo que vou dar agora, a que mais importa é a relação de Figura e Fundo: seu cérebro precisa saber o que está no plano principal (a figura) e o que é cenário (o fundo). Se essa relação não for clara, você fica confuso. E adivinha quem está usando essa lei da Gestalt com maestria recentemente? A Apple de novo. Do mesmo jeito que ela usou do esqueumorfismo no passado para ensinar seus usuários a mexer no *smartphone*, ela agora quer nos preparar para as novas tecnologias que estão chegando. Se você reparar no *re-design* do iOS, vai notar uma invasão do chamado *Liquid Glass* — ou *Glassmorphism*, para os mais chiques. É uma estética cheia de transparências, desfoques e camadas que imitam um vidro que se comporta como um líquido — eu sei, os nomes dos conceitos são bem diretos mesmo... No fundo, é a versão moderna e refinada do que o Windows Vista fez lá em 2007 com o tema Aero (que você achava o máximo na época). Mas a Apple não adotou o visual de &#34;vidro líquido&#34; só porque é bonito e minimalista. O objetivo real é ir treinando o nosso cérebro, desde já, para as interfaces de Realidade Virtual e Aumentada (como o Vision Pro e os futuros óculos inteligentes) que todos nós provavelmente usaremos.

<img class="post-illustration" src="https://images.lifestyleasia.com/wp-content/uploads/sites/2/2025/06/10174713/top-announcements-wwdc25-news-info-000.jpg" alt="Captura de tela do novo design em Liquid Glass do iOS" loading="lazy" decoding="async">

Pense comigo: como funciona a lei de Figura e Fundo no seu celular hoje? A notificação *pop-up* que aparece é a figura, a tela de trás é o fundo. Fácil. Mas e quando a tela for... o mundo real? Imagine que você está andando na rua com seus óculos de RA e recebe uma mensagem. Se a interface for um retângulo opaco e chapado que pula literalmente na sua cara, você perde a visão periférica, não enxerga a calçada e tropeça. Sendo menos alarmista, o principal problema é que a poluição visual seria muito grande e a interface ficaria desagradável. Já quando um *pop-up* de *Liquid Glass* aparece flutuando na sua frente, ele apenas borra o mundo real atrás dele. O seu cérebro, usando a lei de Figura e Fundo, entende instantaneamente a hierarquia, você sabe onde está e sua visão não fica poluída. Você ganha a informação da interface sem perder o contexto do mundo físico.

A Apple está nos dando uma aula de *design* contínuo: eles pegam conceitos da psicologia visual, transformam em um efeitinho bonito de &#34;vidro&#34; no seu celular hoje, apenas para que, daqui a cinco anos, quando a interface pular na frente dos seus olhos, você sinta que aquilo é a coisa mais natural do mundo. Afinal, como vimos na regra de ouro da IHC: uma boa interface é uma não interface. Eles estão basicamente criando o próprio objeto original para aplicar o esqueumorfismo em cima dele depois.

Já um exemplo de mau uso das Leis da Gestalt, conforme solicitado por meu professor, é o próprio calendário de aulas do site do meu mestrado:

<img class="post-illustration" src="/RipperBlog/images/hci-weekly-schedule.png" alt="Grade semanal do meu curso" style="width:min(100%,760px)" loading="lazy" decoding="async">

Checar qual será a próxima aula deveria ser uma tarefa rápida e intuitiva. Porém, algumas leis foram ignoradas (ou aplicadas de forma invertida), causando o efeito contrário do desejado:

**1. Lei da Proximidade -** diz que elementos próximos uns dos outros tendem a ser percebidos como um grupo. Em um calendário semanal, o mínimo que se espera é que os turnos do mesmo dia pareçam pertencer àquele dia. No cabeçalho deste calendário, temos os dias da semana e os turnos. No entanto, a linha vertical que separa o &#34;PM&#34; de um dia do &#34;AM&#34; do dia seguinte é visualmente idêntica à linha que separa o &#34;AM&#34; do &#34;PM&#34; dentro de um mesmo dia. Como o espaçamento é contínuo e uniforme, o cérebro não agrupa os turnos por dia da semana. Em vez de enxergar &#34;5 dias com 2 blocos cada&#34;, você enxerga 10 colunas genéricas e independentes na tela. Talvez os turnos *AM* e *PM* devessem ficar na vertical, ou separados por um espaçamento entre dias diferentes. Além disso, como os dias não estão numerados um por um, o leitor é forçado a contar para saber qual dia do mês é referente a qual dia da semana.

**2. Lei da Similaridade -** diz que o nosso cérebro agrupa coisas que se parecem (mesma cor, mesma forma, mesma fonte). O *designer* aqui tentou usar isso, mas criou uma poluição visual difícil de ser decifrada. Talvez fosse melhor usar o nome completo das matérias e professores, em vez de siglas. Caso faltasse espaço, simplesmente usar o primeiro nome do professor (como &#34;Mohamed&#34; em vez de &#34;MD&#34;) ou algo mais representativo (&#34;Coll. Env.&#34; em vez de &#34;CE&#34;) já ajudaria bastante. A separação por cores foi uma boa ideia para tentar se aproveitar da Lei da Similaridade, mas, como diria um sábio tio meu: 

> &#34;A estrada para o inferno está pavimentada de boas intenções.&#34; 

Nós vamos ver na próxima lei como isso acabou sendo prejudicial.

**3. Lei da Região Comum e Lei da Continuidade -** a primeira dita que elementos dentro de uma fronteira delimitada (como um bloco de uma mesma cor de fundo) são percebidos como uma única entidade, e a segunda diz que nossos olhos tendem a seguir direções fluidas, como linhas retas. Veja o que acontece a partir da Semana 38. O *designer* decidiu agrupar semanas inteiras, criando blocos gigantescos na vertical (como o longo retângulo verde cruzando as tardes de terça e as manhãs de quinta, ou o bloco lilás nas tardes de segunda). O problema é estrutural: um calendário escolar é vivido no tempo, ou seja, na horizontal (você passa pela Semana 38, da segunda até a sexta, da esquerda para a direita). Mas as regiões comuns verticais forçam a sua visão de cima para baixo. Quando você tenta ler as linhas de forma horizontal, o seu olho bate num &#34;muro&#34; visual de cores na vertical e se perde. O *design* está, literalmente, lutando contra a direção em que o tempo passa.

> [!NOTE] Nota do autor
>
> O *design* é tão anticognitivo que a LLM que eu usei para revisar a ortografia deste texto se perdeu nas colunas e cores, leu os dias errados e tentou me corrigir. Se a máquina feita para achar padrões falhou em encontrá-los, imagina o quão desagradável isso não é para o cérebro humano, que é ávido por padrões preguiçosamente fáceis.

#### *Dark Patterns*

Finalmente temos um nome mais criativo e menos direto para um conceito! No *design*, *Dark Patterns* são aquelas artimanhas estruturais feitas de propósito para te induzir ao erro, dificultar uma ação que você quer tomar ou te prender em um *loop*. É a interface focada puramente no benefício da empresa, ignorando e até sabotando o bem-estar do usuário. Sabe quando você tenta cancelar uma assinatura e o botão de &#34;manter plano&#34; é enorme e brilhante, enquanto o de &#34;cancelar&#34; é um texto cinza minúsculo escondido no rodapé? Isso é um padrão sombrio clássico. Mas o exemplo que eu mais odeio — pelo menos dos que eu já reparei — é bem mais complexo que um botão cinza.

Como diz a máxima do mundo da tecnologia: 

> &#34;Quando você não paga por um produto, você é o produto.&#34;

É por isso que as redes sociais usam e abusam de *dark patterns* comportamentais para te manter viciado nelas. E o maior culpado atualmente são os algoritmos de vídeos curtos, que causam o famoso &#34;*doomscrolling*&#34;:

<img class="post-illustration" src="/RipperBlog/images/doomscrolling-infinity.png" alt="Ensinaram a mosca-da-fruta a rolar o feed no iPhone Duo" loading="lazy" decoding="async">

O *feed* de rolagem infinita, no qual a tela nunca acaba e o próximo vídeo já começa a carregar antes mesmo do atual terminar (experimente ficar sem internet nos *Reels* do Instagram; você vai ver que seu vídeo vai travar mas os próximos 5 já têm o início carregados), é projetado milimetricamente para remover qualquer atrito que te faria parar e fechar o aplicativo. Quanto mais tempo você passa rolando a tela, mais dados eles extraem para vender para outras empresas, mais conseguem manipular seu pensamento em prol de interesses próprios e mais propagandas conseguem te mostrar. Foi-se a época em que redes sociais eram sobre se conectar com os amigos. Que descanse em paz, Orkut — todo brasileiro que usava a internet nos anos 2000 sabe bem do que estou falando e da falta que comunidades reais fazem. Hoje, a internet é sobre controle do que os usuários consomem e retenção de tempo de tela.

A minha tática de sobrevivência tem sido radical: eu não tenho nenhum aplicativo que contenha vídeos curtos instalado no meu celular. No TikTok eu nunca nem criei uma conta, pois sei que:

> &#34;Se você encara demais o abismo, ele te encara de volta.&#34;

Mas a dependência é real, então eu ainda acesso o Instagram e o YouTube, só que com regras estritas. Eu não uso qualquer navegador no celular, uso o Firefox. Ele me permite baixar *plug-ins* para bloquear URLs específicas (assim eu uso o Instagram sem acesso à aba de *Reels* e o YouTube sem a página de *Shorts*) e esconder *posts* patrocinados ou sugeridos. Com essa manobra, eu só vejo o que quem eu sigo de fato está postando e meu *feed* tem um fim. E sabe qual é o mais assustador? Mesmo bloqueando os vídeos curtos e sugeridos, eu ainda passo mais tempo do que deveria nessas plataformas, o que só prova o quão incrivelmente eficaz e sorrateiro o *dark pattern* é.

A solução real e definitiva, felizmente, está a caminho: [o Orkut anunciou que vai voltar!](https://orkut.com/) O problema é que ainda não tem data divulgada... Então, até termos uma rede social de verdade novamente, a nossa única solução provisória é usar essas gambiarras ou nos isolarmos nas montanhas como monges.

