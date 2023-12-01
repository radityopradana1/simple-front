import React, { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";

function PostForm(){
    const [column, setColumn] = useState([])
    const [records, setRecords] = useState([])

    const url ="http://localhost:3030/api/v1/users"
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        location: ""
    })
    function submitInsert(e){
        e.preventDefault();
        Axios.post(url, {
            firstname: data.firstname,
            lastname: data.lastname,
            location: data.location
        }).then(res => {
            console.log("FE Successfully Inserted")
            console.log(res.data)
        })
    }
    function submitGet(e){
        e.preventDefault();
        Axios.get(url).then(res => {
            setColumn(Object.keys(res.data[0]))
            setRecords(res.data)
        })
    }
    function handleSubmit(e){
        const newData={...data}
        newData[e.target.id] = e.target.value
        setData(newData)
    }
    let tb_data = (
        <tbody>
            {
                records.map((record, i) =>(
                    <tr key={i}>
                        <td>{record.firstname}</td>
                        <td>{record.lastname}</td>
                        <td>{record.location}</td>
                    </tr>
                ))
            }
        </tbody>
    )
    return (
        <div>
            <div>
                <form onSubmit={(e)=>submitInsert(e)}>
                    <input onChange={(e)=>handleSubmit(e)} id="firstname" value={data.firstname} placeholder="firstname" type="text"></input>
                    <input onChange={(e)=>handleSubmit(e)} id="lastname" value={data.lastname} placeholder="lastname" type="text"></input>
                    <input onChange={(e)=>handleSubmit(e)} id="location" value={data.location} placeholder="location" type="text"></input>
                    <button>Submit</button>
                </form>
            </div>
            <div>
                <form onSubmit={(e)=>submitGet(e)}>
                    <button>Get Data in Console</button>
                </form>
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>firstname</th>
                            <th>lastname</th>
                            <th>location</th>
                        </tr>
                    </thead>
                    {tb_data}
                </table>
            </div>
        </div>
    );
}

export default PostForm;