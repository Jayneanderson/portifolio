/* 1 – Identificar o momento em que o usuário clica no link
2 – Verificar o valor de href do link e encontrar o elemento com este ID na página
3 – Calcular a distância entre o elemento e o topo da página
4 – Animar o scroll até o local do elemento */


//quero pegar as tags a star jogo da velha
const linksInternos = document.querySelectorAll('nav a[href^="#"]');

//verificar se a tag a foi clicada. Ou seja, para cada item cliado dos selecionados
//chame a função
linksInternos.forEach(item => {
    item.addEventListener('click', rolarParaOIdAoClicar)
})

function rolarParaOIdAoClicar(event) {
    //retira o comportamento padrão de um evento, neste caso, do click
    event.preventDefault();
    //pega o elemento que estou clicando
    const item = event.target;
    //especifica que só quero o atributo href dele
    const id = item.getAttribute('href');
    //agora eu já posso dizer qual local eu quero que vá
    const goTo = document.querySelector(id).offsetTop;
    //agora eu quero saber onde está exatamente minha seção (o item) na tela
    //no caso, a função pffsetTop pega a distancia do link para o alvo em pixels
    //note que eu coloquei tudo em uma linha acima, por isso abaixo está comentado

    //console.log(section.offsetTop)

    //isso foi transformado em objeto para usar mais propriedades
    /*window.scroll({
         top: goTo,
        behavior: "smooth", 
    });*/
    smoothScrollTo(0, goTo, 500);
}

//caso queira testar a behavior, tire os comentários

/* Smooth scroll animation
@param {int} endX: destination x coordinate
@param {int} endY: destination y coordinate
@param {int} duration: animation duration in ms */

function smoothScrollTo(endX, endY, duration) {
    const startX = window.scrollX || window.pageXOffset;
    const startY = window.scrollY || window.pageYOffset;
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();

    duration = typeof duration !== 'undefined' ? duration : 400;

    // Easing function
    const easeInOutQuart = (time, from, distance, duration) => {
        if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
        return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
    };

    const timer = setInterval(() => {
        const time = new Date().getTime() - startTime;
        const newX = easeInOutQuart(time, startX, distanceX, duration);
        const newY = easeInOutQuart(time, startY, distanceY, duration);
        if (time >= duration) {
            clearInterval(timer);
        }
        window.scroll(newX, newY);
    }, 1000 / 60); // 60 fps
};

/* Desativando o overflow da página ao clicar no input */

const ativo = document.getElementById('isClick')
ativo.onclick = function() {
    const getBody = document.querySelector('body');

    if(ativo.checked) {
        getBody.style.overflow = 'hidden';
    } else {
        getBody.style.overflow = 'auto';
        getBody.style.transition = '0.5s ease all';
        
    }

}


