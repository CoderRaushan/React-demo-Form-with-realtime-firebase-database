import { useState } from "react"
export default function CommentForm() {
    let [formdata, setformdata] = useState({
        email: "",
        name:"",
        username: "",
        remark: "",
        rating: "",
        password: "",
    })
    let handleformdata = (event) => {
        let inpname = event.target.name;
        let inpdata = event.target.value;
        setformdata((currdata) => {
            currdata[inpname] = inpdata;
            return { ...currdata };
        });
    }
    const formSubmit = async (event) => {
        event.preventDefault();
        const { email,name, username, remark, rating, password } = formdata;
        if(email && name &&  username &&  remark &&  rating &&  password)
        {
            const result = await fetch('https://reactformdemonstration-bfbf7-default-rtdb.firebaseio.com/reactFromData.json',
                {
                    method:"post",
                    headers:
                    {
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify({
                        email,
                        name,
                        username,
                        remark, 
                        rating, 
                        password,
                    })
                });
            if(result)
            {
                alert("Data Saved Successfully!!");
                setformdata({
                    email: "",
                    name:"",
                    username: "",
                    remark: "",
                    rating: "",
                    password: "",
                });
            }
            else 
            {
                alert("Data Submission Error");
            }
        }
        else
        {
            alert("Please Fill Form First then submit the form");
        }
    };
    return (
        <div>
            <h3>
                Give a comment
            </h3>
            <form method="Post" onSubmit={formSubmit} style={{ border: "2px solid black", padding: "2rem", borderRadius: "2rem", backgroundColor: "#591c85", color: "white" }}>
                <label htmlFor="email">username </label>
                <input type="email" name="email" id="email" placeholder="email" value={formdata.email} onChange={handleformdata} /> <br /> <br />

                <label htmlFor="name">name </label>
                <input type="text" name="name" id="name" placeholder="name" value={formdata.name} onChange={handleformdata} /> <br /> <br />

                <label htmlFor="username">username </label>
                <input type="text" name="username" id="username" placeholder="username" value={formdata.username} onChange={handleformdata} /> <br /> <br />

                <label htmlFor="password">password </label>
                <input type="text" name="password" id="password" placeholder="password" value={formdata.password} onChange={handleformdata} /> <br /> <br />

                <label htmlFor="remark">Comment </label><br />
                <textarea name="remark" id="remark" value={formdata.remark} onChange={handleformdata} rows={15} cols={45} ></textarea><br /><br />

                <label htmlFor="rating">rating </label><br />
                <input type="number" name="rating" id="rating" min={1} max={5} value={formdata.rating} onChange={handleformdata} /><br /><br />

                <button>submit</button>
            </form>
        </div>
    )
}


