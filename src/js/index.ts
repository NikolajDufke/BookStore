import Axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

import {json2table100} from "./genericTable";

let BaseUri: string = "http://anbo-bookstorerest.azurewebsites.net/api/"
let contentElement: HTMLDivElement = <HTMLDivElement> document.getElementById("content");
let element: HTMLDivElement = <HTMLDivElement> document.getElementById("table_content");
let AllBooks: JSON;



interface IBook {
   id: number,
   title: string,
   author: string,
   publisher: string,
   price: number,
}

let newBookElement: HTMLDivElement = <HTMLDivElement> document.getElementById("newBook");

let newBookinputFields: string 





// let book1 = Object.create(book)
// console.log(Object.keys(book1));
// // Object.keys(book).forEach(element => {
// //     console.log(element); 
// // });



newBookinputFields = "<div class='container'>"+  MakeInputFields("Id") + MakeInputFields("title") + MakeInputFields("author") + MakeInputFields("publisher") + MakeInputFields("price") + "</div>";


console.log(MakeInputFields("title"))

newBookElement.innerHTML = newBookinputFields;

 


function MakeInputFields(Name: string): string {
    return "<div class='row'>"+ "<span class='col' id=' title" + Name + "'> " + Name +" </span> <input class='col' id=' input" + Name + "'></input> <span class='col'></span>" + "</div>";
}

// let sentence: string = `Hello, my name is ${ fullName }

 Axios.get(BaseUri + "Books").then(
     function(respone: AxiosResponse): void{
         console.log("getting books... v6");
         console.log(Date.now)
        //  element.innerHTML = "<div class='spinner-border text-muted></div>";
        //  setTimeout(() => {  console.log("waited 5 sek"); }, 5000);
    let data: IBook[] = respone.data;
        console.log(data);
    let result: string = json2table100(data);
console.log(result);
     element.innerHTML = result;
        // contentElement.innerHTML = JSON.stringify(respone.data);
     }
 )
 .catch(
     function(error: AxiosError): void{
        contentElement.innerHTML = error.message;
     }
 )

let buttonElement: HTMLButtonElement = <HTMLButtonElement> document.getElementById("addButton");
buttonElement.addEventListener("click", addBook);

 function addBook(): void {
    let id : HTMLInputElement = <HTMLInputElement> document.getElementById("inputid");
    let title : HTMLInputElement = <HTMLInputElement> document.getElementById("inputtitle");
    let author : HTMLInputElement = <HTMLInputElement> document.getElementById("inputauthor");
    let publisher : HTMLInputElement = <HTMLInputElement> document.getElementById("inputpublisher");
    let price : HTMLInputElement = <HTMLInputElement> document.getElementById("inputprice");
    

Axios.post(BaseUri + 'Books', { 
    id : id.valueAsNumber, 
    title : title.value,
    author : author.value,
    publisher : publisher.value,
    price : price.valueAsNumber
}).then(function (response){
    console.log(response.data)
}).catch(function(error){
    console.log(error)
});


 }



 




