let renderContact = () => {
    let contactCont = $(".homepage-contact-cont");
    contactCont.empty();

    let socialLinks = [
        {
            name : 'facebook',
            url : 'https://www.facebook.com/puffysticks'
        },
        {
            name : 'twitter',
            url : 'https://twitter.com/puffysticks'
        },
        {
            name : 'instagram',
            url : 'https://www.instagram.com/puffystickscom/'
        }
    ];

    let socialLinksComp = [];

    socialLinks.map( (socialLink) => {
        socialLinksComp.push(`
        <a class="contact-social-link" href="${socialLink.url}" target="_blank">
            <span class="social-link-dot ${socialLink.name}"></span>
            <span class="social-link-name">${socialLink.name}</span>
        </a>
        `);
    });

    contactCont.html(`
    <div class="contact-message">
        <span class="contact-message-emoji">🤙</span>
        <span class="contact-message-text">get in touch with us on</span>
    </div>
    <div class="contact-social-links noSelect">${socialLinksComp.join('')}</div>
    `);
}

let expandArticle = (article) => {
    $(".expanded-article-cont").remove();
    let forSaleComp = ``;
    if(article.type.indexOf('sale') !== -1) {
        forSaleComp = `
        <div class="expanded-article-sale">
            this is for sale! if you are interested, get in touch on 
            <a href="https://www.facebook.com/puffysticks" target="_blank">facebook</a>, 
            <a href="https://twitter.com/puffysticks" target="_blank">twitter</a> or 
            <a href="https://www.instagram.com/puffystickscom/" target="_blank">instagram</a>!
        </div>
        `;
    }
    $('body').addClass("fixed").append(`
        <div class="expanded-article-cont">
            <div class="main-wrap">
                <div class="expanded-article-title">
                    ${article.name}
                </div>
                ${forSaleComp}
                <a href="./res/articles/pics/${article.pic}" target="_blank">
                    <img src="./res/articles/pics/${article.pic}" />
                </a>
            </div>
        </div>
    `);
}

let renderPortfolio = (type = '') => {
    let portfolioCont = $(".homepage-portfolio-cont");
    portfolioCont.empty();
    let articles = [];
    if(type === '') articles = DB;
    else {
        // articles = DB.filter((article) => article.type === type);
        articles = DB.filter((article) => article.type.indexOf(type) !== -1);
    }

    let portfolioTypes = [
        {
            key : '',
            name : 'all'
        },
        {
            key : 'logo',
            name : 'logos'
        },
        {
            key : 'webdesign',
            name : 'webdesign'
        },
        {
            key : 'ipbskin',
            name : 'ipb themes'
        },
        {
            key : 'illustration/drawing',
            name : 'illustrations & drawings'
        },
        {
            key : 'sale',
            name : 'for sale'
        }
    ];

    portfolioTypesComps = [];
    portfolioTypes.map( (portfolioType) => {
        let active = '';
        if(portfolioType.key === type) active = ' active';
        if(portfolioType.key === 'sale') active += ' forSale';
        portfolioTypesComps.push(`
        <div class="portfolio-type${active}" do="selectType" type="${portfolioType.key}">${portfolioType.name}</div>
        `);
    });

    portfolioArticles = $('<div />', {
        class : 'portfolio-articles'
    });

    articles.map( (article, i) => {
        let articleCssClass = 'portfolio-article';
        if(article.type.indexOf('sale') !== -1) articleCssClass += ' forSale';
        $('<div />', {
            class : articleCssClass,
            style : `background-image : url(./res/articles/thumbs/${article.thumb})`,
            click : () => {expandArticle(article)}
        }).appendTo(portfolioArticles);
    });

    portfolioCont.html(`
    <div class="portfolio-types">${portfolioTypesComps.join('')}</div>
    `);
    portfolioCont.append(portfolioArticles);
}

$(document).ready(function(){

    renderContact();
    renderPortfolio();

    $(document).on('click', '[do="selectType"]', function () {
        let type = $(this).attr("type");
        renderPortfolio(type);
    });

    $(document).on("click", '.expanded-article-cont', function (e) {
        if($(".expanded-article-cont").length && !$(e.target).closest('.expanded-article-cont .main-wrap').length) {
            $('body').removeClass('fixed');
            $('.expanded-article-cont').remove();
        }
    });

});