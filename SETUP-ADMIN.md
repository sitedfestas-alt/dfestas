# Configuração do painel /admin (Decap CMS)

## O que já foi feito neste projeto
- `admin/index.html` e `admin/config.yml` — interface e configuração do Decap CMS.
- `content/galerias/*.yml` — um arquivo por categoria, já populado com as fotos que
  existem hoje em cada pasta `imagens/<categoria>`.
- `index.html` — adicionado o widget do Netlify Identity (necessário para o link de
  convite por e-mail funcionar e redirecionar para `/admin`).

Como as páginas do catálogo já buscam a lista de arquivos direto da API do GitHub
(`api.github.com/repos/sitedfestas-alt/dfestas/contents/imagens/...`) em tempo real,
**nenhuma outra página do site precisou ser alterada** — qualquer foto que o CMS
subir para essas pastas aparece no site automaticamente, sem rebuild.

## Passos a fazer no painel do Netlify (feito)
1. **Site settings → Identity → Enable Identity.**
2. Em Identity → **Registration preferences**, deixe como "Invite only" (para
   ninguém além do administrador criar conta sozinho).
3. Em Identity → **Services → Git Gateway → Enable Git Gateway** (conecta o
   Identity ao repositório GitHub automaticamente, sem precisar criar OAuth App).
4. Em Identity → **Invite users**, convide o e-mail do administrador. Ele vai
   receber um link que abre `seusite.com/#invite_token=...`, define uma senha, e
   é redirecionado para `/admin`.
5. Publicar o deploy normalmente (nada mais a configurar no build).

## Como o administrador vai usar
- Acessa `seusite.com/admin`, faz login.
- Escolhe a galeria (ex.: "Mesas e Cadeiras").
- Adiciona uma foto → sobe o arquivo → Decap salva no Git → Netlify faz deploy →
  o arquivo já existe na pasta e a página do catálogo já mostra (via fetch em
  tempo real, nem precisa esperar o deploy terminar para a imagem existir no
  repo, embora o restante do site só atualize após o build).

## Ressalvas importantes
1. **Remover uma foto da lista no CMS não apaga o arquivo do repositório.**
   O widget de lista (`imagens`) só edita esse arquivo `.yml` de metadados — que
   o site, hoje, nem chega a ler. Para a foto realmente sumir da página (que lê a
   pasta direto), o administrador precisa apagar o arquivo pela **Media Library**
   do próprio Decap CMS (ícone de mídia no menu superior → entrar na pasta da
   categoria → excluir o arquivo), não só removê-lo da lista dentro da entrada.
   Vale a pena testar esse fluxo com o cliente antes de liberar.
2. **Limite de taxa da API do GitHub.** O fetch em tempo real é feito sem
   autenticação (60 requisições/hora por IP). Em uso normal isso não costuma ser
   problema, mas se o catálogo tiver picos de tráfego vale considerar migrar
   esse fetch para ler os `.yml` gerados pelo build (abordagem original do
   planejamento) ou usar o Netlify Image CDN.
3. **Ordenação manual** não se reflete no site hoje, porque a página lê a ordem
   que a API do GitHub devolve (alfabética), não a ordem da lista no CMS. Dá para
   resolver depois trocando o fetch das páginas para ler os `.yml` de
   `content/galerias/` em vez da API do GitHub — aí a ordem do CMS passa a valer.
