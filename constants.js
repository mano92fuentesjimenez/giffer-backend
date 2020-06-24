const SEARCH_TYPES = {
  SEARCH: 'search',
  TRENDING: 'trending',
  FAVORITES: 'favorites',
}

const EMPTY_RESPONSE = {
  "data": [],
  "pagination": {
    "total_count": 0,
    "count": 0,
    "offset": 0
  },
  "meta": {
    "status": 200,
    "msg": "OK",
  }
}

module.exports = {
  SEARCH_TYPES,
  EMPTY_RESPONSE
}