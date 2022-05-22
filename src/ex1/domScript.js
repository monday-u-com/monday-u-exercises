let articles = [...document.querySelectorAll('article > div > div > h3 > a')]
document.body.innerHTML = ""
for (let i = 0; i < articles.length; i++) {
    let aElement = document.createElement('a')
    aElement.href = articles[i].href
    let text = document.createTextNode(articles[i].innerText)
    aElement.appendChild(text)
    aElement.style.display = "block"
    aElement.style.width = "50%"
    aElement.style.marginLeft = "20px"
    aElement.style.fontWeight = "bold"
    aElement.style.color = "rgba(0,0,0,0.5)"
    if(window.localStorage.getItem(articles[i].innerText)){
        aElement.style.color = "blue"
    }else{
        window.localStorage.setItem(articles[i].innerText, articles[i].innerText)
    }
    console.log(aElement.style)
    document.body.appendChild(aElement)
}