export const postquery = `*[_type == "post"]{
    title,
    slug,
    author -> {name},
    mainImage{
        asset->{
            _id,
            url
        },
        alt
    }
}`;

export const getPromotionalBanner = `*[_type == "Label"]{
    message,
    link,
    type
    }
    `;

export const getHeroSection = `*[_type == "page"]{
    title,
    subtitle,
    cta,
    mainImage{
        asset->{
            _id,
            url
        },
        alt
    }
}`;
