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

export const getHeroSection = `*[_type == 'page' && title == 'Homepage'][0] {
    title,
    heroSection {
    
  
      
      carousel[] {
        // Define the fields you want to include for each image in the carousel
        // For example:
        _key,
        asset->{
          // Include the asset fields you need (e.g., url, metadata, etc.)
          url,
  
        }

        },
        Boxes[] {
            
            _key,
            asset->{
                url,

      }
    }
    }
  }

  `;

// create a function that gets data by category input
export const getProductsByCategory = (
  categoryId: string
) => `*[_type == "product" && Category._ref == "95df6a05-9cf9-4e72-a210-c8f54151ee92" ] {
  title,
  Images[]{
    _key,
      
    
asset->{url}
    
    
    
    
    
    
    
    },
    
  ArtikelNummer,
  details,
  
}
`;
