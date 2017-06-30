const htmlRegex = /<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[\^'">\s]+))?)+\s*|\s*)\/?>/g;

class ExternalSolutionsService {

  filterSolutionCategoryData(solutionArray, currentCategory) {
    const _category = currentCategory.replace(/-/g, ' ');
    let _cards = solutionArray.filter((solution) => solution.page_category.toUpperCase() === _category.toUpperCase());

    _cards.forEach((card) => {
      card.title = card.title.replace(/&amp;/g, '&');
      card.promo_title = card.promo_title.replace(/&amp;/g, '&');
      card.promo_description = card.promo_description.replace(htmlRegex, '');
    });
    return {
      title: _category,
      cards: _cards
    }
  }

  filterSolutionDetailData(solutionObject) {
    return {
      title: solutionObject.title.replace(/&amp;/g, '&'),
      body: solutionObject.body
    }
  }
}

export const externalSolutionsService = new ExternalSolutionsService();
