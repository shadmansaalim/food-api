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
        noFoods.classList.add('d-none');
        incorrectSearch.classList.remove('d-none');
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

// Function to display the foods that user searched for
const displayFoods = foods => {
    //Hiding error message
    incorrectSearch.classList.add('d-none');
    //Clearing the read more container
    // readMoreContainer.textContent = '';
    //Clearing the previous search result
    foodContainer.textContent = '';
    if (foods == null || foods.length == 0) {
        noFoods.classList.remove('d-none');
    }
    else {
        //Moving Search Bar at Top
        const searchBox = document.getElementById('search-box')
        searchBox.classList.remove('search-center');
        searchBox.style.marginTop = '120px';
        //Hiding error message
        noFoods.classList.add('d-none');
        foods.forEach(food => {
            // console.log(food);
            const div = document.createElement('div');
            div.classList.add('col-11', 'col-md-6', 'col-xl-3', 'col-lg-4', 'mx-auto', 'mx-md-0');
            div.innerHTML = `
            <div class="card h-100">
                            <img src=${food.strMealThumb} class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${food.strMeal}</h5>
                                <p class="card-text">${food.strInstructions.slice(0, 250)}...</p>
                            </div>
                            <div class="card-footer">
                                <button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="readMore('${food.idMeal}')" class="btn btn-secondary">Read More</button>
                            </div>
            </div>
            `
            foodContainer.appendChild(div);
        })
    }
}

//Read More Function
const readMore = foodId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayReadMore(data.meals[0]))


}

const displayReadMore = food => {
    console.log(food);
    const modalTitle = document.getElementById('exampleModalLabel');
    const modalBody = document.getElementById('modal-body');
    const modalFooter = document.getElementById('modal-footer');

    modalTitle.innerText = food.strMeal;
    modalBody.innerHTML = `<img width="250px" src = ${food.strMealThumb} alt>
    <p>${food.strInstructions}</p>
    `;
    modalFooter.innerHTML = `
    <a href="${food.strYoutube}" target="_blank" class="btn btn-primary">Recipe Video</a>
    `;
}