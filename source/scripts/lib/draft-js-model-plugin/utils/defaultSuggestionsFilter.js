// Get the first 5 suggestions that match
const defaultSuggestionsFilter = (searchValue, suggestions) => {
  const value = searchValue.toLowerCase();
  const filteredSuggestions = suggestions.filter((suggestion) => (
    !value || suggestion.get('name').toLowerCase().indexOf(value) > -1
  ));
  const size = Math.min(filteredSuggestions.size, 5);
  return filteredSuggestions.setSize(size);
};

export default defaultSuggestionsFilter;
