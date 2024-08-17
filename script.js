const API_KEY = "ff3bdbdf85724cd089bc81cdc4fa1793";
const recipeListEl = document.getElementById('recipe-list')

function displayRecipes(recipes){
    recipeListEl.innerHTML = "";
    recipes.forEach((recipe)=>{
        const recipeItemEl = document.createElement("li");
        recipeItemEl.classList.add("recipe-item");

        recipeImageEl = document.createElement("img")
        recipeImageEl.src = recipe.image
        recipeImageEl.alt = "recipe image"

        recipeItemEl.appendChild(recipeImageEl);

        recipeTitleEl = document.createElement("h2");
        recipeTitleEl.innerText = recipe.title;

        recipeItemEl.appendChild(recipeTitleEl);

        recipeIngredientEl = document.createElement("p");
        recipeIngredientEl.innerHTML = `
            <strong>Ingredients:</strong> ${recipe.extendedIngredients.map((ingredient) => ingredient.original)
                .join(", ")}
        `

        recipeItemEl.appendChild(recipeIngredientEl);

        recipeSourceEl = document.createElement("a");
        recipeSourceEl.href = recipe.sourceUrl;
        recipeSourceEl.innerText = "View Recipe";

        recipeItemEl.appendChild(recipeSourceEl);

        recipeListEl.appendChild(recipeItemEl);
    })
}


async function getRecipes(){
    const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`)
    const data = await response.json(); 
    
    return data.recipes; 
}


async function init(){
    const recipes = await getRecipes(); 
    console.log(recipes); 
    displayRecipes(recipes);
}

init();