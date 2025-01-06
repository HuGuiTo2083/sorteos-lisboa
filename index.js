document.addEventListener('DOMContentLoaded', function() {
    const ig = document.getElementById('btInsta')
    const fb = document.getElementById('btFacebook')

    const ms = document.getElementById('btMessage')

    ig.addEventListener('click', () => {
       window.location.href = "https://www.instagram.com"

    })

    fb.addEventListener('click', () => {
   
        window.location.href = "https://www.facebook.com"

    })

    ms.addEventListener('click', () => {
        window.location.href = "https://www.whatsapp.com"

        
    })
});
