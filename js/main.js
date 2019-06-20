let renderLogo = () => {
    let logoCont = $('.logo-cont');
    logoCont.empty();
    logoCont.html(`
    <a href="/">
        <div class="logo"></div>
        <div class="logo-text">
            <span>puffysticks</span>
            <div class="logo-dot"></div>
        </div>
    </a>
    `);
}

$(document).ready(function() {
    
    renderLogo();

});