import os

# Caminho da pasta onde estão as imagens (pode ser relativo ou absoluto)
pasta_imagens = 'imagens/mobiliario de estar' 
# Caminho que vai no src da tag img (como o navegador vê)
caminho_web = '../imagens/mobiliario de estar/'

# Extensões aceitas
extensoes = ('.png', '.jpg', '.jpeg', '.webp')

html_saida = '<div id="galeria">\n'

# Loop pelos arquivos da pasta
for arquivo in os.listdir(pasta_imagens):
    if arquivo.lower().endswith(extensoes):
        html_saida += f'''    <div class="item-galeria">
        <img src="{caminho_web}{arquivo}" alt="{arquivo}">
        <label></label>
    </div>\n'''

html_saida += '</div>'

print(html_saida)
# Ou salvar em um arquivo:
# with open("codigo_galeria.html", "w") as f:
#    f.write(html_saida)