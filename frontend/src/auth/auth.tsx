import "./auth.css"

export default function  Auth() {
    return (
            <div className='wrapper'>
                <div className='authForm'>
                    <input type="text" className='loginInput'/>
                    <input type="password" className='passwordInput'/>
                    <button>SignIn</button>
                    <button>SignUp</button>
                </div>
            </div>
    )
}