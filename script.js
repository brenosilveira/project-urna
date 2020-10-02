let headPag = document.querySelector('.d-1-1 span');
let office = document.querySelector('.d-1-2 span');
let description = document.querySelector('.d-1-4');
let warning = document.querySelector('.d2');
let sideContent = document.querySelector('.d1right');
let num = document.querySelector('.d-1-3');

let currStep = 0;
let numVote = '';
let white = false;
let votes = [];

function initStep() {
    let step = steps[currStep];
    numVote = '';
    white = false;

    let numHtml = '';
    
    for(let i=0;i<step.numeros;i++) {

        if(i === 0) {
            numHtml += '<div class="number flashes"></div>'
        } else{
            numHtml += '<div class="number"></div>';
        }
    }

    headPag.style.display = 'none';
    office.innerHTML = step.titulo;
    description.innerHTML = '';
    warning.style.display = 'none';
    sideContent.innerHTML = '';
    num.innerHTML = numHtml;
}

function updateInterface() {
    let step = steps[currStep];
    let candidate = step.candidatos.filter((item) => {
        if(item.numero === numVote) {
            return true;
        } else {
            return false;
        }
    });
    if(candidate.length > 0) {
        candidate = candidate[0];
        headPag.style.display = 'block';
        warning.style.display = 'block';
        description.innerHTML = `Nome: ${candidate.nome}<br/>Partido: ${candidate.partido}`;
        let photoHtml = '';
        for(let i in candidate.fotos) {
            if(candidate.fotos[i].small) {
                photoHtml += `<div class="d-1-image small"><img src="/img/${candidate.fotos[i].url}" >${candidate.fotos[i].legenda}</div>`
            } else {
                photoHtml += `<div class="d-1-image"><img src="/img/${candidate.fotos[i].url}" >${candidate.fotos[i].legenda}</div>`
            }
        }
        sideContent.innerHTML = photoHtml;
    } else {
        headPag.style.display = 'block';
        warning.style.display = 'block';
        description.innerHTML = `<div class="warning--big flashes">VOTO NULO</div>`;
    }
}

function clicked(n) {
    let elNum = document.querySelector('.number.flashes');
    if(elNum !== null) {
        elNum.innerHTML = n;
        numVote = `${numVote}${n}`;
        
        elNum.classList.remove('flashes');
        if(elNum.nextElementSibling !== null) {
            elNum.nextElementSibling.classList.add('flashes');
        } else {
            updateInterface();
        }
    }
}

function whiteVote() {
    numVote = '';
    white = true;

    headPag.style.display = 'block';
    warning.style.display = 'block';
    num.innerHTML = '';
    description.innerHTML = `<div class="warning--big flashes">VOTO EM BRANCO</div>`;
    sideContent.innerHTML = '';
}

function correct() {
    initStep();
}

function confirmed() {
    let step = steps[currStep];
    let confirmVote = false;

    if(white === true) {
        confirmVote = true;
        votes.push({
            step: steps[currStep].titulo,
            vote: 'Branco'
        })
    } else if(numVote.length === step.numeros) {
        confirmVote = true;
        votes.push({
            step: steps[currStep].titulo,
            vote: numVote
        })
    }

    if(confirmVote === true) {
        currStep++;
        if(steps[currStep] !== undefined) {
            initStep();
        } else {
            document.querySelector('.screen').innerHTML = '<div class="finish">FIM.</div>'
            console.log(votes)
        }
    }
}
initStep();