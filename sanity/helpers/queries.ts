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
  categoryName: string
) => `*[_type == "product" && Category->href == "${categoryName}"]{ 
  title,
  CardName,
  bulletPoints[],
  Images[]{
    _key,
      
    
asset->{url}

    },
    
  ArtikelNummer,
  details,
  
}
`;

export const getCategoryByParams = (
  params: string
) => `*[_type == "category" && href == "${params}"][0] {
  title,
  description,
}
`;

export const getProductsBySubCategory = (
  categoryName: string
) => `*[_type == "product" && subcategory->href == "${categoryName}"]{ 
    title,
    CardName,
    bulletPoints[],
    Images[]{
      _key,
        
      
  asset->{url}
  
      },
      
    ArtikelNummer,
    details,

  }
  `;
