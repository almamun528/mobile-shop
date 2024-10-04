const displayAllPhone = async(search)=>{
    document.getElementById("spinner").style.display="none" 
   
   const response = await fetch  (`https://openapi.programming-hero.com/api/phones?search=${search?search:"iphone"}`)
   document.getElementById('phone-container').innerHTML = ""
   const rawData = await response.json()
   showAllPhone(rawData.data)

}

const loadAllPhoneByClick = () =>{
    document.getElementById("spinner").style.display="block"
    
    setTimeout(function(){
    displayAllPhone() //3 seconds after load all data
    },3000)
}

const showAllPhone = (phones) =>{
    const phoneContainer = document.getElementById("phone-container")
    phones.forEach(phone => { 
        const div = document.createElement("div")
        div.innerHTML = `            
        <div class="card bg-base-100 bg-slate-100 py-5 shadow-xl">
                <figure>
                  <img
                    src=${phone.image}
                    alt="Shoes" />
                </figure>
                <div class="card-body text-center">
                  <h2 class="text-xl font-semibold">${phone.brand}</h2>
                  <p>${phone.phone_name}</p>

                  <div>
                  <button class="btn btn-primary" onclick="detailsOfPhones('${phone.slug}')">Details</button> 
                  
                  <p class = "mt-5"> Tag :${phone.slug} </P>
                  </div>

                </div>

              </div>`
              phoneContainer.append(div)
              
    });
}
//?function for get search value 
const clickSearchBtn = () =>{
    const searchValue = document.getElementById("search-field").value 
    displayAllPhone(searchValue)
}

const detailsOfPhones = async (slug) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`);
  const data = await response.json();
  const {name, brand, releaseDate, mainFeatures } = data.data;
  const popUpContainer = document.getElementById("pop-up");
  
  // Clear any previous modal content
  popUpContainer.innerHTML = '';

  const div = document.createElement("div");
  div.innerHTML = `
    <dialog id="my_modal_1" class="modal font-bold">
      <div class="modal-box bg-slate-100 shadow-lg">
        <h3 class="text-lg font-bold">Release Date: ${releaseDate || 'No release date found'}</h3>
        <h3 class="text-lg font-bold">Brand: ${brand}</h3>
        <br>
        <h3 class="font-bold text-pink-600 text-xl">Model: ${name}</h3>
        <p class="py-4">Storage: ${mainFeatures.storage}</p>
        <p class="py-4">Display Size: ${mainFeatures.displaySize}</p>
        <p class="py-4">Chipset: ${mainFeatures.chipSet}</p>
        <p class="py-4">Memory: ${mainFeatures.memory}</p>
        <div class="modal-action">
          <button class="btn btn-primary" onclick="closeModal()">Close</button>
        </div>
      </div>
    </dialog>
  `;
  console.log(data.data)
  
  popUpContainer.appendChild(div);
  
  // Show the modal
  document.getElementById('my_modal_1').showModal();
};

// Function to close the modal
const closeModal = () => {
  document.getElementById('my_modal_1').close();
}


//function for load all phone
displayAllPhone()

