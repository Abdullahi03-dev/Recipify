///PRACTICE USING STATIC KEYWORD

class Bookmark{
	static bookmarkArray=[]
     #id
	constructor(name,url){
		this.name=name
		this.url=url
        this.#id=Date.now()
	}
	 generatedId(){
		return this.#id
	}
	static saveBookMarks(){
			const plainBookkmark=Bookmark.bookmarkArray.map(bookmark=>({
                    text:bookmark.name,
                    url:bookmark.url,
                    _id:bookmark.generatedId()   
            }))
     localStorage.setItem('bookapp',JSON.stringify(plainBookkmark))
	}

    static loadBookmarks(){
        const saved=localStorage.getItem('bookapp')
        if(saved){
            const parsed=JSON.parse(saved);
           const mappedParesd= parsed.map((bookmark)=>{
                    console.log(bookmark)
                    const b=new Bookmark(bookmark.text,bookmark.url)
                    b.#id=bookmark._id||Date.now()
                    return b
            })
            console.log(mappedParesd)
            Bookmark.bookmarkArray=mappedParesd
        }
    }   

    static deleteTodo(_id){
            Bookmark.bookmarkArray=Bookmark.bookmarkArray.filter((id)=>id.generatedId()!==_id)
            Bookmark.saveBookMarks()
    }
}







class App{
    constructor(){
        this.nameinput=document.getElementById('siteName')
        this.siteinput=document.getElementById('siteURL')
        this.bookmarkList=document.getElementById('bookmarkList')
        this.button=document.getElementById('button')

        this.button.addEventListener('click',this.addBookmark.bind(this))
        this.bookmarkList.addEventListener('click',this.handleDelete.bind(this))

        Bookmark.loadBookmarks();
        this.render()
        
    }

    addBookmark(){
        const text=this.nameinput.value.trim()
        const textUrl=this.siteinput.value.trim()
        if(!text||!textUrl) return alert('input should be filled')


        const newBookapp=new Bookmark(text,textUrl)
        Bookmark.bookmarkArray.push(newBookapp)
        Bookmark.saveBookMarks()
        this.render()
    }

    handleDelete(e){

    if(e.target.tagName==='BUTTON'){
        const id=parseInt(e.target.dataset.id);
        Bookmark.deleteTodo(id)
        this.render()
 }
        
    }
    render(){
        this.bookmarkList.innerHTML=''
        Bookmark.bookmarkArray.forEach((char,index)=>{
            // console.log(`<button data-id="${char.generatedId()}">Delete<button>`)
            const div=document.createElement('div')
            div.id='listDiv'
            div.innerHTML=`
            <h3>NAME OF LINK:  ${char.name}</h3>
            <h3>LINK:  ${char.url}</h3>
            <button data-id="${char.generatedId()}">Delete<button>
            `
            this.bookmarkList.appendChild(div)
        })
    }
}

new App()