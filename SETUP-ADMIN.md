# Configuração do painel /admin (Decap CMS)

## O que já foi feito neste projeto
- `admin/index.html` e `admin/config.yml` — interface e configuração do Decap CMS.
- `content/galerias/*.yml` — um arquivo por categoria, já populado com as fotos que
  existem hoje em cada pasta `imagens/<categoria>`.
- `index.html` — adicionado o widget do Netlify Identity (necessário para o link de
  convite por e-mail funcionar e redirecionar para `/admin`).

As 5 páginas de `catalogo/*.html` foram atualizadas: agora elas leem a ordem e a
lista de fotos direto do `content/galerias/<categoria>.yml` correspondente (via
`raw.githubusercontent.com`, usando a lib `js-yaml` por CDN), em vez de listar a
pasta `imagens/` pela API do GitHub. Isso faz valer a ordem que o administrador
definir no CMS (arraste os itens da lista para reordenar) e faz uma foto
removida da lista no CMS sumir de fato da página.

## Passos a fazer no painel do Netlify (uma vez só)
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
1. **Cache de alguns minutos.** `raw.githubusercontent.com` é servido por CDN e
   guarda cache por ~5 minutos. Depois de editar no CMS, pode levar um pouco até
   a página realmente atualizar — não é instantâneo como antes.
2. **O `.yml` precisa ficar sincronizado com a pasta de imagens.** Se alguém
   apagar um arquivo de imagem direto no GitHub sem tirá-lo da lista no CMS (ou
   vice-versa), a página vai tentar exibir uma foto que não existe mais (link
   quebrado) ou vai deixar de mostrar uma foto que ainda está lá. Na prática,
   isso significa: **toda alteração de fotos deve ser feita pelo painel /admin**,
   não direto pelo GitHub.
3. **Remover uma foto da lista no CMS não apaga o arquivo físico do
   repositório** — ele fica órfão na pasta `imagens/`, só não aparece mais no
   site. Isso é inofensivo (não pesa no carregamento da página), mas se quiser
   liberar espaço de tempos em tempos, apague pela **Media Library** do Decap
   CMS (ícone de mídia no menu superior → pasta da categoria → excluir).
