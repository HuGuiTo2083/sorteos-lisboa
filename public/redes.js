

// Función que copia el texto al portapapeles

const ig = document.getElementById('btRedesIG')
     
const wa = document.getElementById('btRedesWA')
ig.addEventListener('click', () => {
   window.location.href = "https://www.instagram.com/finca_lisboa_ranch?igsh=dXRqbGk3cW9qNnZ6"

})

wa.addEventListener('click', () => {

    window.location.href = "https://wa.me/+584243131639"

}
)



const closeTerms = document.getElementById('btCloseTerms')
    const terms = document.getElementById('terms')
    closeTerms.addEventListener('click', ()=>{
  terms.style.display = 'none'
    })


