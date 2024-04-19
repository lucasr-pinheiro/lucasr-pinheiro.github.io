const navbar = document.querySelector('.navbar');
const mobileNavbar = document.querySelector('.navbar__mobile');
const button = document.querySelector('.burguer');

button.addEventListener('click', function () {
  mobileNavbar.classList.toggle('active');
});

window.addEventListener('scroll', function () {
  if (this.window.pageYOffset > 0) return navbar.classList.add('active');
  return navbar.classList.remove('active');
});
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar__links a, .mobile__links a');
  let lastId; // Guarda o último id para evitar atualizações desnecessárias

  function addActiveClass(section) {
    if (section && section.id !== lastId) { // Verifica se a seção é válida e diferente da última ativa
      lastId = section.id;
      navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === '#' + section.id) {
          link.classList.add('active-link');
        }
      });
      // Atualiza a URL sem recarregar a página
      history.pushState(null, null, '#' + section.id);
    }
  }

  function getCurrentSection() {
    let currentSection = null;
    let minDiff = Number.MAX_VALUE;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - window.scrollY;
      const sectionHeight = section.offsetHeight;

      // Verifica se o usuário está no topo da página
      if (window.scrollY < 100) {
        currentSection = document.querySelector('header') || sections[0];
        return;
      }
      
      // Verifica se o usuário está no final da página
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        currentSection = document.querySelector('footer') || sections[sections.length - 1];
        return;
      }

      if (sectionTop < minDiff && sectionTop > -window.innerHeight / 2) {
        minDiff = sectionTop;
        currentSection = section;
      }
    });

    return currentSection;
  }

  window.addEventListener('scroll', () => {
    const currentSection = getCurrentSection();
    addActiveClass(currentSection);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      const sectionId = this.getAttribute('href').split('#')[1];
      const section = document.getElementById(sectionId);
      if (section) {
        addActiveClass(section);
      }
    });
  });
});


document.addEventListener('DOMContentLoaded', function() {
  var jobTitles = ['Engenheiro de Controle e Automação', 'Desenvolvedor Fullstack', 'Técnico de Informatica'];
  var currentIndex = -1;
  var jobTitleElement = document.getElementById('job-title');

  function typeNextJobTitle() {
    currentIndex = (currentIndex + 1) % jobTitles.length;
    var title = jobTitles[currentIndex];
    var i = 0;
    jobTitleElement.textContent = '';
    jobTitleElement.style.width = '0';

    var typingInterval = setInterval(function() {
      jobTitleElement.textContent += title[i];
      i++;
      if (i >= title.length) {
        clearInterval(typingInterval);
        setTimeout(deleteJobTitle, 1000); // Espera um pouco antes de apagar
      }
    }, 100); // Velocidade de digitação
  }

  function deleteJobTitle() {
    var title = jobTitles[currentIndex];
    var i = title.length;
    var deletingInterval = setInterval(function() {
      jobTitleElement.textContent = jobTitleElement.textContent.slice(0, -1);
      i--;
      if (i <= 0) {
        clearInterval(deletingInterval);
        setTimeout(typeNextJobTitle, 300); // Espera um pouco antes de começar a digitar novamente
      }
    }, 100); // Velocidade de apagar
  }

  setTimeout(typeNextJobTitle, 300); // Começa a digitar após um pequeno atraso
});

// scripts/index.js
document.addEventListener('DOMContentLoaded', function() {
  var moreInfoLinks = document.querySelectorAll('.projects__info a');

  moreInfoLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();

      var projectInfo = event.target.parentNode;
      var projectName = projectInfo.querySelector('.tertiary-title').innerText;

      // Redireciona para a página do projeto selecionado
      if (projectName === 'Sistema de gerenciamento de tarefas DEF') {
        window.location.href = '/projeto1.html';
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const showMoreButton = document.getElementById('show-more');
  const showLessButton = document.getElementById('show-less');
  const allItems = document.querySelectorAll('.skills__item');
  const hiddenItems = document.querySelectorAll('.skills__item.hidden');

  showMoreButton.addEventListener('click', function() {
    hiddenItems.forEach(item => {
      item.classList.remove('hidden'); // Remove a classe 'hidden'
    });
    showMoreButton.style.display = 'none'; // Esconde o botão "Ver Todos"
    showLessButton.style.display = 'inline'; // Mostra o botão "Mostrar Menos"
  });

  showLessButton.addEventListener('click', function() {
    hiddenItems.forEach(item => {
      item.classList.add('hidden'); // Adiciona a classe 'hidden' de volta
    });
    showLessButton.style.display = 'none'; // Esconde o botão "Mostrar Menos"
    showMoreButton.style.display = 'inline'; // Mostra o botão "Ver Todos"
  });
});
