let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mode ='create';
let tmp;
let dataProjects;
let searchmode = 'title';




if(localStorage.product != null)
  dataProjects =JSON.parse(localStorage.product);
else
  dataProjects =[];


function getTotal(){
  if(price.value != ''){
    let result= (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML=result;
    total.style.background ='#040';
  }
  else{
    total.innerHTML='';
    total.style.background='#a00d02';
  }
}

submit.onclick =function(){
    let newProduct={
      title:title.value,
      price:price.value,
      taxes:taxes.value,
      ads:ads.value,
      discount:discount.value,
      total:total.innerHTML,
      count:count.value,
      category:category.value
    }

    if(mode === 'create') {  
      if(newProduct.count > 1){
        for(let i=0; i<newProduct.count; i++){
          dataProjects.push(newProduct);
        }
      }
      else
        dataProjects.push(newProduct);    
    }
    else
    {
      dataProjects[tmp] = newProduct;
      submit.innerHTML ='Create';
      count.style.display ='block';
      mode ='create';
    }
    localStorage.setItem('product',JSON.stringify(dataProjects));
    clearData();
    showData();
}

function clearData(){
    title.value ='';
    price.value ='';
    taxes.value ='';
    ads.value ='';
    discount.value ='';
    total.innerHTML ='';
    count.value ='';
    category.value ='';
    total.style.background='#a00d02';
}

function showData(){
    getTotal();
    let tabale='';
    for(let i = 0 ; i < dataProjects.length; i++)
    {
      
      tabale+=`
      <tr>
        <td>${i+1}</td>
        <td>${dataProjects[i].title}</td>
        <td>${dataProjects[i].price}</td>
        <td>${dataProjects[i].taxes}</td>
        <td>${dataProjects[i].ads}</td>
        <td>${dataProjects[i].discount}</td>
        <td>${dataProjects[i].total}</td>
        <td>${dataProjects[i].category}</td>
        <td><button onclick="update(${i})" id="update">update</button></td>
        <td><button onclick ="deleteData(${i})" id="delete">delete</button></td>
      </tr>`;
    }

    let buttonDelete = document.getElementById('deleteall');
    if(dataProjects.length>0)
        buttonDelete.innerHTML =`<button onclick="deleteAll()">Delete All(${dataProjects.length})</button>`;
    else
      buttonDelete.innerHTML ='';
    
    document.getElementById('tbody').innerHTML = tabale;
}

function deleteData(id)
{
    dataProjects.splice(id, 1);
    localStorage.product = JSON.stringify(dataProjects);
    showData();
}

function deleteAll()
{
  localStorage.clear();
  dataProjects.splice(0);
  showData();
}

function update(id)
{
  title.value = dataProjects[id].title;
  price.value = dataProjects[id].price;
  taxes.value = dataProjects[id].taxes;
  ads.value = dataProjects[id].ads;
  discount.value = dataProjects[id].discount;
  count.style.display ='none';
  getTotal();
  category.value = dataProjects[id].category;
  submit.innerHTML= 'Update';
  mode = 'update';
  tmp = id;
  scroll({
    top : 0,
    behavior :'smooth'
  });
}


function getSearchMode(id){
  let search =document.getElementById('search');
  if(id == 'searchTitle'){
    searchmode = 'title';
    search.placeholder = 'Search By Title';
  }
  else{
    searchmode = 'category';
    search.placeholder = 'Search By Category';
  }
  search.focus();
  search.value='';
  showData();
}

function searchData(value){
    let tabale =``;
    if(searchmode == 'title'){
      for(let i = 0; i < dataProjects.length ; i++){
        if(dataProjects[i].title.includes(value)){
          tabale+=
          `<tr>
            <td>${i+1}</td>
            <td>${dataProjects[i].title}</td>
            <td>${dataProjects[i].price}</td>
            <td>${dataProjects[i].taxes}</td>
            <td>${dataProjects[i].ads}</td>
            <td>${dataProjects[i].discount}</td>
            <td>${dataProjects[i].total}</td>
            <td>${dataProjects[i].category}</td>
            <td><button onclick="update(${i})" id="update">update</button></td>
            <td><button onclick ="deleteData(${i})" id="delete">delete</button></td>
          </tr>`;
        }
        console.log(i);
      }
    }else{
      for(let i = 0; i< dataProjects.length ;i++){
        if(dataProjects[i].category.includes(value)){
          tabale+=`
          <tr>
            <td>${i+1}</td>
            <td>${dataProjects[i].title}</td>
            <td>${dataProjects[i].price}</td>
            <td>${dataProjects[i].taxes}</td>
            <td>${dataProjects[i].ads}</td>
            <td>${dataProjects[i].discount}</td>
            <td>${dataProjects[i].total}</td>
            <td>${dataProjects[i].category}</td>
            <td><button onclick="update(${i})" id="update">update</button></td>
            <td><button onclick ="deleteData(${i})" id="delete">delete</button></td>
          </tr>`;
        }
      }
    }
    document.getElementById('tbody').innerHTML = tabale;
}

showData();
