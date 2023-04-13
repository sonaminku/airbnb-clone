import axios from "axios";
import React, {useContext, useState} from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const {setUser} = useContext(UserContext)

  const handleLoginSubmit = async(ev) => {
    ev.preventDefault()
    try {
      const {data} = await axios.post('/login', {email,password})
      setUser(data)
      alert('Login successful')
      setRedirect(true)
    } catch (e) {
      alert('Login failed')
    }
  }

  if(redirect) {
    return <Navigate to={'/'} />
  }
  
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form onSubmit={handleLoginSubmit} className="max-w-md mx-auto">
          <input value={email} onChange={ev => setEmail(ev.target.value)} type="email" placeholder="your@email.com" />
          <input value={password} onChange={ev => setPassword(ev.target.value)} type="password" placeholder="password" />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?
            <Link className="underline text-black" to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
