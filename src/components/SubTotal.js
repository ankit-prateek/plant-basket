import React,{useEffect , useState} from 'react'



    
function SubTotal() {
    const [data,setdata]=useState([1])
    const [create,setcreate]=useState(false);
    const [ del, setdel]=useState(false)
    const [value,setvalue]=useState('');
    const [value2,setvalue2]=useState('');
    const [insert,setinsert]=useState()
    function createhandle(e){
        setcreate(true)

    }
    function updatehandle(e){
        var temp=data;
        temp[insert]=value2
        setdata([...temp])
        setinsert('none')
        setvalue2('')
       
        
    }
    function deletehandle(e){
        console.log(data)
    }
    function creater(e){
        var temp=data;
        temp.push(value)
        setdata([...temp])
        setcreate(false)
        setvalue('')
    }
    function deleter(e){
        var temp=data;
        temp.splice(e.target.name, 1);
        setdata([...data])
    }
    function inserter(e){
        setvalue2(e.target.value)
        setinsert(e.target.name)
    }
   
    return (
        <div>
            {data.map((s,i)=>(
                <div >
                    {insert==i?<div><input value={value2} onChange={e=>setvalue2(e.target.value)}/> <button onClick={updatehandle}> update</button></div>:<div><h3 >{s}</h3>
                <button name={i} onClick={deleter}>delete</button>
                <button name={i} value={s} onClick={inserter}>update</button>
                </div>}
                </div>
            ))}
            <button onClick={createhandle}>create</button>
            {create?<div><input value={value} onChange={e=>setvalue(e.target.value)}/><button onClick={creater}> insert</button></div>:<div></div>}
            

        </div>
    )
}

export default SubTotal
