   document.addEventListener('DOMContentLoaded', () => {
  //cardarray
  const cardArray = [{
    name:'idiom1',
    img: './assets/beataroundthebush.png'
},
{
    name:'idiom2',
    img: './assets/undertheweather.png'
},
{
    name:'idiom3',
    img: './assets/hanginthere.png'
},
{
    name:'idiom1',
    img: './assets/owijacwbawelne.png'
},
{
    name:'idiom2',
    img: './assets/czucsieniewsosie.png'
},
{
    name:'idiom3',
    img:'./assets/trzymajsie.png'
}
]

  cardArray.sort(() => 0.5 - Math.random())

  const canvas = document.querySelector('.card-container')
  const resultSeen = document.querySelector('.result')
  let cardsPicked = []
  let cardsChosenId = []
  let cardsCorrect = []

  //generuje plansze z kartami
  const createGame =()=> {
    for (let i = 0; i < cardArray.length; i++) {
        const cardMain = document.createElement('div');
        cardMain.classList.add("card")
        const card = document.createElement('img')
        card.setAttribute('src', 'assets/foxlogo.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', showIdiom)
        canvas.appendChild(cardMain)
        cardMain.appendChild(card)
    }
  }

  //sprawdza, czy sie zgadzaja wyniki
  const matchChecker=()=> {
    const cards = document.querySelectorAll('img')
    const firstoption = cardsChosenId[0]
    const secondoption = cardsChosenId[1]
    
    if(firstoption == secondoption) {
      cards[firstoption].setAttribute('src', 'assets/foxlogo.png')
      cards[secondoption].setAttribute('src', 'assets/foxlogo.png')
      alert('To ten sam idiom!')
    }
    else if (cardsPicked[0] === cardsPicked[1]) {
      alert('Brawo')
      cards[firstoption].setAttribute('src', 'assets/heart.png')
      cards[secondoption].setAttribute('src', 'assets/heart.png')
      cards[firstoption].removeEventListener('click', showIdiom)
      cards[secondoption].removeEventListener('click', showIdiom)
      cardsCorrect.push(cardsPicked)
    } else {
        alert('P')
      cards[firstoption].setAttribute('src', 'assets/foxlogo.png')
      cards[secondoption].setAttribute('src', 'assets/foxlogo.png')
      alert('Probuj dalej')
    }
    cardsPicked = []
    cardsChosenId = []
    resultSeen.textContent = cardsCorrect.length
    if  (cardsCorrect.length === cardArray.length/2) {
      resultSeen.textContent = 'Brawo'
    }
  }

  //odwroc na idiom
  function showIdiom() {
    let cardId = this.getAttribute('data-id')
    cardsPicked.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsPicked.length ===2) {
      setTimeout(matchChecker, 500)
    }
  }

  createGame()
})

//mutation observer
const textSummary = document.querySelector(".text");
const buttonSummary = document.getElementById('btnMutated');
const summaryListElement = document.querySelector('#expressions');

// observer rules
let observerRules ={
    childList: true,
    attributes:true,
    subtree: true
};

let observer = new MutationObserver((mutationCallback)=>{
    //tu stworzylam mutation obserwera. Kod ruszy od nowa, za kadym razem kiedy dodam nowego diva z tekstem
    const getMutationRule = (mutation)=>{
    let stylesheet = document.styleSheets[1].cssRules;
    //pobiera 2 css
    for(ruleNumber in stylesheet){
        if(stylesheet[ruleNumber].selectorText === mutation){
        let rule = stylesheet[ruleNumber].style;
        if(rule.getPropertyValue("background-color") === "red"){
            rule.setPropertyValue("background-color", "white");
        } else {
            rule.setProperty("background-color", "red");
        }
        }
        }
    }
    getMutationRule("#btnMutated");
});
observer.observe(summaryListElement, observerRules);
buttonSummary.addEventListener('click', ()=>{
    let newParagraph = document.createElement('p')
    newParagraph.textContent = textSummary.value ? textSummary.value : "ni ma nic";
    summaryListElement.appendChild(newParagraph);
    textSummary.value="";

});