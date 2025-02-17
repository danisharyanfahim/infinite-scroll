export default {
  name: 'movie',
  type: 'document',
  title: 'Movie',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Movie Title',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Link',
      options: {
        source: 'title',
      },
    },
    {
      name: 'categories',
      type: 'array',
      title: 'Categories',
      of: [
        {
          type: 'string',
        },
      ],
    },
    {
      name: 'posterImage',
      type: 'image',
      title: 'Poster Image',
    },
    {
      name: 'overview',
      type: 'string',
      title: 'Overview',
    },
    {
      name: 'releaseYear',
      type: 'number',
      title: 'Release Year',
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Rating',
    },
    {
      name: 'length',
      type: 'number',
      title: 'Length in Minutes',
    },
    {
      name: 'lang',
      type: 'string',
      title: 'language',
    },
    {
      name: 'link',
      type: 'string',
      title: 'link',
    },
  ],
}
