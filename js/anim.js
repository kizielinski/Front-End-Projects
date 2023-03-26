const anims = document.getElementsByClassName("link")

Array.from(anims).forEach(function (element) {
    console.log(element.offsetWidth)
    var animSize = element.offsetWidth.toString(10) + "px"
    element.childNodes[1].style.setProperty('--animSize', animSize)
});

const soloAnims = document.getElementsByClassName("soloLink")

Array.from(soloAnims).forEach(function (element) {
    console.log(element.offsetWidth)
    var animSize = element.offsetWidth.toString(10) + "px"
    console.log(animSize)
    element.style.setProperty('--animSize', animSize)
});
