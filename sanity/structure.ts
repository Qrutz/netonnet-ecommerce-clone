export const structure = (S, context) =>
  S.list()
    .title('Content')
    .items([
      // ...
      S.listItem()
        .title('Categories')
        .child(
          S.documentTypeList('category')
            .title('Categories')
            .child((categoryName) =>
              S.document()
                .schemaType('category')
                .views([
                  // ...
                  S.view.component({
                    component: S.list(),
                    options: {
                      title: 'Products',
                      filter: `_type == "product" && references(*[_type == "subCategory" && references(*[_type == "category" && title == $categoryName]._id)] ._id)`,
                      params: { categoryName },
                    },
                  }),
                ])
                .documentId(categoryName)
            )
            .child((categoryName) =>
              S.documentTypeList('category')
                .title('Subcategories')
                .filter(`_type == "category" && title == $categoryName`)
                .params({ categoryName })
                .child((categoryItem) =>
                  S.documentTypeList('subCategory')
                    .title('Subcategories')
                    // find all subcategories that are referenced by the current category
                    .filter(
                      `_type == "subCategory" && references(*[_type == "category" && title == $categoryItem]._id)`
                    )
                    .params({ categoryItem })
                    .child((subCategoryItem) =>
                      S.documentTypeList('product')
                        .title('Products')
                        // find all products that are referenced by the current subcategory
                        .filter(
                          `_type == "product" && references(*[_type == "subCategory" && title == $subCategoryItem]._id)`
                        )
                        .params({ subCategoryItem })
                    )
                )
            )
        ),
      // ...
    ]);
