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
        console.log(phone)//! get array of phones 
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
                  <button class="btn btn-primary">Buy Now</button> 
                  <p class = "mt-5"> Tag :${phone.slug} </P>
                  </div>

                </div>

              </div>`
              phoneContainer.append(div)
    });
}

const clickSearchBtn = () =>{
    const searchValue = document.getElementById("search-field").value 
    

    displayAllPhone(searchValue)
}
//function for load all phone
displayAllPhone()

