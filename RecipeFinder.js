import React, { useState } from 'react';

function RecipeFinder() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=YOUR_API_KEY`);
      const data = await response.json();
      setRecipes(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <h1>Recipe Finder</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Enter ingredient or dish name"
          required
        />
        <button type="submit">Search</button>
      </form>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {recipes.map(recipe => (
            <li key={recipe.id}>
              <img src={recipe.image} alt={recipe.title} />
              <p>{recipe.title}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecipeFinder;
