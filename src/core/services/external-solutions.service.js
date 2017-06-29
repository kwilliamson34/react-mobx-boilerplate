import cheerio from 'cheerio';

const htmlRegex = /<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[\^'">\s]+))?)+\s*|\s*)\/?>/g;

class ExternalSolutionsService {

  filterSolutionCategoryData(solutionArray, currentCategory) {

    console.log('currentCategory   ', currentCategory);
    const _category = currentCategory.replace(/-/g, ' ');
    let _cards = solutionArray.filter((solution) => solution.page_category.toUpperCase() === _category.toUpperCase());

    _cards.forEach((card) => {
      card.title = card.title.replace(/&amp;/g, '&');
      card.promo_title = card.promo_title.replace(/&amp;/g, '&');
      card.promo_description = card.promo_description.replace(htmlRegex, '');
    });

    console.log('_cards    ', _cards);

    return {
      title: _category,
      cards: _cards
    }
  }
}

export const externalSolutionsService = new ExternalSolutionsService();
