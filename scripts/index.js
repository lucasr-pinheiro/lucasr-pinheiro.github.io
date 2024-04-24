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
document.addEventListener('DOMContentLoaded', function () {
  // Selecionar o link do menu de Projetos
  var projectsLink = document.getElementById('projects-link');

  // Verificar se a URL atual inclui qualquer projeto específico
  if (window.location.pathname.includes('projeto')) {
    projectsLink.classList.add('active-link'); // Adiciona a classe 'active-link' ao link de Projetos
  }

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
    link.addEventListener('click', function () {
      const sectionId = this.getAttribute('href').split('#')[1];
      const section = document.getElementById(sectionId);
      if (section) {
        addActiveClass(section);
      }
    });
  });
});


document.addEventListener('DOMContentLoaded', function () {
  var jobTitles = ['Engenheiro de Controle e Automação', 'Desenvolvedor Fullstack', 'Técnico de Informatica'];
  var currentIndex = -1;
  var jobTitleElement = document.getElementById('job-title');

  function typeNextJobTitle() {
    currentIndex = (currentIndex + 1) % jobTitles.length;
    var title = jobTitles[currentIndex];
    var i = 0;
    jobTitleElement.textContent = '';
    jobTitleElement.style.width = '0';

    var typingInterval = setInterval(function () {
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
    var deletingInterval = setInterval(function () {
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
document.addEventListener('DOMContentLoaded', function () {
  // Seleciona o link pelo ID
  var moreInfoLink = document.getElementById('leiaMaisProjeto');

  // Adiciona evento de clique ao link
  if (moreInfoLink) {
    moreInfoLink.addEventListener('click', function (event) {
      event.preventDefault(); // Previne o comportamento padrão do link

      // Redireciona para a página do projeto
      window.location.href = moreInfoLink.getAttribute('href');
    });
  }
});


document.addEventListener('DOMContentLoaded', function () {
  const showMoreButton = document.getElementById('show-more');
  const showLessButton = document.getElementById('show-less');
  const skillItems = document.querySelectorAll('.skills__item');

  function showInitialItems() {
    skillItems.forEach((item, index) => {
      if (index < 4) {
        item.classList.remove('hidden'); // Garante que os 4 primeiros itens sejam visíveis
      } else {
        item.classList.add('hidden'); // Esconde todos os itens após os 4 primeiros
      }
    });
    showMoreButton.style.display = 'inline'; // Mostra o botão "Ver Todos"
    showLessButton.style.display = 'none'; // Esconde o botão "Mostrar Menos"
  }

  function showAllItems() {
    skillItems.forEach(item => {
      item.classList.remove('hidden'); // Mostra todos os itens
    });
    showMoreButton.style.display = 'none'; // Esconde o botão "Ver Todos"
    showLessButton.style.display = 'inline'; // Mostra o botão "Mostrar Menos"
  }

  showMoreButton.addEventListener('click', showAllItems);
  showLessButton.addEventListener('click', showInitialItems);

  // Definindo a visibilidade inicial baseada no botão de rádio atualmente selecionado
  if (document.getElementById('view-skills').checked) {
    showInitialItems(); // Mostra apenas os 4 primeiros itens ao carregar
  } else {
    // Se a aba de certificados estiver selecionada, esconde todos os itens de habilidades
    skillItems.forEach(item => {
      item.classList.add('hidden');
    });
    showMoreButton.style.display = 'none'; // Esconde o botão "Ver Todos"
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const viewSkills = document.getElementById('view-skills');
  const viewCertificates = document.getElementById('view-certificates');
  const skillsList = document.getElementById('skills-list');
  const certificatesList = document.getElementById('certificates-list');
  const skillItems = skillsList.querySelectorAll('.skills__item');
  const certificateItems = certificatesList.querySelectorAll('.certificates__item');
  const showMoreButton = document.getElementById('show-more');
  const showLessButton = document.getElementById('show-less');

  function toggleVisibility(items, show, maxVisibleItems = Infinity) {
    items.forEach((item, index) => {
      if (index < maxVisibleItems) {
        if (show) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      } else {
        item.classList.add('hidden'); // Esconde os itens além do limite máximo definido
      }
    });
  }

  viewSkills.addEventListener('change', function () {
    if (this.checked) {
      toggleVisibility(skillItems, true, 4); // Exibe apenas as 4 primeiras habilidades
      toggleVisibility(certificateItems, false);
      showMoreButton.style.display = 'inline';
      showLessButton.style.display = 'none';
    }
  });

  viewCertificates.addEventListener('change', function () {
    if (this.checked) {
      toggleVisibility(skillItems, false);
      toggleVisibility(certificateItems, true);
      showMoreButton.style.display = 'none';
      showLessButton.style.display = 'none';
    }
  });

  // Inicialização baseada no estado inicial dos botões de rádio
  if (viewSkills.checked) {
    toggleVisibility(skillItems, true, 4); // Exibe apenas as 4 primeiras habilidades
    toggleVisibility(certificateItems, false);
    showMoreButton.style.display = 'inline';
  } else if (viewCertificates.checked) {
    toggleVisibility(skillItems, false);
    toggleVisibility(certificateItems, true);
    showMoreButton.style.display = 'none';
  }
});



document.addEventListener('DOMContentLoaded', function () {
  const themeToggleButtons = document.querySelectorAll('.theme-toggle');
  const logoImage = document.getElementById('logo-image');

  function updateIcon() {
    const iconsSun = document.querySelectorAll('.fa-sun');
    const iconsMoon = document.querySelectorAll('.fa-moon');
    const theme = localStorage.getItem('theme');

    iconsSun.forEach(iconSun => {
      iconSun.style.display = theme === 'dark' ? 'none' : 'inline';
    });
    iconsMoon.forEach(iconMoon => {
      iconMoon.style.display = theme === 'dark' ? 'inline' : 'none';
    });

    if (theme === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
      logoImage.src = '../assets/icons/lucas-pinheiro-logo.jpg';  // Logo para tema escuro
    } else {
      document.body.removeAttribute('data-theme');
      logoImage.src = '../assets/icons/lucas-pinheiro-logo1.jpg';  // Logo original
    }
  }

  themeToggleButtons.forEach(button => {
    button.addEventListener('click', function () {
      const isDark = document.body.getAttribute('data-theme') === 'dark';
      document.body.setAttribute('data-theme', isDark ? '' : 'dark');
      localStorage.setItem('theme', isDark ? '' : 'dark');  // Salva a escolha do tema no LocalStorage
      updateIcon();  // Atualiza os ícones e o logo baseado no tema
    });
  });

  updateIcon();  // Atualiza os ícones e o logo na inicialização
});
