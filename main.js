/* abre e fecha o menu quando clicar no ícone: hamburguer e X */
const nav = document.querySelector('#header nav') //pega em específico o (#header nav) do documento
const toggle = document.querySelectorAll('nav .toggle') //pega todos os toggles do nav no documento

for (const element of toggle) {
  //para cada elemento toggle cria uma constante que faz...
  element.addEventListener('click', function () {
    nav.classList.toggle('show') //pega o nav, na lista de classes dele se tiver o show, tira, se nao tiver, coloca. Função executada quando clicar no elemento
  })
}

/* quando clicar em um item do menu, esconder o menu */
const links = document.querySelectorAll('nav ul li a')

for (const link of links) {
  // para cada link de links, adiciona um evento de click
  link.addEventListener('click', function () {
    nav.classList.remove('show') // elemento nav da classe show será removido da página após o click
  })
}

// mudar o header da página quando der scroll
const header = document.querySelector('#header')
const navHeight = header.offsetHeight // deslocamento da altura do nav

function changeHeaderWhenScroll() {
  // se o scroll passou (>=) a altura do header
  if (window.scrollY >= navHeight) {
    //scroll do eixo vertical é maior que a altura do header
    header.classList.add('scroll')
  } else {
    //menor que a altura do header
    header.classList.remove('scroll')
  }
}

/* Testimonials carousel slider swiper */
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  pagination: {
    el: '.swiper-pagination'
  },
  mousewheel: true,
  keyboard: true,
  breakpoints: {
    // quando a janela for do menor ou igual pro maior
    767: {
      slidesPerView: 2, //faz que apareça 2 dos 3 comentarios na página
      setWrapperSize: true
    }
  }
})

/* ScrollReveal: Mostrar elementos quando der scroll na página (rolar a página) */
const scrollReveal = ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 700,
  reset: true
})

scrollReveal.reveal(
  `
  #home .image, #home.text,
  #about .image, #about .text,
  #services header, #services .card,
  #testimonials header, #testimonials .testimonials
  #contact .text, #contact .links,
  footer .brand, footer .social
  `,
  { interval: 100 }
)

/* Botão voltar para o topo */
const backToTopButton = document.querySelector('.back-to-top')

function backToTop() {
  if (window.scrollY >= 560) {
    backToTopButton.classList.add('show')
  } else {
    backToTopButton.classList.remove('show')
  }
}

/* Meu ativo conforme a seção visível na página */
const sections = document.querySelectorAll('main section[id]') // pega dentro do main toda 'section' que contenha um 'id'
function activateMenuAtCurrentSection() {
  const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4 // além de pegar na página o deslocamento do eixo Y da janela, pega todo o tamanho da janela e divida em 8 pedaços. Desse 8 pegue 4 e soma ao deslocamento do eixo Y
  for (const section of sections) {
    const sectionTop = section.offsetTop // offset (deslocamento)
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute('id')

    const checkpointStart = checkpoint >= sectionTop
    const checkpointEnd = checkpoint <= sectionTop + sectionHeight

    if (checkpointStart && checkpointEnd) {
      // && = entre/no meio
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.add('active')
    } else {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.remove('active')
    }
  }
}

/* When Scroll */
window.addEventListener('scroll', function () {
  changeHeaderWhenScroll()
  backToTop()
  activateMenuAtCurrentSection()
})
