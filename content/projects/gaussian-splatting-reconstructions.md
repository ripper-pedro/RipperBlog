---
title: 'Reconstruindo cenas com Gaussian Splatting'
date: '2026-11-14'
translationKey: 'gaussian-splatting-reconstructions'
description: 'Voilà: versões 3D de mim e do meu computador.'
project_classifications: ['Renderização 3D']
stack: [Python, Gaussian Splatting]
---

Um nome que ficou na moda recentemente é o &#34;*Gaussian Splatting*&#34;. Trata-se de uma técnica de *novel view synthesis*, ou seja, ela permite reconstruir uma cena 3D a partir de algumas fotos de diferentes ângulos de um objeto-alvo, criando imagens desse objeto de ângulos completamente novos, que nunca foram fotografados originalmente. O nome &#34;*Gaussian*&#34; vem das primitivas gaussianas, que são elipsoides 3D com propriedades como cor, opacidade e posição. Já o nome &#34;*Splatting*&#34; vem da capacidade dessas gaussianas de se dividir ou duplicar para serem projetadas na tela em 2D.

Abaixo está um exemplo de uma reconstrução que fiz de mim mesmo para um trabalho prático há algum tempo:

{{< gaussian-splat-viewer id="avatar" src="splats/avatar-project.ply" >}}

Mas hoje vamos focar no passo a passo que segui para fazer a reconstrução do meu computador. Já adianto que o resultado não ficou bom, por vários motivos:

- O gabinete é todo preto e cheio de superfícies lisas ou padrões repetitivos, o que dificulta a diferenciação entre seus pontos;
- Ele também tem muitas muitas partes reflexivas e/ou transparentes, especialmente as &#34;janelas&#34; de acrílico;
- A associação de fotografia da faculdade não conseguiu abrir o armário com as câmeras boas para me emprestar uma, então tive que usar a do meu Motorola de 66,66 euros (400 reais);
- Eu tirei poucas fotos...

Eu já sabia de todas essas limitações do algoritmo para lidar com o objeto que escolhi reconstruir, mas o escolhi mesmo assim por dois motivos: primeiro, porque meu computador é o único objeto pessoal relevante que tenho em casa no momento — foi a única coisa de valor que trouxe do Brasil para a França. Afinal, não vou fazer uma reconstrução 3D das minhas cuecas, né?. Segundo, porque tenho orgulho dele. Comprei todas as peças — mesmo que usadas ou do camelô — com o salário do meu primeiro estágio e montei-o sozinho, do zero. Também sabia das limitações do meu processo de aquisição de dados, mas ao menos isso servirá para comparar com uma reconstrução futura que pretendo fazer, de maneira bem mais rigorosa, para o trabalho final de outra disciplina.

Feitas as ressalvas necessárias, vamos ao que interessa. O primeiro passo foi levar o computador para um lugar com boa iluminação e fotografá-lo algumas vezes, a partir de diferentes ângulos e distâncias. Abaixo estão alguns exemplos das fotos que tirei:
{{< project-gallery layout="grid" images="computer-input-01.jpg|computer-input-02.jpg|computer-input-03.jpg|computer-input-04.jpg" alts="Foto do gabinete vista de cima|Foto do gabinete vista de cima por outro ângulo|Foto lateral do gabinete|Outra vista lateral do gabinete" >}}

Em seguida, joguei essas fotos no COLMAP e segui as instruções para uma reconstrução densa, já que a esparsa havia retornado muitos pontos para o chão e pouquíssimos para o computador em si. Abaixo está um print da nuvem de pontos com as posições calculadas das câmeras:
{{< project-gallery layout="single" images="computer-colmap.png" alts="Nuvem de pontos do COLMAP com as posições estimadas das câmeras ao redor do computador" >}}

Antes de rodar o treino do GS, usei um modelo *open-source* de segmentação (*BiRefNet*) para criar máscaras apenas do meu computador nas fotos. Não o usei antes porque os detalhes do chão ajudavam o algoritmo a calcular as posições da câmera e relacionar as imagens entre si. Mas agora queremos que a renderização mostre apenas o computador, então devemos ignorar o fundo. Abaixo está um exemplo das máscaras e da nuvem de pontos filtrada, apenas com os pontos que eram projetados dentro delas:
{{< project-gallery layout="pair" images="computer-mask-preview.jpg|computer-mask.png" alts="Prévia da máscara de segmentação aplicada ao gabinete|Máscara binária do gabinete, em branco, sobre fundo preto" >}}
{{< project-gallery layout="single" images="computer-filtered-cloud.png" alts="Nuvem de pontos filtrada para mostrar apenas o gabinete do computador" >}}

Por fim, o resultado final, treinado usando a biblioteca gsplat, foi este:

{{< gaussian-splat-viewer id="computer" src="splats/computer-project.sog" >}}

Meu professor também pediu que eu importasse o resultado para o Unity. Foi bem simples, bastou baixar o repositório &#34;UnityGaussianSplatting&#34; e seguir seu tutorial rápido. A única coisa que tive que fazer além disso foi mexer nas transformações do objeto para deixá-lo centralizado na origem e com as orientações corretas:

{{< project-gallery layout="single" images="unity-gaussian-splatting.png" alts="Projeto de Gaussian Splatting aberto no Unity, com o gabinete do computador centralizado na origem" >}}

Uma coisa que aprendi é que não devo repetir a foto do ângulo inicial da aquisição de dados. A primeira reconstrução que eu havia feito renderizava indesejadamente um segundo computador, sobreposto ao primeiro, apenas nas vistas frontais. Isso acontecia porque eu sempre começava e terminava a tirar as fotos a partir da vista frontal, que acabou ficando redundante e induzindo o algoritmo ao erro. Tive que rodar um segundo treino desconsiderando as fotos &#34;duplicadas&#34; para resolver o problema. Se você subir um pouco e olhar com atenção o print do COLMAP, vai perceber que a posição frontal tem três câmeras no mesmo lugar, em vez de uma só.


