import { useForm } from "react-hook-form";
import logo from './UoPLogo.jpg'

function App() {
  return (
    <div className="App">
      <header className=" flex flex-col justify-center items-center w-screen h-screen">
        <img src={logo} className="App-logo w-80" alt="logo"/>
		<h2 className="text-lg font-semibold">UoP Repos Self Invitation Service</h2>
		<p className="text-sm py-2">
			This service is used to invite users to join the UoP Repos GitHub organization.
			<br/>
			It is intended to be used by Students and Faculty to invite themself to join the organization.
			<br/>
			You must use a valid UoP email address e.g. <b> <i> @port.ac.uk </i> </b> or <b> <i> @myport.ac.uk </i> </b>
		</p>
		<SubmitInvite/>


      </header>
    </div>
  );
}

const SubmitInvite = () => {
	const API_URL = process.env.REACT_APP_ENDPOINT || '';
	const { register, handleSubmit, setError, formState: { errors }} = useForm();

	const {onChange, ...rest} = register('email', {
		required: true,
		pattern:{
			value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
			message: 'Please enter a valid email address'
		}
	})
	const onSubmit = async (data) => {

		try {
			await fetch(API_URL, {
			method: 'POST',
			body: JSON.stringify({email: data.email}),
			mode: process.env.NODE_ENV === 'production' ? 'no-cors' : 'cors',
			headers: {
				'Content-Type': 'application/json'
			}
		})} catch (error) {
			console.log(error)
		}
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center">
			<input 
				type="text" 
				onChange={(e) => {
					setError("email", {
					  type: 'pattern'
					});
					onChange(e);
				  }}
				className="w-80 h-8 p-2 border border-gray-400 rounded-lg" 
				placeholder="Enter your email address"
				{...rest}
			/>
			{errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
			<button 
				type="submit"
			className="w-64 mt-2 p-2 border border-gray-400 rounded-lg"
			>Invite</button>
			</form>);
}


export default App;
