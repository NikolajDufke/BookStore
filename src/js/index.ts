import Axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

let BaseUri: string = "http://anbo-bookstorerest.azurewebsites.net/api/"

interface IBook {
    id: number,
    title: string,
    author: string,
    publisher: string,
    price: number,
}

var app = new Vue({
    el: "#app",
    data: {
        Books: [],
        deleteId: 0,
        form: {
            title: "",
            author: "",
            publisher: "",
            price: 0
        }
    
    },
    created() {

        this.UpdateBooksList();

  
    },
    methods:
    {
        UpdateBooksList(){
            let getAllBookUrl = BaseUri + "Books"
        console.log(getAllBookUrl)
        Axios.get<IBook[]>(getAllBookUrl)
        .then((Response: AxiosResponse<IBook[]>) => {
            console.log(Response.data)
            this.Books = Response.data
            console.log(this.Books)
        })
        .catch((e: AxiosError) => {
            this.message = e.message
        })
        },

        addBook(){
            Axios.post<IBook>(BaseUri, this.form  
            ).then(function (response: AxiosResponse<IBook>) {
                console.log(response.data)
                this.UpdateBooksList();
            }).catch(function (e: AxiosError) {
                console.log(e.message)
            });
        },
        deleteBook(){
            let uri: string = BaseUri + "Books/" + this.deleteId
            Axios.delete<void>(uri)
                .then((Response: AxiosResponse<void>) => {
                    this.UpdateBooksList()
                })
                .catch((error: AxiosError) => {
                    alert(error.message)
                })
        },
    }
})








