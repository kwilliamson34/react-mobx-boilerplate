class ExternalSolutionsService {

  filterSolutionCategoryData(solutionArray, currentCategory) {
    const _category = currentCategory.replace(/-/g, ' ');
    let _cards = solutionArray.filter((solution) => solution.page_category.toUpperCase() === _category.toUpperCase());

    _cards.forEach((card) => {
      card.promo_title = card.promo_title;
      card.promo_description = card.promo_description;
    });
    return {
      title: _category,
      cards: _cards
    }
  }

  filterSolutionDetailData(solutionObject) {
    return solutionObject.body;
  }
}

export const externalSolutionsService = new ExternalSolutionsService();
