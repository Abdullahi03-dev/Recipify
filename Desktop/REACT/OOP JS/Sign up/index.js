///A VERY BASIC LOGIN SYSTEM TRYING TO PRACTICE OOP

class User{
    constructor(username,email,password){
        this.username=username
        this.email=email
        this.password=password
    }
}

class Auth{
    constructor(){
           this.users=JSON.parse(localStorage.getItem('users'))||[]
           this.loggedInUser=localStorage.getItem('loggedInUser')||null
    }


    addUser(user){
            const exist=this.users.find((u)=>u.username===user.username)
            if(exist){
                alert('USER NAME OR PASSWORD ALREADY EXIST')
                return false
            }
            else{
                this.users.push(user)
                localStorage.setItem('users',JSON.stringify(this.users))
                alert('successfully signedup')
                window.location='welcome.html'
                return true
            }
    }

    loginUser(email,password){
        console.log(this.users)
        const exist=this.users.find((u)=>u.email===email && u.password==password)
        if(exist){
            this.loggedInUser=email
            localStorage.setItem('loggedInUser',email)
            alert('successfully loggedIN')
            window.location='welcome.html'
            return true
        }
        else{
            alert('Incorect Password Or username')
            return false
        }
        
    }

    logout(){
        this.loggedInUser=null
        alert('successfully logout',this.loggedInUser)
        localStorage.removeItem(this.loggedInUser)
        window.location='index.html'
    }
    getCurrentUser(){
        return this.loggedInUser
    }

}

const auth=new Auth()







const signupButton=document.getElementById('signupButton')
const loginButton=document.getElementById('loginButton')


if (signupButton!=null) {signupButton.addEventListener('click',(e)=>{
    e.preventDefault()
    const nameInput=document.getElementById('name').value
const emailInput=document.getElementById('email').value
const passwordInput=document.getElementById('password').value
const cpasswordInput=document.getElementById('cpassword').value

// alert(nameInput)
    if(nameInput!==''||emailInput!==''||passwordInput!==''){
        if(passwordInput===cpasswordInput){
             const Users=new User(nameInput,emailInput,passwordInput)
             auth.addUser(Users)
        }
        else{
            alert('PASSWORD IS NOT EQUAL TO PASSWORD')
        }
    }else{
        alert('FILL IN ALL INPUTS')
    }
})

}

if (loginButton!=null){
    loginButton.addEventListener('click',(e)=>{
    e.preventDefault()
    const passwordLogin=document.getElementById('passwordLogin').value
    const emailLogin=document.getElementById('emailLogin').value
console.log(passwordLogin)
console.log(emailLogin)
    if(passwordLogin||emailLogin!==''){
    auth.loginUser(emailLogin,passwordLogin)

    }
    else{
        alert('FILL IN THE INPUTS')
    }
   
})
}

