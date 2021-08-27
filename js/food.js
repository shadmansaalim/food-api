//Error messages
const incorrectSearch = document.getElementById('incorrect-search');
const noFoods = document.getElementById('no-foods');


//Search Function to get the food user wants fetching from API
const searchFood = () => {
    //Taking user input using DOM
    const foodInput = document.getElementById('food-search');
    const userFood = foodInput.value;

    //Clearing the input field
    foodInput.value = '';

    if (userFood == null || userFood == '') {
        //Hiding one error message
        noFoods.style.display = 'none';
        incorrectSearch.style.display = 'block';
    }
    else {
        //Generating the api url dynamically according to user search
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${userFood}`;
        //Fetching the API and parsing it
        fetch(url)
            .then(res => res.json())
            .then(data => displayFoods(data.meals));
    }
}

//Food Container to store search results

const foodContainer = document.getElementById('food-container');

//Read More container to store foods that user wants to read more only

const readMoreContainer = document.getElementById('read-more');




// Function to display the foods that user searched for
const displayFoods = foods => {
    //Hiding error message
    incorrectSearch.style.display = 'none';
    //Clearing the read more container
    readMoreContainer.textContent = '';
    //Clearing the previous search result
    foodContainer.textContent = '';
    if (foods == null || foods.length == 0) {
        noFoods.style.display = 'block';
    }
    else {
        //Hiding error message
        noFoods.style.display = 'none';
        foods.forEach(food => {
            // console.log(food);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
                            <img src=${food.strMealThumb} class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${food.strMeal}</h5>
                                <p class="card-text">${food.strInstructions.slice(0, 250)}...</p>
                            </div>
                            <div class="card-footer">
                                <button onclick="readMore('${food.idMeal}')" class="btn btn-secondary">Read More</button>
                            </div>
            </div>
            `
            foodContainer.appendChild(div);
        })
    }
}

const readMore = foodId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayReadMore(data.meals[0]))


}

const displayReadMore = food => {
    console.log(food);
    //Clearing the other food results
    foodContainer.textContent = '';
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
        <div class="card h-100 w-50 mx-auto">
                        <img src=${food.strMealThumb} class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${food.strMeal}</h5>
                            <p class="card-text">${food.strInstructions}</p>
                        </div>
                        <div class="card-footer">
                        <a href="${food.strYoutube}" target=_blank class="btn btn-primary">Check Recipe Video</a>
                        </div>
        </div>
        `
    readMoreContainer.appendChild(div);
}