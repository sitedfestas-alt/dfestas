/* Botão ver mais/ver menos */
const botaoVerMaisEl = document.getElementById('ver-mais');
const galeria = document.getElementById('galeria')
const inputPesquisa = document.getElementById('busca-input');
const itensGaleria = document.querySelectorAll('.item-galeria');
const fotos = galeria.children;

for(let i = 9; i < fotos.length; i++) 
  fotos[i].classList.toggle("hidden");

let aberto = false;
 
botaoVerMaisEl.addEventListener( 'click', () => {
  aberto = !aberto
  for(let i = 9; i < fotos.length; i++) 
    fotos[i].classList.toggle("hidden");
  botaoVerMaisEl.textContent = aberto ? 'Ver menos' : 'Ver mais';
});

let buscaAtivada = false
inputPesquisa.addEventListener('input', buscar);

function buscar() {
  const termoBusca = inputPesquisa.value.toLowerCase();

  itensGaleria.forEach(item => {
    const labelText = item.querySelector('label').textContent.toLowerCase();

    if (labelText.includes(termoBusca)) {
        item.classList.remove('hidden');
    } else {
        item.classList.add('hidden');
    }
  });
}
